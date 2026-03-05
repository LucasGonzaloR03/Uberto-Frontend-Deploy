//import {  Avatar } from "@mui/material";
import { obtenerUserFotoPerfil } from "../../services/UsuarioService";


const FotoDePerfil= () => {
  return (
    <img 
      alt="foto perfil" 
      src={obtenerUserFotoPerfil() || undefined} 
      style={{borderRadius: '50%', width: 100, height: 100, margin: 20}} 
    />
  )
}

export default FotoDePerfil;
