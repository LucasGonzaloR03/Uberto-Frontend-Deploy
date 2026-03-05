import { Typography, Box, Container } from "@mui/material";
import { useState } from "react";
import { TarjetaViaje } from "../../domain/viaje";
import { choferService } from "../../services/ChoferService";
import CardViaje from "../Tarjetas/TarjetaViaje";
import { useOnInit } from "../../utils/hooks";
import { ErrorResponse, mostrarMensajeError } from "../../utils/errorHandling";
import { Notificacion } from "../Modales/Notificacion";

const ViajesChofer = () => {
  const [viajesRealizados, setViajesRealizados] = useState<TarjetaViaje[]>([]);
  const [sumatoriaTotal, setSumatoriaTotal] = useState(0)
  const [mensajeNotificacion, setMensajeNotificacion] = useState('')
  const [mostrarNotificacion,setMostrarNotificacion] = useState(false)
  const [severidad,setSeveridad] = useState<'info'|'success'|'error'|'warning'>('info')

  useOnInit(()=>{
    traerViajesRealizados()
    actualizarSaldoChofer()
  })

  const traerViajesRealizados = async () => {
    try {
      const todosViajes = await choferService.getViajesRealizados();
      setViajesRealizados(todosViajes);
    } catch (error: unknown) {
      mostrarMensajeError(error as ErrorResponse, setMensajeNotificacion)
      manejarErrorServidor()
    }
  };

  const actualizarSaldoChofer = async () => {
    try {
      const monto = await choferService.getImporteTotal();
      setSumatoriaTotal(monto);
    } catch (error: unknown) {
      mostrarMensajeError(error as ErrorResponse, setMensajeNotificacion)
      manejarErrorServidor()
    }
  };

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
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginBottom: 2 }}>
        <Typography variant="body1" color="black" fontWeight="bold" sx={{ textAlign: "left", width: "100%", margin: 0 }}>
          Viajes Realizados
        </Typography>  
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", width: "100%", pb:"4rem" }}>
        {viajesRealizados.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No hay viajes realizados en este momento.
          </Typography>
        ) : (
          viajesRealizados.map((tarjetaViaje) => (
            <CardViaje key={tarjetaViaje.id} tarjeta={tarjetaViaje} esRealizado={false} manejarCalificacion={()=>{}} />
          ))
        )}
      </Box>
    
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '100%', 
        marginTop: 4,
        position: 'fixed',
        zIndex: 1000,
        bottom: '3.4375rem',
        left: 0,
        backgroundColor: 'white' 
        }}
      >
        <Typography variant="body1" color="black" fontWeight="bold" sx={{ textAlign: "left", width: "100%" }}>
          Total facturado
        </Typography>
        <Typography variant="h6" color="black" textAlign="left" sx={{ fontSize: "15px", margin: 0 }}>
          ${sumatoriaTotal}
        </Typography>
      </Box>
      <Notificacion
        open={mostrarNotificacion}
        mensaje={mensajeNotificacion}
        severidad={severidad}
        onClose={cerrarNotificacion}
      />
    </Container>
  );
};

export default ViajesChofer;