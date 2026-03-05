/* eslint-disable react-refresh/only-export-components */
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";
import { DetalleViajeDTO, Viaje } from '../../domain/viaje';
import { Box, Button, Container, createTheme, Divider, IconButton, TextField, ThemeProvider, Typography } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardChofer from '../../components/Tarjetas/TarjetaChofer';
import dayjs from 'dayjs';
import { TarjetaChofer } from '../../domain/tarjetaChofer';
import { pasajeroService } from '../../services/PasajeroService';
import { useNavigate } from 'react-router-dom';
import { Notificacion } from '../../components/Modales/Notificacion';
import { ErrorResponse, mostrarMensajeError } from '../../utils/errorHandling';


const theme = createTheme({
    palette: {
      primary: {
        main: "#4e199e", 
      },
      secondary: {
        main: "#7a3eb1",
      },
    },
});
export default theme;


export function HomePasajero() {

    const navigate = useNavigate()

    const [fromTouched, setFromTouched] = useState(false)

    const [viaje, setViaje] = useState<Viaje>(new Viaje())

    const [choferesDisponibles, setChoferesDisponibles] = useState<TarjetaChofer[]>([]);

    const [mensajeNotificacion, setMensajeNotificacion] = useState('')
    
    const [mostrarNotificacion,setMostrarNotificacion] = useState(false)
    
    const [severidad,setSeveridad] = useState<'info'|'success'|'error'|'warning'>('info')
    
    const incrementarPasajeros = () => { manejoDeCreacionDeUnViaje('cantidadPasajeros', viaje.cantidadPasajeros + 1); };

    const decrementarPasajeros = () => {if (viaje.cantidadPasajeros > 0) { manejoDeCreacionDeUnViaje('cantidadPasajeros', viaje.cantidadPasajeros - 1); } }


    const camposIncompletos = () => {
        const camposObligatorios: (keyof Viaje)[] = ['origen', 'destino', 'fechaInicio', 'cantidadPasajeros']
        return camposObligatorios.some(campo => !viaje[campo])
    }

    const generarDuracionAleatoria = () => {
        const duracion = Math.floor(Math.random()*90) + 1
        manejoDeCreacionDeUnViaje('duracion',duracion)
    }

    const manejoDeCreacionDeUnViaje = (name: keyof Viaje, value: string | number | undefined): void => {
        (viaje as unknown as Record<keyof Viaje, string | number | undefined>)[name] = value
        generarNuevoViaje(viaje)
    }

    const generarNuevoViaje = (viaje: Viaje) => {
        const nuevoViaje = Object.assign(new Viaje(), viaje)
        setViaje(nuevoViaje)
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();// Evitar el envío automático
        buscarViaje();
    };

    const buscarViaje = () => {
        setFromTouched(true);
        if (!camposIncompletos()) {
            generarDuracionAleatoria();
            traerChoferesDisponibles();
        }
        else {
            setMensajeNotificacion("Por favor completa los campos obligatorios");
            setSeveridad('error');
            abrirNotificacion();
            return;
        }
    };
    
   
    const traerChoferesDisponibles = async () => {
        try {
            const tarjetaChoferes = await pasajeroService.getChoferesDisponibles(viaje);
            setChoferesDisponibles(tarjetaChoferes);
            if (tarjetaChoferes.length === 0) { 
                setMensajeNotificacion('No se encontraron choferes disponibles para su viaje, intente de vuelta más tarde.');
                setSeveridad('info');
                abrirNotificacion();
            }
        } catch (error: unknown) {
            mostrarMensajeError(error as ErrorResponse,setMensajeNotificacion)
            manejarErrorServidor();
        }
    };
    

    const irAlDetalleViaje = (idChofer:number) => {
        const viajeDTO = new DetalleViajeDTO(viaje.origen,viaje.destino,viaje.fechaInicio,viaje.duracion,viaje.cantidadPasajeros)
        const viajeSerializado = encodeURIComponent(JSON.stringify(viajeDTO))
        navigate(`/detalleviaje/${idChofer}/${viajeSerializado}`)
    }
    
    const abrirNotificacion = () => {
        cerrarNotificacion()
        setTimeout(()=> setMostrarNotificacion(true),0)
    }

    const cerrarNotificacion = () => {
        setMostrarNotificacion(false)
    }

    const manejarErrorServidor = () => {
        setSeveridad('error')
        abrirNotificacion()
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', width: '100%', padding:'4rem 1rem' } } >
                <Typography
                    sx={{ display: 'flex', justifyItems: 'start', width: '100%' }}
                    variant="h5"
                    component="div"
                    color="primary"
                    fontWeight="bold"
                    textAlign="left"
                >
                    Realizar un viaje
                </Typography>

                <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column', width:'100%'}}>
                    <TextField 
                        label="Origen" 
                        fullWidth  
                        margin="normal" 
                        color="primary" 
                        name="origen" 
                        required
                        value={viaje.origen}
                        onChange={(event) => manejoDeCreacionDeUnViaje('origen', event.target.value)}
                        error={fromTouched && !viaje.origen}
                        helperText={
                            fromTouched && !viaje.origen ? (
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography color="red">El origen es obligatorio</Typography>
                                </Box>
                            ) : ""
                        }
                        sx={{
                            '& label.Mui-focused': { color: '#4e199e' }, 
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#4e199e' }, 
                                '&:hover fieldset': { borderColor: '#7a3eb1' }, 
                                '&.Mui-focused fieldset': { borderColor: '#4e199e' } 
                            }
                        }}
                    />

                    <TextField 
                        label="Destino" 
                        fullWidth  
                        margin="normal" 
                        color="primary" 
                        name="destino" 
                        required
                        value={viaje.destino}
                        onChange={(event) => manejoDeCreacionDeUnViaje('destino', event.target.value)}
                        error={fromTouched && !viaje.destino}
                        helperText={
                            fromTouched && !viaje.destino ? (
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography color="red">El destino es obligatorio</Typography>
                                </Box>
                            ) : ""
                        }
                        sx={{
                            '& label.Mui-focused': { color: '#4e199e' }, 
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#4e199e' }, 
                                '&:hover fieldset': { borderColor: '#7a3eb1' }, 
                                '&.Mui-focused fieldset': { borderColor: '#4e199e' } 
                            }
                        }}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            sx={{
                            width: '100%', 
                            marginTop: 2, 
                            marginBottom: 1.5,
                            '& label.Mui-focused': { color: '#4e199e' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#4e199e' },
                                '&:hover fieldset': { borderColor: '#7a3eb1' },
                                '&.Mui-focused fieldset': { borderColor: '#4e199e' }
                            }
                            }}
                            format="DD/MM/YYYY hh:mm A"
                            label="Fecha y hora"
                            name="fechaInicio"
                            value={dayjs(viaje.fechaInicio)}
                            defaultValue={dayjs()}
                            onChange={ (event) => {
                            if (event?.isValid()) {
                                const fechaISO = event.toISOString();  
                                manejoDeCreacionDeUnViaje('fechaInicio',fechaISO)
                            } else {
                                // Manejar caso de fecha no válida
                            }
                            }}
                        />
                    </LocalizationProvider>

                    <TextField
                        label="Cantidad de Pasajeros"
                        required
                        fullWidth
                        margin="normal"
                        value={viaje.cantidadPasajeros}
                        color="primary"
                        name="cantidadDePasajeros"
                        type="number"
                        onChange={(event) => manejoDeCreacionDeUnViaje('cantidadPasajeros', parseInt(event.target.value, 10))}
                        error={fromTouched && !viaje.cantidadPasajeros}
                        helperText={
                            fromTouched && !viaje.cantidadPasajeros ? (
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography color="red">La cantidad de pasajeros es obligatoria</Typography>
                                </Box>
                            ) : ""
                        }
                        InputProps={{
                            endAdornment: (
                                <Box 
                                    sx={{ height: '100%', padding: 0 }}
                                    display="flex" 
                                    alignItems="center"
                                    flexDirection="column" 
                                >
                                    <IconButton 
                                        size="small"
                                        sx={{ padding: 0 }}
                                        onClick={incrementarPasajeros} 
                                    >
                                        <ExpandLessIcon />
                                    </IconButton>
                                    <IconButton 
                                        size="small"
                                        sx={{ padding: 0 }}
                                        onClick={decrementarPasajeros} 
                                        disabled={viaje.cantidadPasajeros <= 1}   
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </Box>
                            ),
                            style: {
                                height: '52px', 
                            },
                        }}
                        sx={{
                            '& label.Mui-focused': { color: '#4e199e' }, 
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#4e199e' }, 
                                '&:hover fieldset': { borderColor: '#7a3eb1' }, 
                                '&.Mui-focused fieldset': { borderColor: '#4e199e' } 
                            }
                        }}
                    />

                    <Button
                        sx={{ backgroundColor:'var(--secondary-color)', marginTop: 3, textTransform: 'none', width: '100%' }}
                        onClick={handleSubmit}
                        variant="contained"
                        size="large"
                    >
                        Buscar
                    </Button>
                </Box>
                
                <Divider orientation="horizontal" flexItem sx={{ opacity: 1, bgColor: 'black', width:'100%', my:2 }}></Divider>
                
                <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column', width:'100%'}}>
                    <Typography
                        sx={{ display: 'flex', justifyItems: 'start'}}
                        variant="h5"
                        component="div"
                        color="primary"
                        fontWeight="bold"
                        textAlign="left"
                    >
                        Resultados
                    </Typography>
                    <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column', allignItems:'center'}}>
                        {choferesDisponibles.map((tarjetaChofer:TarjetaChofer,indice) => ( 
                                <CardChofer key={indice} tarjeta = {tarjetaChofer} alSeleccionarChofer={irAlDetalleViaje} /> ) 
                            )
                        }
                    </Box>
                </Box>
                <Notificacion
                    open={mostrarNotificacion}
                    mensaje={mensajeNotificacion}
                    severidad={severidad}
                    onClose={cerrarNotificacion}
                />
            </Container>     
        </ThemeProvider>
    );
}
