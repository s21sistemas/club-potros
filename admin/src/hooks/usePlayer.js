import Swal from 'sweetalert2'
import { useState } from 'react'
import { useModalStore } from '../store/useModalStore'
import { usePlayerStore } from '../store/usePlayerStore'
import { useUserStore } from '../store/useUserStore'
import { uploadFileToFirebase } from '../utils/uploadFile'
import { toast } from 'sonner'
import { useTemporadasStore } from '../store/useTemporadasStore'
import { jugadorPorristaSchema } from '../zod/schemas'

export const usePlayer = (handleInputChange) => {
  // Stores
  const getDataUsers = useUserStore((state) => state.getDataUsers)
  const getDataTemporadas = useTemporadasStore(
    (state) => state.getDataTemporadas
  )

  // Store de modal
  const modalType = useModalStore((state) => state.modalType)
  const formData = useModalStore((state) => state.formData)
  const setFormData = useModalStore((state) => state.setFormData)
  const closeModal = useModalStore((state) => state.closeModal)
  const firma = useModalStore((state) => state.firma)
  const editFirma = useModalStore((state) => state.editFirma)

  // Store de players
  const loading = usePlayerStore((state) => state.loading)
  const players = usePlayerStore((state) => state.players)
  const getDataPlayers = usePlayerStore((state) => state.getDataPlayers)
  const addPlayer = usePlayerStore((state) => state.addPlayer)
  const editPlayer = usePlayerStore((state) => state.editPlayer)
  const deletePlayer = usePlayerStore((state) => state.deletePlayer)

  const [tipo, setTipo] = useState(formData.tipo_inscripcion || '')

  const handleReglamento = () => {
    setFormData('acepta_reglamento', true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validación con Zod
    const parsed = jugadorPorristaSchema.safeParse(formData)

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors
      const firstError = Object.values(errors)[0][0]
      toast.error(firstError)
      return
    }

    let signatureFirma = null
    if (firma === null && modalType === 'add') {
      toast.warning('La firma es obligatoría.')
      return
    } else if (firma === null && modalType === 'edit') {
      signatureFirma = formData.documentos.firma
    } else if (firma !== null) {
      signatureFirma = firma
    }

    Swal.fire({
      title:
        '<h2 style="font-family: "sans-serif";">Guardando registro, por favor espere...</h2>',
      allowEscapeKey: false,
      allowOutsideClick: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    try {
      const newFormData = {
        ...formData,
        curp: formData.curp.toUpperCase(),
        uid: formData.uid.value,
        activo:
          formData.tipo_inscripcion === 'reinscripcion'
            ? 'activo'
            : 'no activo',
        numero_mfl: formData.numero_mfl ? formData.numero_mfl : '000000',
        documentos: { ...formData.documentos, firma: signatureFirma }
      }

      // Subir archivos de documentos (si existen)
      if (newFormData.documentos) {
        const path = `jugadores/${newFormData.uid}/documentos/${newFormData.curp}`
        for (const key in newFormData.documentos) {
          const file = newFormData.documentos[key]
          if (file instanceof File) {
            const downloadURL = await uploadFileToFirebase(file, path)
            newFormData.documentos[key] = downloadURL
          }
        }
      }

      // Subir foto (si existe)
      if (newFormData.foto && newFormData.foto instanceof File) {
        const path = `jugadores/${newFormData.uid}/fotos/${newFormData.curp}`
        const downloadURL = await uploadFileToFirebase(newFormData.foto, path)
        newFormData.foto = downloadURL
      }

      if (modalType === 'add') {
        await addPlayer(newFormData)
      } else if (modalType === 'edit') {
        await editPlayer(newFormData)
      }
    } catch (error) {
      console.error('Ocurrio un error', error)
    } finally {
      Swal.close()
      closeModal()
      editFirma(null)
    }
  }

  const handleDelete = (id) => {
    deletePlayer(id)
    closeModal()
  }

  const loadOptions = async () => {
    try {
      const data = await getDataUsers()
      return data.map((user) => ({
        value: user.uid,
        label: user.nombre_completo
      }))
    } catch (error) {
      console.error('Error loading users:', error)
      return []
    }
  }

  const loadOptionsTemporadas = async () => {
    try {
      const data = await getDataTemporadas()
      return data.map((temp) => ({
        value: temp.id,
        label: temp.temporada
      }))
    } catch (error) {
      console.error('Error loading data:', error)
      return []
    }
  }

  const handleTipo = (e) => {
    handleInputChange(e)
    setTipo(e.target.value)
  }

  return {
    tipo,
    loadOptions,
    handleTipo,
    players,
    loading,
    getDataPlayers,
    handleSubmit,
    handleDelete,
    loadOptionsTemporadas,
    handleReglamento
  }
}
