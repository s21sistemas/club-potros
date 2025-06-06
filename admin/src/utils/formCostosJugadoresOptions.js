export const formOptions = {
  generalFields: [
    {
      required: true,
      type: 'async',
      label: 'Temporada *',
      name: 'temporadaId'
    },
    {
      required: true,
      type: 'select',
      label: 'Categoría *',
      name: 'categoria'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Costo de inscripción *',
      name: 'inscripcion'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Costo de equipamiento *',
      name: 'equipamiento'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Costo de pesaje *',
      name: 'pesaje'
    }
  ]
}
