import { Box, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalBase from '../Modales/ModalEliminar';
import React, { useState } from "react";
import { TarjetaCalificacion } from '../../types/calificacion';
import { obtenerUserTipo  } from '../../services/UsuarioService';

export interface TarjetaProps {
  calificacion:TarjetaCalificacion,
  esPasajeroCalificacion:boolean,
  onEliminar:(idCalificacion:number)=>void,
  esDetalle: boolean
}

const TarjetaComentario: React.FC<TarjetaProps> = ({ calificacion,esPasajeroCalificacion,onEliminar,esDetalle }: TarjetaProps) => {
  const [modalEliminarOpen, setModalEliminarOpen] = useState(false);

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "white", borderRadius: 4, border: '2px solid  #4e199e', margin: '1rem' }}>
    
    <CardHeader

        avatar={<img 
          src={ esDetalle ? calificacion.pasajero.fotoPerfil : obtenerUserTipo() ?  calificacion.pasajero.fotoPerfil: calificacion.chofer.fotoPerfil} 
          
          style={{ borderRadius: '50%', width: 40, height: 40 }}
        />}
        
        title={esDetalle ? `De ${calificacion.pasajero.nombreCompleto}`  : !obtenerUserTipo() ? `Para ${calificacion.chofer.nombreCompleto}` : `De ${calificacion.pasajero.nombreCompleto}`  }
        titleTypographyProps={{ fontWeight: "bold" }}
        subheader={calificacion.fechaRealizado.toLocaleDateString()}
      
        action={
        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <StarIcon />
          {calificacion.puntaje}
          <CardActions disableSpacing>
            {!obtenerUserTipo() &&  esPasajeroCalificacion &&
          (
              <IconButton aria-label="delete" sx={{color:"var(--primary-color)"}}  >
                <DeleteIcon onClick={() => setModalEliminarOpen(true)} />
              </IconButton>
        )}
          </CardActions>
        </Box>
      }

    />

      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {calificacion.comentario}
        </Typography>
      </CardContent>

      <ModalBase
        open={modalEliminarOpen}
        onClose={() => setModalEliminarOpen(false)}
        onConfirm={() => onEliminar(calificacion.id)}
        elemento="calificacion"
      />
    </Card>
  );
};

export default TarjetaComentario;