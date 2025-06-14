export const formOptions = {
  jugadorFields: [
    {
      required: true,
      type: 'async',
      label: 'Selecciona al jugador *',
      name: 'jugadorId',
      note: 'Si el jugador no se muestra es porque no ha pagado la inscripción.'
    },
    {
      required: true,
      type: 'date',
      label: 'Fecha de la entrega *',
      name: 'fecha_entrega'
    }
  ],
  generalFields: [
    {
      required: true,
      type: 'text',
      label: 'Número del jersey *',
      name: 'numero'
    },
    {
      required: true,
      type: 'async-multi',
      label: 'Equipamiento *',
      name: 'equipamiento_asignado'
    }
  ],
  opcSelect: [
    { value: '', label: 'Selecciona una opción' },
    { value: 'SI', label: 'SI' },
    { value: 'NO', label: 'NO' }
  ],
  cascoFields: [
    {
      required: false,
      type: 'text',
      label: 'Número de serie del casco',
      name: 'numero_serie_casco'
    },
    {
      required: false,
      type: 'text',
      label: 'Marca del casco',
      name: 'marca_casco'
    },
    {
      required: false,
      type: 'select',
      label: 'Tipo de equipo',
      name: 'equipo_casco',
      opcSelect: [
        { value: '', label: 'Selecciona una opción' },
        { value: 'Propio', label: 'Propio' },
        { value: 'Prestado', label: 'Prestado' }
      ]
    }
  ],
  hombrerasFields: [
    {
      required: false,
      type: 'text',
      label: 'Número de serie de las hombreras',
      name: 'numero_serie_hombreras'
    },
    {
      required: false,
      type: 'text',
      label: 'Marca de las hombreras',
      name: 'marca_hombreras'
    },
    {
      required: false,
      type: 'select',
      label: 'Tipo de equipo',
      name: 'equipo_hombreras',
      opcSelect: [
        { value: '', label: 'Selecciona una opción' },
        { value: 'Propio', label: 'Propio' },
        { value: 'Prestado', label: 'Prestado' }
      ]
    }
  ],
  jerseyFields: [
    {
      required: false,
      type: 'text',
      label: 'Número de serie del Jersey',
      name: 'numero_serie_jersey'
    },
    {
      required: false,
      type: 'select',
      label: 'Tipo de Jersey',
      name: 'tipo_jersey',
      opcSelect: [
        { value: '', label: 'Selecciona una opción' },
        { value: 'Ofensivo', label: 'Ofensivo' },
        { value: 'Defensivo', label: 'Defensivo' }
      ]
    },
    {
      required: false,
      type: 'text',
      label: 'Talla del Jersey',
      name: 'talla_jersey'
    },
    {
      required: false,
      type: 'select',
      label: 'Tipo de equipo',
      name: 'equipo_jersey',
      opcSelect: [
        { value: '', label: 'Selecciona una opción' },
        { value: 'Propio', label: 'Propio' },
        { value: 'Prestado', label: 'Prestado' }
      ]
    }
  ],
  fundaFields: [
    {
      required: false,
      type: 'text',
      label: 'Número de serie de la funda',
      name: 'numero_serie_funda'
    },
    {
      required: false,
      type: 'text',
      label: 'Talla de la funda',
      name: 'talla_funda'
    },
    {
      required: false,
      type: 'select',
      label: 'Tipo de equipo',
      name: 'equipo_funda',
      opcSelect: [
        { value: '', label: 'Selecciona una opción' },
        { value: 'Propio', label: 'Propio' },
        { value: 'Prestado', label: 'Prestado' }
      ]
    }
  ]
}
