import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  getDocs,
  query,
  where,
  getDoc
} from 'firebase/firestore'
import { db } from './db/firebaseConfig'
import dayjs from 'dayjs'
import { createCaja } from './caja'
import { removePlayer } from './players'

const pagosCollection = collection(db, 'pagos_jugadores')

// Crear un pago
export const createPayment = async (data) => {
  try {
    const actuallyDate = dayjs()

    const newData = {
      ...data,
      fecha_registro: actuallyDate.format('YYYY-MM-DD')
    }

    const docRef = await addDoc(pagosCollection, newData)
    return docRef.id
  } catch (error) {
    console.error('Error al agregar pago:', error)
  }
}

// Obtener registro
export const getPayments = async (callback) => {
  return onSnapshot(pagosCollection, (snapshot) => {
    const data = snapshot.docs.map((doc) => {
      const pago = doc.data()
      const pagos = pago.pagos || []
      const fecha_inscripcion = dayjs(doc.data().fecha_registro).format(
        'DD/MM/YYYY'
      )

      return {
        id: doc.id,
        jugador: { value: pago.jugadorId, label: pago.nombre },
        prorroga: pagos.find((p) => p.tipo === 'Inscripción')?.prorroga,
        fecha_limite: pagos.find((p) => p.tipo === 'Inscripción')?.fecha_limite,
        inscripcion: pagos.find((p) => p.tipo === 'Inscripción')?.estatus,
        pesaje: pagos.find((p) => p.tipo === 'Pesaje')?.estatus,
        equipamiento: pagos.find((p) => p.tipo === 'Equipamiento')?.estatus,
        fecha_inscripcion,
        ...doc.data()
      }
    })

    callback(data)
  })
}

// Obtener jugadores por temporada
export const getPagosJugadoresTempCat = async (temporadaId, categoria) => {
  try {
    const snapshot = await getDocs(
      query(
        pagosCollection,
        where('temporadaId', '==', temporadaId),
        where('categoria', '==', categoria)
      )
    )

    const data = snapshot.docs.map((doc) => {
      const pago = doc.data()
      const pagos = pago.pagos || []

      return {
        id: doc.id,
        jugador: { value: pago.jugadorId, label: pago.nombre },
        prorroga: pagos.find((p) => p.tipo === 'Inscripción')?.prorroga,
        fecha_limite: pagos.find((p) => p.tipo === 'Inscripción')?.fecha_limite,
        inscripcion: pagos.find((p) => p.tipo === 'Inscripción')?.estatus,
        tunel: pagos.find((p) => p.tipo === 'Túnel')?.estatus,
        botiquin: pagos.find((p) => p.tipo === 'Botiquín')?.estatus,
        coacheo: pagos.find((p) => p.tipo === 'Coaching')?.estatus,
        ...doc.data()
      }
    })

    return data
  } catch (error) {
    console.error('Error al obtener porristas:', error)
    return []
  }
}

export const getPaymentById = async (id) => {
  try {
    const docRef = doc(db, 'pagos_jugadores', id)
    const docSnap = await getDoc(docRef)

    const payment = docSnap.data()
    return {
      ...payment,
      id: docSnap.id
    }
  } catch (error) {
    console.error('Error al obtener el jugador:', error)
    return null
  }
}

export const getPaymentByJugadorId = async (id) => {
  try {
    const snapshot = await getDocs(
      query(pagosCollection, where('jugadorId', '==', id))
    )

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error al obtener el jugador:', error)
    return null
  }
}

// Función para limpiar los datos de cada pago (incluyendo todos los campos undefined)
const cleanPagoData = (pago) => {
  // Limpiar todos los campos dentro de cada pago
  for (const key in pago) {
    if (pago[key] === undefined) {
      pago[key] = null // Si el campo es undefined, lo convierte en null
    }
  }
  return pago
}

