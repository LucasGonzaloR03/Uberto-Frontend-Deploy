import { useState } from "react";
import TarjetaComentario from "../Tarjetas/TarjetaComentario";
import { TarjetaCalificacion } from "../../types/calificacion";
import { Box, Typography} from "@mui/material";
import { ErrorResponse, mostrarMensajeError } from "../../utils/errorHandling";
import { Notificacion } from "../Modales/Notificacion";
import { useOnInit } from "../../utils/hooks";
import { pasajeroService } from "../../services/PasajeroService";
import { obtenerUserTipo } from "../../services/UsuarioService";
import { choferService } from "../../services/ChoferService";
import { Spinner } from "../Spinner";

export const Calificaciones = () => {
  const [calificaciones, setCalificaciones] = useState<TarjetaCalificacion[]>([]);
  const [mensajeNotificacion, setMensajeNotificacion] = useState('')
  const [mostrarNotificacion,setMostrarNotificacion] = useState(false)
  const [severidad,setSeveridad] = useState<'info'|'success'|'error'|'warning'>('info')
  const [isLoading, setIsLoading] = useState(false)

  const traerCalificaciones = async() => {
    setIsLoading(true)
    try{
      if(obtenerUserTipo()){
        const calificacionesDelUsuario = await choferService.getCalificaciones()
        setCalificaciones(calificacionesDelUsuario)
      }
      else{
        const calificacionesDelUsuario = await pasajeroService.getCalificaciones()
        setCalificaciones(calificacionesDelUsuario)
      }
    }catch(error:unknown){
      mostrarMensajeError(error as ErrorResponse,setMensajeNotificacion)
      manejarErrorServidor()
    }finally{
      setIsLoading(false)
    }
  }

  const onEliminar = async (idCalificacion:number) => {
    setIsLoading(true)
    try{
      pasajeroService.deleteCalificacion(idCalificacion)
      setMensajeNotificacion("Se elimininó calificación con éxito")
      setSeveridad("success")
      abrirNotificacion()
      await new Promise((res) => setTimeout(res, 500))
      await traerCalificaciones()
    }catch(error:unknown){
      mostrarMensajeError(error as ErrorResponse,setMensajeNotificacion)
      manejarErrorServidor()
    }finally{
      setIsLoading(false)
    }
  }

  useOnInit( traerCalificaciones )

  const cerrarNotificacion = () => { setMostrarNotificacion(false) }

  const manejarErrorServidor = () => {
    setSeveridad('error')
    abrirNotificacion()
  }
  
  const abrirNotificacion = () => {
    cerrarNotificacion()
    setTimeout(()=> setMostrarNotificacion(true),0)
  }

    
  return (
    <Box sx={{mb:"4rem"}}>
    
    {calificaciones.length === 0 ? (
        <Typography variant="body1">No hay calificaciones disponibles.</Typography>
      ) : (
          calificaciones.map((calificacion, indice) => (
              <TarjetaComentario
                key={indice}
                calificacion={calificacion}
                esPasajeroCalificacion={true}
                onEliminar={onEliminar}
                esDetalle={false}
              />
          ))
      )}

      <Notificacion
        open={mostrarNotificacion}
        mensaje={mensajeNotificacion}
        severidad={severidad}
        onClose={cerrarNotificacion}
      />

      <Spinner isLoading={isLoading} />
    </Box>
  );
};
