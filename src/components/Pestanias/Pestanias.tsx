import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import React from 'react';
import  { DatosPasajero } from '../Perfil/DatosPasajero';
import { obtenerUserTipo } from '../../services/UsuarioService';
import ViajesPasajero from '../Perfil/ViajesPasajero';
import { Calificaciones } from '../Perfil/Calificaciones';
import DatosChofer from '../Perfil/DatosChofer';
import ViajesChofer from '../Perfil/ViajesChofer';
import { RegistroClickChofer } from '../Perfil/RegistroClickChofer';

interface PestaniasProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function Pestanias( props: PestaniasProps) {
  
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider',display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{
          "& .MuiTabs-indicator": {
           backgroundColor: "var(--primary-color)", 
            },
            "& .MuiTab-root": {
            color: "#757575", 
             "&.Mui-selected": {
            color: "var(--primary-color)", 
      }
    },
  }}>
          <Tab label="Datos" {...a11yProps(0)} />
          <Tab label="Viajes" {...a11yProps(1)} />
          <Tab label="Calificaciones" {...a11yProps(2)} />        
          {obtenerUserTipo() && <Tab label="Registro clicks" {...a11yProps(3)} />} 
        </Tabs>
      </Box>
      <Pestanias value={value} index={0}>
        {!obtenerUserTipo()  ? <DatosPasajero /> : <DatosChofer  />}        
      </Pestanias>
      <Pestanias value={value} index={1}>
      {!obtenerUserTipo() ? <ViajesPasajero /> : <ViajesChofer />} 
      </Pestanias>
      <Pestanias value={value} index={2}>
        <Calificaciones/>
        </Pestanias> 
      <Pestanias value={value} index={3}>
        <RegistroClickChofer/>
        </Pestanias>     
    </Box>
  );
}
