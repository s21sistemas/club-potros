import { useModal } from '../../hooks/useModal'
import { InputField } from '../InputField'
import { AlertaCard } from '../AlertaCard'
import { ButtonsModal } from './ButtonsModal'
import { CancelButtonModal } from './CancelButtonModal'
import { usePaymentCheer } from '../../hooks/usePaymentCheer'
import { formOptions } from '../../utils/formPaymentsCheer'
import { CardAbonos } from '../CardAbonos'

export const FormPaymentsCheer = ({ user }) => {
  const {
    view,
    document,
    formData,
    handleNestedInputChange,
    handleInputChange
  } = useModal()

  const { loadOptions, loadOptionsTemporadas } = usePaymentCheer()

  return (
    <>
      <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
        <AlertaCard text='Jugador' />
        <InputField
          type='async'
          label='Selecciona la porrista'
          name='porrista'
          required={true}
          value={formData.porrista || ''}
          onChange={handleInputChange}
          disabled={document ? true : view}
          loadOptions={loadOptions}
          classInput='md:col-span-2'
        />

        <InputField
          type='async'
          label='Selecciona la temporada *'
          name='temporadaId'
          required={true}
          value={formData.temporadaId}
          onChange={handleInputChange}
          disabled={view}
          loadOptions={loadOptionsTemporadas}
          classInput='md:col-span-2'
        />

        <AlertaCard text='Pago de inscripción' />
        {formOptions.inscriptionFields.map(
          ({ type, label, name, required, opcSelect }) => (
            <InputField
              key={name}
              type={type}
              label={label}
              required={
                formData.pagos?.[0]?.estatus === 'pagado' ? true : required
              }
              opcSelect={opcSelect}
              name={`pagos.0.${name}`}
              value={formData.pagos?.[0]?.[name] ?? ''}
              onChange={handleNestedInputChange}
              disabled={
                ['total_abonado', 'monto', 'total_restante'].includes(name) ||
                (formData.pagos?.[0]?.total_abonado >=
                  formData.pagos?.[0]?.monto &&
                  name === 'abono') ||
                (formData.pagos?.[0]?.estatus === 'pagado' &&
                  name !== 'estatus' &&
                  name !== 'fecha_pago' &&
                  name !== 'metodo_pago') ||
                user?.coordinadora_porristas
                  ? true
                  : view
              }
            />
          )
        )}

        {formData.pagos?.[0]?.abono === 'SI' && (
          <>
            <InputField
              type='number'
              label='Cantidad abonada *'
              required={true}
              name='cantidad_abono_ins'
              value={formData.cantidad_abono_ins ?? ''}
              onChange={handleInputChange}
              disabled={formData.pagos?.[0]?.estatus === 'pagado' ? true : view}
            />

            <InputField
              type='date'
              label='Fecha del abono *'
              required={true}
              name='fecha_abono_ins'
              value={formData.fecha_abono_ins ?? ''}
              onChange={handleInputChange}
              disabled={formData.pagos?.[0]?.estatus === 'pagado' ? true : view}
            />

            <InputField
              type='select'
              label='Método de pago *'
              required={true}
              name='metodo_pago_abono_ins'
              value={formData.metodo_pago_abono_ins ?? ''}
              opcSelect={[
                { value: '', label: 'Selecciona una opción' },
                {
                  value: 'transferencia bancaria',
                  label: 'Transferencia bancaria'
                },
                { value: 'tarjeta', label: 'Tarjeta de crédito/débito' },
                { value: 'efectivo', label: 'Efectivo' },
                { value: 'cheques', label: ' Cheques' }
              ]}
              onChange={handleInputChange}
              disabled={formData.pagos?.[0]?.estatus === 'pagado' ? true : view}
            />
          </>
        )}

        {formData.pagos?.[0]?.abonos?.length > 0 && (
          <>
            <AlertaCard text='Abonos de inscripción' />

            {formData.pagos[0].abonos.map((abono) => (
              <div
                className='sm:grid-cols-1 md:col-span-2'
                key={crypto.randomUUID()}
              >
                <CardAbonos
                  amount={abono.cantidad}
                  date={abono.fecha}
                  method={abono.metodo}
                />
                <hr className='mt-6 sm:grid-cols-3 gap-2 md:col-span-2' />
              </div>
            ))}
          </>
        )}

        <AlertaCard text='Pago de Coaching' />
        {formOptions.coachingFields.map(
          ({ type, label, name, required, opcSelect }) => (
            <InputField
              key={name}
              type={type}
              label={label}
              required={
                formData.pagos?.[1]?.estatus === 'pagado' ? true : required
              }
              opcSelect={opcSelect}
              name={`pagos.1.${name}`}
              value={formData.pagos?.[1]?.[name] ?? ''}
              onChange={handleNestedInputChange}
              disabled={
                ['total_abonado', 'monto', 'total_restante'].includes(name) ||
                (formData.pagos?.[1]?.total_abonado >=
                  formData.pagos?.[1]?.monto &&
                  name === 'abono') ||
                (formData.pagos?.[1]?.estatus === 'pagado' &&
                  name !== 'estatus' &&
                  name !== 'fecha_pago' &&
                  name !== 'metodo_pago')
                  ? true
                  : view
              }
            />
          )
        )}

        {formData.pagos?.[1]?.abono === 'SI' && (
          <>
            <InputField
              type='number'
              label='Cantidad abonada *'
              required={true}
              name='cantidad_abono_coach'
              value={formData.cantidad_abono_coach ?? ''}
              onChange={handleInputChange}
              disabled={formData.pagos?.[1]?.estatus === 'pagado' ? true : view}
            />

            <InputField
              type='date'
              label='Fecha del abono *'
              required={true}
              name='fecha_abono_coach'
              value={formData.fecha_abono_coach ?? ''}
              onChange={handleInputChange}
              disabled={formData.pagos?.[1]?.estatus === 'pagado' ? true : view}
            />

            <InputField
              type='select'
              label='Método de pago *'
              required={true}
              name='metodo_pago_abono_coach'
              value={formData.metodo_pago_abono_coach ?? ''}
              opcSelect={[
                { value: '', label: 'Selecciona una opción' },
                {
                  value: 'transferencia bancaria',
                  label: 'Transferencia bancaria'
                },
                { value: 'tarjeta', label: 'Tarjeta de crédito/débito' },
                { value: 'efectivo', label: 'Efectivo' },
                { value: 'cheques', label: ' Cheques' }
              ]}
              onChange={handleInputChange}
              disabled={formData.pagos?.[1]?.estatus === 'pagado' ? true : view}
            />
          </>
        )}

        {formData.pagos?.[1]?.abonos?.length > 0 && (
          <>
            <AlertaCard text='Abonos de coaching' />

            {formData.pagos[1].abonos.map((abono) => (
              <div
                className='sm:grid-cols-1 md:col-span-2'
                key={crypto.randomUUID()}
              >
                <CardAbonos
                  amount={abono.cantidad}
                  date={abono.fecha}
                  method={abono.metodo}
                />
                <hr className='mt-6 sm:grid-cols-3 gap-2 md:col-span-2' />
              </div>
            ))}
          </>
        )}

        {/* Totales */}
        <AlertaCard text='Total de pagos' />
        {formOptions.paymentsFields.map(
          ({ type, label, name, required, opcSelect }) => (
            <InputField
              key={name}
              type={type}
              label={label}
              required={required}
              opcSelect={opcSelect}
              name={name}
              value={formData[name] ?? ''}
              onChange={handleNestedInputChange}
              disabled={
                [
                  'monto_total',
                  'monto_total_pagado',
                  'monto_total_pendiente'
                ].includes(name)
                  ? true
                  : view
              }
            />
          )
        )}
      </div>
      <hr className='text-gray-300' />
      {view ? <CancelButtonModal /> : <ButtonsModal />}
    </>
  )
}