// Función de limpieza general para los datos
const cleanData = (data) => {
  // Limpiar los datos principales del pago
  const cleanedData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value === undefined ? null : value // Convertir `undefined` a `null` en el objeto principal
    ])
  )

  // Limpiar específicamente los pagos dentro de los datos
  if (cleanedData.pagos) {
    cleanedData.pagos = cleanedData.pagos.map(cleanPagoData) // Limpiar cada pago en el array `pagos`
  }

  return cleanedData
}

// Actualizar un pago
export const updatePayment = async (id, data) => {
  try {
    let newData = { ...data }

    newData = cleanData(newData)

    // DATAS
    const inscripcion = data.pagos.find((p) => p.tipo === 'Inscripción')
    const pesaje = data.pagos.find((p) => p.tipo === 'Pesaje')
    const equipamiento = data.pagos.find((p) => p.tipo === 'Equipamiento')

    if (newData.cambiar_inscripcion) {
      newData.cambio_inscripcion = newData.cambiar_inscripcion
    }

    // Abono de inscripción
    if (inscripcion.abono === 'SI') {
      if (!Array.isArray(inscripcion.abonos)) inscripcion.abonos = []

      inscripcion.abonos.push({
        cantidad: data.cantidad_abono_ins,
        fecha: data.fecha_abono_ins,
        metodo: data.metodo_pago_abono_ins
      })

      inscripcion.total_abonado =
        parseFloat(data.cantidad_abono_ins) +
        parseFloat(inscripcion.total_abonado || 0)

      inscripcion.abono = 'NO'

      if (
        parseFloat(inscripcion.total_abonado) === parseFloat(inscripcion.monto)
      ) {
        inscripcion.estatus = 'pagado'
        inscripcion.fecha_pago = data.fecha_abono_ins
        inscripcion.metodo_pago = data.metodo_pago_abono_ins
        inscripcion.total_restante = 0
      }

      // Abonos en caja
      const inscripcionPagoCaja = {
        jugadorId: data.jugadorId,
        nombre: data.nombre,
        tabla: 'Jugador',
        concepto: 'Pago de inscripción (abono)',
        fecha_pago: data.fecha_abono_ins || hoy,
        total: data.cantidad_abono_ins || 0,
        metodo_pago: data.metodo_pago_abono_ins || null
      }
      await createCaja(inscripcionPagoCaja)
    }

    // Abono de pesaje
    if (pesaje.abono === 'SI') {
      if (!Array.isArray(pesaje.abonos)) pesaje.abonos = []

      pesaje.abonos.push({
        cantidad: data.cantidad_abono_pesaje,
        fecha: data.fecha_abono_pesaje,
        metodo: data.metodo_pago_abono_pesaje
      })

      pesaje.total_abonado =
        parseFloat(data.cantidad_abono_pesaje) +
        parseFloat(pesaje.total_abonado || 0)

      pesaje.abono = 'NO'

      if (parseFloat(pesaje.total_abonado) === parseFloat(pesaje.monto)) {
        pesaje.estatus = 'pagado'
        pesaje.fecha_pago = data.fecha_abono_pesaje
        pesaje.metodo_pago = data.metodo_pago_abono_pesaje
        pesaje.total_restante = 0
      }

      // Abonos en caja
      const pesajePagoCaja = {
        jugadorId: data.jugadorId,
        nombre: data.nombre,
        tabla: 'Jugador',
        concepto: 'Pago de pesaje (abono)',
        fecha_pago: data.fecha_abono_pesaje || hoy,
        total: data.cantidad_abono_pesaje || 0,
        metodo_pago: data.metodo_pago_abono_pesaje || null
      }
      await createCaja(pesajePagoCaja)
    }

    // Abono de equipamiento
    if (equipamiento.abono === 'SI') {
      if (!Array.isArray(equipamiento.abonos)) equipamiento.abonos = []

      equipamiento.abonos.push({
        cantidad: data.cantidad_abono_equipamiento,
        fecha: data.fecha_abono_equipamiento,
        metodo: data.metodo_pago_abono_equipamiento
      })

      equipamiento.total_abonado =
        parseFloat(data.cantidad_abono_equipamiento) +
        parseFloat(equipamiento.total_abonado || 0)

      equipamiento.abono = 'NO'

      if (
        parseFloat(equipamiento.total_abonado) ===
        parseFloat(equipamiento.monto)
      ) {
        equipamiento.estatus = 'pagado'
        equipamiento.fecha_pago = data.fecha_abono_equipamiento
        equipamiento.metodo_pago = data.metodo_pago_abono_equipamiento
        equipamiento.total_restante = 0
      }

      // Abonos en caja
      const equipamientoPagoCaja = {
        jugadorId: data.jugadorId,
        nombre: data.nombre,
        tabla: 'Jugador',
        concepto: 'Pago de equipamiento (abono)',
        fecha_pago: data.fecha_abono_equipamiento || hoy,
        total: data.cantidad_abono_equipamiento || 0,
        metodo_pago: data.metodo_pago_abono_equipamiento || null
      }
      await createCaja(equipamientoPagoCaja)
    }

    // Guardar pago en caja
    const dataEstatus = {
      ...data,
      pagos: data.pagos.map((pago) => ({ ...pago }))
    }

    const hoy = dayjs().format('YYYY-MM-DD')
    if (inscripcion.estatus === 'pagado') {
      inscripcion.total_restante = 0

      const inscripcionPago = {
        jugadorId: dataEstatus.jugadorId,
        nombre: dataEstatus.nombre,
        tabla: 'Jugador',
        concepto: 'Pago de inscripción',
        fecha_pago: inscripcion.fecha_pago || hoy,
        total: inscripcion.monto || 0,
        metodo_pago: inscripcion.metodo_pago || null
      }
      await createCaja(inscripcionPago)
    }

    if (pesaje.estatus === 'pagado') {
      pesaje.total_restante = 0

      const pesjaePago = {
        jugadorId: dataEstatus.jugadorId,
        nombre: dataEstatus.nombre,
        tabla: 'Jugador',
        concepto: 'Pago de pesaje',
        fecha_pago: pesaje.fecha_pago || hoy,
        total: pesaje.monto || 0,
        metodo_pago: pesaje.metodo_pago || null
      }
      await createCaja(pesjaePago)
    }

    if (equipamiento.estatus === 'pagado') {
      equipamiento.total_restante = 0

      const equipamientoPago = {
        jugadorId: dataEstatus.jugadorId,
        nombre: dataEstatus.nombre,
        tabla: 'Jugador',
        concepto: 'Pago de equipamiento',
        fecha_pago: equipamiento.fecha_pago || hoy,
        total: equipamiento.monto || 0,
        metodo_pago: equipamiento.metodo_pago || null
      }
      await createCaja(equipamientoPago)
    }

    delete newData.cambiar_inscripcion

    delete newData.jugador
    delete newData.equipamiento
    delete newData.inscripcion
    delete newData.prorroga
    delete newData.pesaje
    delete newData.fecha_limite

    delete newData.cantidad_abono_ins
    delete newData.fecha_abono_ins
    delete newData.metodo_pago_abono_ins

    delete newData.cantidad_abono_equipamiento
    delete newData.fecha_abono_equipamiento
    delete newData.metodo_pago_abono_equipamiento

    delete newData.cantidad_abono_pesaje
    delete newData.fecha_abono_pesaje
    delete newData.metodo_pago_abono_pesaje

    const dataRef = doc(db, 'pagos_jugadores', id)
    await updateDoc(dataRef, newData)
  } catch (error) {
    console.error('Error al actualizar pago:', error)
  }
}

// Eliminar un pago
export const removePayment = async (id) => {
  try {
    const data = await getPaymentById(id)
    await removePlayer(data.jugadorId)

    const dataRef = doc(db, 'pagos_jugadores', id)
    await deleteDoc(dataRef)
  } catch (error) {
    console.error('Error al eliminar pago:', error)
  }
}

export const removePaymentByPlayer = async (id) => {
  try {
    const dataRef = doc(db, 'pagos_jugadores', id)
    await deleteDoc(dataRef)
  } catch (error) {
    console.error('Error al eliminar pago:', error)
  }
}
