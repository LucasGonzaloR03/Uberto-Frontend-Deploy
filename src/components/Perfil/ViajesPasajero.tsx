import { Typography, Box, Container } from "@mui/material";
import { TarjetaViaje } from "../../types/viaje";
import { useState } from "react";
import CardViaje from "../Tarjetas/TarjetaViaje";
import { pasajeroService } from "../../services/PasajeroService";
import { useOnInit } from "../../utils/hooks";
import { ErrorResponse, mostrarMensajeError } from "../../utils/errorHandling";
import { Notificacion } from "../Modales/Notificacion";
import { Spinner } from "../Spinner";

const ViajesPasajero = () => {
  const [viajesPendientes, setViajesPendientes] = useState<TarjetaViaje[]>([]);
  const [viajesRealizados, setViajesRealizados] = useState<TarjetaViaje[]>([]);
  const [notificacion, setNotificacion] = useState({ open: false, mensaje: "", severidad: "success" as "success" | "error" | "info" });
  const [mensajeError, setMensajeError] =useState("")
  const [isLoading, setIsLoading] = useState(false)

  useOnInit(() => {
    traerViajesRealizados();
    traerViajesPendientes();
  })

  const traerViajesRealizados = async () => {
    setIsLoading(true)
    try {
      const todosViajes = await pasajeroService.getViajesRealizados();
      setViajesRealizados(todosViajes);
    } catch (error: unknown) {
      if ((error as ErrorResponse).response?.status === 404) {
        setNotificacion({open:true, mensaje:(error as ErrorResponse).response?.data?.message || 'No se encontraron viajes realizados.', severidad:"info"})
      }else{
        mostrarMensajeError(error as ErrorResponse,setMensajeError)
        setNotificacion({open:true, mensaje:`${mensajeError}`, severidad:"error"})
      }
    }finally{
      setIsLoading(false)
    }
  };

  const traerViajesPendientes = async () => {
    setIsLoading(true)
    try {
      const todosViajes = await pasajeroService.getViajesPendientes();
      setViajesPendientes(todosViajes);
    } catch (error: unknown) {
      if ((error as ErrorResponse).response?.status === 404) {
        setNotificacion({open:true, mensaje:(error as ErrorResponse).response?.data?.message || 'No se encontraron viajes pendientes.', severidad:"info"})
      }else{
        mostrarMensajeError(error as ErrorResponse,setMensajeError)
        setNotificacion({open:true, mensaje:`${mensajeError}`, severidad:"error"})
      }
    }finally{
      setIsLoading(false)
    }
  };

  const handleConfirmarCalificacion = async(idViaje:number,comentario:string,puntaje:number) => {
    setIsLoading(true)
      try{
        pasajeroService.postCalificacion(idViaje,comentario,puntaje)
        setNotificacion({open:true, mensaje:'Se califico con exito el viaje', severidad:"success"})
        await new Promise((res) => setTimeout(res, 500))
        await traerViajesRealizados()
      }
      catch(error) {   
      mostrarMensajeError(error as ErrorResponse,setMensajeError)
      setNotificacion({open:true, mensaje:`${mensajeError}`, severidad:"error"}) 
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <Container disableGutters sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%', marginBottom:'4rem' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginBottom: 2 }}>

        <Typography variant="body1" color="black" fontWeight="bold" sx={{ textAlign: "left", width: "100%" }}>
            Realizados
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", width: "100%" }}>
        {viajesRealizados.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No hay viajes realizados en este momento.
          </Typography>
        ) : (
          viajesRealizados.map((tarjetaViaje) => (
            <CardViaje key={tarjetaViaje.id} tarjeta={tarjetaViaje} esRealizado={true} manejarCalificacion={handleConfirmarCalificacion} />
          ))
        )}
      </Box>
  
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginTop: 4 }}>

        <Typography variant="body1" color="black" fontWeight="bold" sx={{ textAlign: "left", width: "100%" }}>

          Pendientes
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", width: "100%", marginBootom:'10rem' }}>
        {viajesPendientes.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No hay viajes pendientes en este momento.
          </Typography>
        ) : (
          viajesPendientes.map((tarjetaViaje) => (
            <CardViaje key={tarjetaViaje.id} tarjeta={tarjetaViaje} esRealizado={false} manejarCalificacion={() => {}}/>
          ))
        )}
      </Box>
      <Notificacion
        open={notificacion.open}
        mensaje={notificacion.mensaje}
        severidad={notificacion.severidad}
        onClose={() => setNotificacion({ ...notificacion, open: false })}
      />
      <Spinner isLoading={isLoading} />
    </Container>
  );  
};

export default ViajesPasajero;