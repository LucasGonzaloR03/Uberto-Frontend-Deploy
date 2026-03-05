import { Avatar, Box, Card, Container, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import ModalBase from "../Modales/ModalEliminar";
import  { useState } from "react";

export interface CardAmigoProps {
  id: number;
  nombre: string;
  otroDato: string;
  imagenUsuario: string;
  eliminar: () => void; 
}

export function CardAmigo({  nombre, otroDato, imagenUsuario, eliminar}: CardAmigoProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleEliminar = () => {
    eliminar(); 
    setModalOpen(false); 
  };
  
  return (
    <Container
      className="CardAmigo"
      sx={{ display: "flex", padding: "1em" }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderRadius: "1em",
          padding: "1em",
          width: "100%",

        }}
      >
        <Avatar
          src={imagenUsuario || "https://via.placeholder.com/50"}
          alt={nombre}
          sx={{ width: "3rem", height: "3rem", marginRight: "1em" }}
        />

        <Box className="ContenedorInfoAmigo" sx={{ flexGrow: 1, textAlign: "left" }}>
          <Typography fontWeight="bold" fontSize="1.1em">
            {nombre || "Nombre Apellido"}
          </Typography>
          <Typography color="#9CA3AF" fontSize="0.9em">
            {otroDato || "Otro dato"}
          </Typography>
        </Box>

        <IconButton
          data-testid="boton-eliminar"
          onClick={() => setModalOpen(true)}
          sx={{ fontSize: "1.2em", marginLeft: "0.8em" }}
        >
          <Delete fontSize="medium" />
        </IconButton>
      </Card>
      <ModalBase
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        elemento="amigo"
        onConfirm={handleEliminar}
      />
    </Container>
  );
}

export default CardAmigo;