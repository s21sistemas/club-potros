export const formOptions = {
  inscriptionFields: [
    { required: true, type: 'number', label: 'Beca (%) *', name: 'beca' },
    {
      required: true,
      type: 'select',
      label: 'Estatus *',
      name: 'estatus',
      opcSelect: [
        { value: 'pendiente', label: 'Pendiente' },
        { value: 'pagado', label: 'Pagado' }
      ]
    },
    {
      required: true,
      type: 'number',
      label: 'Submonto *',
      name: 'submonto'
    },
    {
      required: true,
      type: 'number',
      label: 'Monto final *',
      name: 'monto'
    },
    {
      required: false,
      type: 'select',
      label: 'Método de pago (si no se ha pagado, dejar vacía)',
      name: 'metodo_pago',
      opcSelect: [
        { value: '', label: 'Selecciona una opción' },
        { value: 'transferencia bancaria', label: 'Transferencia bancaria' },
        { value: 'tarjeta', label: 'Tarjeta de crédito/débito' },
        { value: 'efectivo', label: 'Efectivo' },
        { value: 'cheques', label: ' Cheques' }
      ]
    },
    {
      required: true,
      type: 'select',
      label: 'Prorroga *',
      name: 'prorroga',
      opcSelect: [
        { value: 'false', label: 'No' },
        { value: 'true', label: 'Sí' }
      ]
    },
    {
      required: true,
      type: 'date',
      label: 'Fecha límite de pago *',
      name: 'fecha_limite',
      condition: (formData) => formData.prorroga === 'true' // Solo se muestra si prórroga es "true"
    },
    {
      required: false,
      type: 'date',
      label: 'Fecha de pago (si no se ha pagado, dejar vacía)',
      name: 'fecha_pago'
    },
    {
      required: false,
      type: 'number',
      label: 'Total abonado',
      name: 'total_abonado'
    },
    {
      required: false,
      type: 'number',
      label: 'Total restante (monto final - total abonado)',
      name: 'total_restante'
    },
    {
      required: false,
      type: 'select',
      label: '¿Abonará? *',
      name: 'abono',
      opcSelect: [
        { value: 'NO', label: 'No' },
        { value: 'SI', label: 'Sí' }
      ]
    }
  ],
  primeraJornadaFields: [
    {
      required: true,
      type: 'number',
      label: 'Descuento por equipo propio ($) *',
      name: 'descuento'
    },
    {
      required: true,
      type: 'number',
      label: 'Submonto *',
      name: 'submonto'
    },
    {
      required: true,
      type: 'select',
      label: 'Estatus *',
      name: 'estatus',
      opcSelect: [
        { value: 'pendiente', label: 'Pendiente' },
        { value: 'pagado', label: 'Pagado' }
      ]
    },
    { required: true, type: 'number', label: 'Monto total *', name: 'monto' },
    {
      required: false,
      type: 'date',
      label: 'Fecha de pago (si no se ha pagado, dejar vacía)',
      name: 'fecha_pago'
    },
    {
      required: false,
      type: 'select',
      label: 'Método de pago (si no se ha pagado, dejar vacía)',
      name: 'metodo_pago',
      opcSelect: [
        { value: '', label: 'Selecciona una opción' },
        { value: 'transferencia bancaria', label: 'Transferencia bancaria' },
        { value: 'tarjeta', label: 'Tarjeta de crédito/débito' },
        { value: 'efectivo', label: 'Efectivo' },
        { value: 'cheques', label: ' Cheques' }
      ]
    },
    {
      required: false,
      type: 'number',
      label: 'Total abonado',
      name: 'total_abonado'
    },
    {
      required: false,
      type: 'number',
      label: 'Total restante (monto final - total abonado)',
      name: 'total_restante'
    },
    {
      required: false,
      type: 'select',
      label: '¿Abonará? *',
      name: 'abono',
      opcSelect: [
        { value: 'NO', label: 'No' },
        { value: 'SI', label: 'Sí' }
      ]
    }
  ],
  pesajeFields: [
    {
      required: true,
      type: 'select',
      label: 'Estatus *',
      name: 'estatus',
      opcSelect: [
        { value: 'pendiente', label: 'Pendiente' },
        { value: 'pagado', label: 'Pagado' }
      ]
    },
    { required: true, type: 'number', label: 'Monto total *', name: 'monto' },
    {
      required: false,
      type: 'date',
      label: 'Fecha de pago (si no se ha pagado, dejar vacía)',
      name: 'fecha_pago'
    },
    {
      required: false,
      type: 'select',
      label: 'Método de pago (si no se ha pagado, dejar vacía)',
      name: 'metodo_pago',
      opcSelect: [
        { value: '', label: 'Selecciona una opción' },
        { value: 'transferencia bancaria', label: 'Transferencia bancaria' },
        { value: 'tarjeta', label: 'Tarjeta de crédito/débito' },
        { value: 'efectivo', label: 'Efectivo' },
        { value: 'cheques', label: ' Cheques' }
      ]
    },
    {
      required: false,
      type: 'number',
      label: 'Total abonado',
      name: 'total_abonado'
    },
    {
      required: false,
      type: 'number',
      label: 'Total restante (monto final - total abonado)',
      name: 'total_restante'
    },
    {
      required: false,
      type: 'select',
      label: '¿Abonará? *',
      name: 'abono',
      opcSelect: [
        { value: 'NO', label: 'No' },
        { value: 'SI', label: 'Sí' }
      ]
    }
  ],
  paymentsFields: [
    {
      required: false,
      type: 'number',
      label: 'Total pagado *',
      name: 'monto_total_pagado'
    },
    {
      required: false,
      type: 'number',
      label: 'Total pendiente restante *',
      name: 'monto_total_pendiente'
    },
    {
      required: true,
      type: 'number',
      label: 'Monto total a pagar *',
      name: 'monto_total'
    }
  ]
}
