import { getPlayerById, getUserByUID } from '../api/players'
import { getArticuloById } from '../api/articulos'

import dayjs from 'dayjs'
import 'dayjs/locale/es'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { HOST } from '../config'

dayjs.locale('es')
dayjs.extend(customParseFormat)

export const usePDFEquipamiento = () => {
  const downloadPDFEquipamiento = async (data) => {
    const player = await getPlayerById(data.jugadorId.value)
    const tutor = await getUserByUID(player.uid.value)

    const edad = dayjs().diff(player.fecha_nacimiento, 'year')

    const preciosReposicion = await Promise.all(
      data.equipamiento_asignado.map(async (item) => {
        if (!item.value) return 0
        try {
          const articulo = await getArticuloById(item.value)
          return articulo?.precio_reposicion
            ? parseFloat(articulo.precio_reposicion)
            : 0
        } catch (e) {
          console.error(`Error al obtener artículo para reposición`, e)
          return 0
        }
      })
    )

    const totalReposicion = preciosReposicion.reduce(
      (acc, precio) => acc + precio,
      0
    )

    const info = {
      temporada: player.temporadaId.label,
      categoria: player.categoria,
      numero_jersey: data.numero || 'N/A',
      nombre_jugador: data.jugador,
      fecha_nacimiento: player.fecha_nacimiento,
      edad,
      domicilio: player.direccion,
      nombre_responsable: tutor.nombre_completo,
      telefono_responsable: tutor.celular,
      casco_serie: data.numero_serie_casco || 'N/A',
      casco_marca: data.marca_casco || 'N/A',
      casco_equipo: data.equipo_casco || 'N/A',
      hombreras_serie: data.numero_serie_hombreras || 'N/A',
      hombreras_marca: data.marca_hombreras || 'N/A',
      hombreras_equipo: data.equipo_hombreras || 'N/A',
      jersey_tipo: data.tipo_jersey || 'N/A',
      jersey_talla: data.talla_jersey || 'N/A',
      jersey_equipo: data.equipo_jersey || 'N/A',
      fundas_talla: data.talla_funda || 'N/A',
      fundas_equipo: data.equipo_funda || 'N/A',
      reposicion: totalReposicion,
      fecha_equipamiento: data.fecha_asignacion
    }

    const params = new URLSearchParams(info).toString()
    const url = `${HOST}/pdf/equipamiento?${params}`
    window.open(url, '_blank')
  }

  return { downloadPDFEquipamiento }
}
