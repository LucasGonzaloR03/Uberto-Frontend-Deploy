import { Box } from '@mui/material';
import Pestanias from '../../components/Pestanias/Pestanias';
import FotoDePerfil from '../../components/Formularios/FotoDePerfil';


const PerfilUsuario = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', paddingTop:'2rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 5 }}>
        <FotoDePerfil />       
      </Box>      
      <Pestanias></Pestanias>
    </Box>
  );
};

export default PerfilUsuario;