import  { useState } from "react";
import { AmigoDelAmigoDTO } from "../../types/pasajero";
import { Dialog, DialogTitle, DialogContent, Button, DialogActions, Typography, InputLabel, FormControl, MenuItem, Select} from "@mui/material";

interface ModalAgregarAmigoProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (id: number) => void
  posiblesAmigos: AmigoDelAmigoDTO[]
}


export function CardAgregarAmigo({ open, onClose, onConfirm,  posiblesAmigos }: ModalAgregarAmigoProps) {

  const [seleccionado, setSeleccionado] = useState<number | "">("");

  const handleConfirmar = () => {
    if (seleccionado) {
      onConfirm(Number(
        seleccionado)
      );
    }
    setSeleccionado(0)
    onClose()
  };

  return (
    
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    
      <DialogTitle>
        <Typography sx={{ color: "var(--primary-color)", fontWeight: "bold" }}>
          Agregar Amigo
        </Typography>
      </DialogTitle>
    
            <DialogContent>
              {posiblesAmigos.length > 0 ? (
                <FormControl fullWidth margin="normal" sx={{ position: 'relative' }}>
                  <InputLabel
                    id="selecciona-amigo-label"
                    sx={{
                      color: "var(--primary-color)",
                      '&.Mui-focused': {
                        color: "var(--secondary-color)",
                      },
                      top: -10, 
                      fontSize: "1em",
                    }}
                    shrink={true} 
                  >
                    Selecciona un amigo
                  </InputLabel>
                  <Select
                    labelId="selecciona-amigo-label"
                    value={seleccionado}
                    onChange={(e) => setSeleccionado(Number(e.target.value) || "")}
                    sx={{
                      '& label.Mui-focused': { color: '#4e199e' }, 
                      '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#4e199e' }, 
                          '&:hover fieldset': { borderColor: '#7a3eb1' }, 
                          '&.Mui-focused fieldset': { borderColor: '#4e199e' } 
                      }
                  }}
                  >
                    {posiblesAmigos.map((amigo,index) => (
                      <MenuItem key={index} value={amigo.id}>
                        {amigo.nombre} {amigo.apellido}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : <Typography color="textSecondary">No hay amigos disponibles para agregar.</Typography>
              }
            </DialogContent>
        
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={handleConfirmar}
          color="primary"
          variant="contained"
          disabled={!seleccionado}
        >
          Aceptar
        </Button>
      </DialogActions>

    </Dialog>
  );
}

export default { CardAgregarAmigo };