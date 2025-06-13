export const mapearEquipamientoAsignado = (equipamientoAsignado = [], data) => {
  // Configuraciones para cada tipo
  const configuraciones = [
    {
      nombre: 'casco',
      campos: {
        numero_serie: data.numero_serie_casco,
        marca: data.marca_casco,
        equipo: data.equipo_casco
      }
    },
    {
      nombre: 'hombreras',
      campos: {
        numero_serie: data.numero_serie_hombreras,
        marca: data.marca_hombreras,
        equipo: data.equipo_hombreras
      }
    },
    {
      nombre: 'jersey',
      campos: {
        numero_serie: data.numero_serie_jersey,
        tipo: data.tipo_jersey,
        talla: data.talla_jersey,
        equipo: data.equipo_jersey
      }
    },
    {
      nombre: 'funda',
      campos: {
        numero_serie: data.numero_serie_funda,
        talla: data.talla_funda,
        equipo: data.equipo_funda
      }
    }
  ]

  // Mapear solo lo que realmente está en el array y coincide con el nombre
  return equipamientoAsignado.map((item) => {
    // Busca la config que aplica a este item
    const cfg = configuraciones.find(
      (cfg) => item.label && item.label.toLowerCase().includes(cfg.nombre)
    )
    // Si hay config, solo fusiona los campos. Si no, regresa el item igual.
    return cfg ? { ...item, ...cfg.campos } : item
  })
}
