import React, { useState } from "react";
import { Box, Button, Modal, Typography, Rating, TextField } from "@mui/material";

interface ModalCalificarProps {
  idViaje:number
  open: boolean
  onClose: () => void
  onConfirm: (idViaje:number,comentario: string, puntuacion: number) => void
}

const ModalCalificar: React.FC<ModalCalificarProps> = ({idViaje, open, onClose, onConfirm }) => {
  const [puntuacion, setPuntuacion] = useState<number | null>(null);
  const [comentario, setComentario] = useState<string>("");

  const handleConfirmar = () => {
    if (puntuacion !== null && comentario!=='') {
      onConfirm(idViaje,comentario, puntuacion);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 300, margin: "auto", mt: "20%", p: 3, backgroundColor: "white", borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "var(--primary-color)" }}>
          Califica este viaje
        </Typography>
        
        <Rating name="calificacion" value={puntuacion} onChange={(_, newValue) => setPuntuacion(newValue)} />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Escribe un comentario..."
          variant="outlined"
          sx={{ mt: 2 }}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />

        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleConfirmar} disabled={puntuacion === null} sx={{color:'var(--primary-color)'}}>
            Confirmar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalCalificar;