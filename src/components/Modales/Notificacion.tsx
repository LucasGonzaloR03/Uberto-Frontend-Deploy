import { Container, Alert, Snackbar } from "@mui/material";

export interface NotificacionProps {
  open: boolean;
  mensaje: string;
  severidad: "info" | "warning" | "error" | "success";
  onClose: () => void;
}

export function Notificacion({ open, mensaje, severidad, onClose }: NotificacionProps) {
  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Snackbar
        open={open}
        autoHideDuration={3000} 
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={onClose} severity={severidad}>
          {mensaje}
        </Alert>
      </Snackbar>
    </Container>
  );
}

