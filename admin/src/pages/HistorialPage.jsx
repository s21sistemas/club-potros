import { useEffect } from 'react'
import { BaseTable } from '../components/BaseTable'
import { useModal } from '../hooks/useModal'
import { useHistorial } from '../hooks/useHistorial'
import { ModalDelete } from '../components/ModalDelete'
import { ReporteHistorial } from '../components/ReporteHistorial'
import { FormHistorial } from '../components/modals/FormHistorial'
import { BaseForm } from '../components/BaseForm'

const columns = [
  { key: 'coordinadora', name: 'Coordinadora' },
  { key: 'nombre', name: 'Jugador/Porrista' },
  { key: 'concepto', name: 'Concepto' },
  { key: 'metodo_pago', name: 'Método' },
  { key: 'fecha_pago', name: 'Fecha que recibió la coordinadora' },
  { key: 'monto', name: 'Monto' },
  { key: 'fecha_recibido', name: 'Fecha entregado' }
]

export default function HistorialPage() {
  const { modalType, currentItem } = useModal()

  const { historial, loading, getDataHistorial, handleSubmit, handleDelete } =
    useHistorial()

  useEffect(() => {
    const getHistorial = async () => {
      return await getDataHistorial()
    }

    getHistorial()
  }, [getDataHistorial])

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={historial}
        title='Historial de pagos'
        loading={loading}
      />

      {(modalType === 'edit' || modalType === 'view') && (
        <BaseForm handleSubmit={handleSubmit} Inputs={<FormHistorial />} />
      )}

      {modalType === 'delete' && currentItem && (
        <ModalDelete handleDelete={handleDelete} />
      )}

      <ReporteHistorial />
    </div>
  )
}
