import { create } from 'zustand'
import { toast } from 'sonner'
import {
  createEquipamiento,
  getEquipamiento,
  removeEquipamiento,
  updateEquipamiento
} from '../api/equipamiento'
import { getEquipo } from '../api/articulos'

let unsubscribeEquipo = null
let unsubscribeEquipamiento = null
export const useEquipamientoStore = create((set, get) => ({
  equipamiento: [],
  loading: false,

  getDataEquipo: async () => {
    set({ loading: true })

    return new Promise((resolve, reject) => {
      try {
        if (!unsubscribeEquipo) {
          unsubscribeEquipo = getEquipo((data) => {
            set({ equipo: data })
            resolve(data)
          })
        } else {
          resolve(get().equipo)
        }
      } catch (error) {
        console.error(error)
        reject(error)
      } finally {
        set({ loading: false })
      }
    })
  },

  getDataEquipamiento: async () => {
    set({ loading: true })

    return new Promise((resolve, reject) => {
      try {
        if (!unsubscribeEquipamiento) {
          unsubscribeEquipamiento = getEquipamiento((data) => {
            set({ equipamiento: data })
            resolve(data)
          })
        } else {
          resolve(get().equipamiento)
        }
      } catch (error) {
        console.error(error)
        reject(error)
      } finally {
        set({ loading: false })
      }
    })
  },

  addEquipamiento: async (data) => {
    try {
      const id = await createEquipamiento(data)
      if (!id) throw new Error('No se pudo guardar el registro')

      toast.success('Registro creado correctamente')
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  editEquipamiento: async (data) => {
    try {
      const success = await updateEquipamiento(data.id, data)
      if (!success) throw new Error('No se pudo guardar el registro')

      toast.success('Actualizado correctamente')
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  deleteEquipamiento: async (id) => {
    const promise = async () => {
      try {
        await removeEquipamiento(id)
      } catch (error) {
        console.error(error)
      }
    }

    toast.promise(promise(), {
      loading: 'Eliminando...',
      success: 'Eliminado correctamente',
      error: 'Falló al eliminar.'
    })
  }
}))
