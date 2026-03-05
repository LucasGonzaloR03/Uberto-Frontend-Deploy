import { Box, Button, CardContent, Divider, Typography } from '@mui/material';
import { TarjetaViaje } from '../../domain/viaje';
import PeopleIcon from '@mui/icons-material/People';
import dayjs from "dayjs";
import { obtenerUserTipo } from '../../services/UsuarioService';
import ModalCalificar from '../Modales/ModalCalificar';
import { useState } from 'react';

export interface CardViajeProps {
  tarjeta: TarjetaViaje;
  esRealizado: boolean;
  manejarCalificacion:(idViaje:number,comentario:string,puntaje:number) => void
}

export function CardViaje({ tarjeta, esRealizado, manejarCalificacion }: CardViajeProps) {
  const fechaViaje = dayjs(tarjeta.fechaInicio).format("DD/MM/YYYY");
  const [modalCalificarOpen,setModalCalificarOpen]=useState(false)
  const convertirHora = (fechaString: string) => { return dayjs(fechaString).format("HH:mm"); }

  const calificarElViaje = (idViaje:number,comentario:string,puntaje:number) => {
    setModalCalificarOpen(false)
    manejarCalificacion(idViaje,comentario,puntaje)
  }

  return (
    <CardContent sx={{ width: '100%', height: 'auto' }}>
      <Box 
        sx={{
          display: 'flex', 
          alignItems: 'center',
          padding: '12px 18px', 
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          flexDirection: 'row', 
          backgroundColor: 'var(--primary-color)',
          justifyContent: 'space-between', 
        }}
      >
        <Box>
          <Typography color="white" sx={{ fontSize: "16px", textAlign: "start", flex: 1 }}>
            { !obtenerUserTipo() ? tarjeta.chofer.nombreCompleto : tarjeta.pasajero.nombreCompleto}
          </Typography>

          <Box display="flex" alignItems="center">
            <Typography color="white" sx={{ fontSize: "15px" }}>
              {tarjeta.cantidadDePasajeros}
            </Typography>
            <PeopleIcon sx={{ marginLeft: "4px",  color: "white" }}/>
          </Box>
        </Box>
        
        <img 
          src={ !obtenerUserTipo() ? tarjeta.chofer.fotoPerfil : tarjeta.pasajero.fotoPerfil} 
          
          style={{ borderRadius: '50%', width: 40, height: 40 }}
        />
      </Box>

      <Box 
        sx={{
          padding: '8px 16px',
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>

          <Typography sx={{ color: "black", fontSize: "12px", fontWeight: 'bold' }}>
            Desde  
          </Typography>
          <Typography sx={{ color: "black", fontSize: "12px" }}>

            {tarjeta.origen}
          </Typography>
        </Box>

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>

          <Typography sx={{ color: "black", fontSize: "12px", fontWeight: 'bold' }}>
            Hacia  
          </Typography>
          <Typography sx={{ color: "black", fontSize: "12px" }}>
            {tarjeta.destino}
          </Typography>
        </Box>

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>

          <Typography sx={{ color: "black", fontSize: "12px", fontWeight: 'bold' }}>
            Horario 
          </Typography>
          <Typography sx={{ color: "black", fontSize: "12px" }}>
            {fechaViaje}  |  {convertirHora(tarjeta.fechaInicio)} - {convertirHora(tarjeta.fechaFin)} hs
          </Typography>
        </Box>

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>

          <Typography color="secondary" sx={{ color: "black", fontSize: "15.5px", fontWeight: 'bold' }}>
            Importe 
          </Typography>
          <Typography color="secondary" sx={{ color: "black", fontSize: "15.5px" }}>
            $ {!obtenerUserTipo() ? tarjeta.importeComision : tarjeta.importeNormal}

          </Typography>
        </Box>
        {esRealizado && !tarjeta.fueCalificado && (
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Divider orientation="horizontal" flexItem sx={{ opacity: 1, width: "100%", my: 1 }} />
          <Button
            sx={{ backgroundColor: "var(--secondary-color)", mt: 1, textTransform: "none", width: "100%" }}
            variant="contained"
            size="large"
            onClick={()=>setModalCalificarOpen(true)}
          >
            Quiero calificarlo
          </Button>
        </Box>
        )}
      </Box> 
      <ModalCalificar
        idViaje={tarjeta.id}
        open={modalCalificarOpen}
        onClose={() => setModalCalificarOpen(false)}
        onConfirm={calificarElViaje} 
      />
    </CardContent>

  );
}

export default CardViaje;