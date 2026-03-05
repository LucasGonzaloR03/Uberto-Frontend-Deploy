const INTERNAL_SERVER_ERROR = 500
const BAD_REQUEST = 400
const UNAUTHORIZED = 401
const FORBIDDEN = 403
const NOT_FOUND = 404
const METHOD_NOT_ALLOWED = 405
const REQUEST_TIMEOUT = 408

export const mostrarMensajeError = (error: ErrorResponse, setearMensaje: (mensaje: string) => void) => {
  const status = error.response?.status
  let mensajeError = error.response?.data?.message || 'Error desconocido'
  
  if (status === 0) {
    mensajeError = 'Estamos trabajando para vos :)\nDisculpa las molestias!'
  } else if (status === INTERNAL_SERVER_ERROR) {
    mensajeError = 'Error en la operación.\nConsulta al administrador del sistema.'
    console.error(error)
  } else if (status === BAD_REQUEST) {
    mensajeError = 'Error en la operación.\nVerifica los datos enviados.'
    console.error(error)
  } else if (status === UNAUTHORIZED) {
    mensajeError = 'Operación no autorizada.'
    console.error(error)
  } else if (status === FORBIDDEN) { 
    mensajeError = 'No tienes permisos para realizar esta acción.'
    console.error(error)
  } else if (status === NOT_FOUND) {
    mensajeError = 'Url o usuario no encontrado.\nVerifica los datos ingresados.'
    console.error(error)
  } else if (status === METHOD_NOT_ALLOWED) {
    mensajeError = 'Recurso solicitado no existe o imposible acceder.'
    console.error(error)
  } else if (status === REQUEST_TIMEOUT) {
    mensajeError = 'La operación está tardando en responder.\nInténtalo más tarde.'
    console.error(error)
  } else if (!status) {
    mensajeError = 'Ocurrió un error al conectarse al backend. Consulte al administrador del sistema'
  }

  setearMensaje(mensajeError)
}

export type ErrorResponse = {
  response?: {
    status?: number,
    data?: {
      message?: string
    }
  }
}