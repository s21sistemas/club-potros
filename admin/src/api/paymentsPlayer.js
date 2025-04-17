import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot
} from 'firebase/firestore'
import { db } from './db/firebaseConfig'
import dayjs from 'dayjs'
import { createCaja } from './caja'

const pagosCollection = collection(db, 'pagos_jugadores')

// Crear un pago
export const createPayment = async (data) => {
  try {
    const docRef = await addDoc(pagosCollection, data)
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

      return {
        id: doc.id,
        jugador: { value: pago.jugadorId, label: pago.nombre },
        prorroga: pagos.find((p) => p.tipo === 'Inscripción')?.prorroga,
        fecha_limite: pagos.find((p) => p.tipo === 'Inscripción')?.fecha_limite,
        inscripcion: pagos.find((p) => p.tipo === 'Inscripción')?.estatus,
        pesaje: pagos.find((p) => p.tipo === 'Pesaje')?.estatus,
        equipamiento: pagos.find((p) => p.tipo === 'Equipamiento')?.estatus,
        ...doc.data()
      }
    })

    callback(data)
  })
}

// Actualizar un pago
export const updatePayment = async (id, data) => {
  try {
    // DATAS
    const inscripcion = data.pagos.find((p) => p.tipo === 'Inscripción')
    const pesaje = data.pagos.find((p) => p.tipo === 'Pesaje')
    const equipamiento = data.pagos.find((p) => p.tipo === 'Equipamiento')

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

    delete data.jugador
    delete data.equipamiento
    delete data.inscripcion
    delete data.prorroga
    delete data.pesaje
    delete data.fecha_limite

    delete data.cantidad_abono_ins
    delete data.fecha_abono_ins
    delete data.metodo_pago_abono_ins

    delete data.cantidad_abono_equipamiento
    delete data.fecha_abono_equipamiento
    delete data.metodo_pago_abono_equipamiento

    delete data.cantidad_abono_pesaje
    delete data.fecha_abono_pesaje
    delete data.metodo_pago_abono_pesaje

    const dataRef = doc(db, 'pagos_jugadores', id)
    await updateDoc(dataRef, data)
  } catch (error) {
    console.error('Error al actualizar pago:', error)
  }
}

// Eliminar un pago
export const removePayment = async (id) => {
  try {
    const dataRef = doc(db, 'pagos_jugadores', id)
    await deleteDoc(dataRef)
  } catch (error) {
    console.error('Error al eliminar pago:', error)
  }
}
