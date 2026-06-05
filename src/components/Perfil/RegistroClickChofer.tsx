import { useState } from "react";
import { RegistroClicks } from "../../types/registroClicks";
import { useOnInit } from "../../utils/hooks";
import { choferService } from "../../services/ChoferService";
import { Box, Container, Typography } from "@mui/material";
import TarjetaRegistroClick from "../Tarjetas/TarjetaRegistroClick";
import { Spinner } from "../Spinner";
import { ErrorResponse, mostrarMensajeError } from "../../utils/errorHandling";
import { Notificacion } from "../Modales/Notificacion";

export function RegistroClickChofer() {

    const [registroClicks, setRegistroClicks] = useState<RegistroClicks[]>([]);
    const [mensajeNotificacion, setMensajeNotificacion] = useState('')
    const [mostrarNotificacion,setMostrarNotificacion] = useState(false)
    const [severidad,setSeveridad] = useState<'info'|'success'|'error'|'warning'>('info')
    const [isLoading, setIsLoading] = useState(false)

    useOnInit(() => {
      const obtenerRegistroClicks = async () => {
        setIsLoading(true)
        try {   
          const registroClicksChofer = await choferService.getChoferClicks()
          setRegistroClicks(registroClicksChofer);
        }
        catch(error) {
          mostrarMensajeError(error as ErrorResponse, setMensajeNotificacion)
          manejarErrorServidor()
        }
        finally {
          setIsLoading(false)
        }
    }

    obtenerRegistroClicks();
  })

  const abrirNotificacion = () => {
    cerrarNotificacion()
    setTimeout(()=> setMostrarNotificacion(true),0)
  }

  const cerrarNotificacion = () => {
    setMostrarNotificacion(false)
  }

  const manejarErrorServidor = () => {
    setSeveridad('error')
    abrirNotificacion()
  }

  return (
    <Container disableGutters sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%' }}> 
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", width: "100%", pb:"4rem" }}>
        {registroClicks.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No hay clicks registrados en este momento.
          </Typography>
        ) : (
          registroClicks.map((tarjetaClick) => (
            <TarjetaRegistroClick  tarjeta={tarjetaClick}  />
          ))
        )}
      </Box>
    
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        width: '100%', 
        marginTop: 4,
        position: 'fixed',
        zIndex: 1000,
        bottom: '3.4375rem',
        left: 0,
        backgroundColor: 'white' 
        }}
      >
        <Typography variant="body1" color="black" fontWeight="bold" fontSize= "25px" >
          Total clicks
        </Typography>
        <Typography variant="h6" color="black"  sx={{ fontSize: "25px", margin: 0 }}>
          {registroClicks.length}
        </Typography>
      </Box>

      <Notificacion
        open={mostrarNotificacion}
        mensaje={mensajeNotificacion}
        severidad={severidad}
        onClose={cerrarNotificacion}
      />
      
      <Spinner isLoading={isLoading} />
    </Container>
    );
}