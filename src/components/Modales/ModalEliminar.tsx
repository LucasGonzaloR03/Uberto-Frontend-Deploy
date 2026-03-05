import { Dialog, DialogTitle, Button, DialogActions, Typography } from "@mui/material";

interface ModalBaseProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  elemento: string;
}

export function ModalBase({ open, onClose, onConfirm, elemento }: ModalBaseProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography sx={{ color: "var(--primary-color)", fontWeight: "bold" }}>
          ¿Estás seguro que quieres borrar este {elemento}?
        </Typography>
      </DialogTitle>

      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: "var(--secondary-color)",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => {
            onConfirm(); 
            onClose(); 
          }}
          sx={{
            color: "red",
            "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.1)" },
          }}
        >
          Borrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalBase;