import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { Viaje } from "../../types/viaje";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { Box, TextField, Typography, IconButton, Button } from "@mui/material";
import { useOnInit } from "../../utils/hooks";
import { pasajeroService } from "../../services/PasajeroService";

export interface FormularioPasajeroProps{ onSubmit: (viaje:Viaje) => void }

export function FormularioPasajero({onSubmit}:FormularioPasajeroProps){
    const [fromTouched,setFromTouched] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [viaje,setViaje] = useState<Viaje>(new Viaje())
    const [fecha, setFecha] = useState<Dayjs | null>(viaje.fechaInicio ? dayjs(viaje.fechaInicio) : dayjs())

    useOnInit(() => {
        const obtenerUltimaBusquedaDeViajePasajero = async () => {
            const ultimaBusquedaDeViaje = await pasajeroService.getUltimaBusquedaDeUnViaje()
            setViaje(ultimaBusquedaDeViaje)
            setFecha(ultimaBusquedaDeViaje.fechaInicio ? dayjs(ultimaBusquedaDeViaje.fechaInicio) : dayjs())
        }

        obtenerUltimaBusquedaDeViajePasajero()
    })

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

    const manejarCambioDeFecha = (nuevaFecha: Dayjs | null) => {
        if (nuevaFecha && nuevaFecha.isValid()) {
            setError(null)
            setFecha(nuevaFecha)
            const fechaFromateada = nuevaFecha.format('YYYY-MM-DDTHH:mm:ss')
            manejoDeCreacionDeUnViaje('fechaInicio', fechaFromateada)
        } else if (nuevaFecha && !nuevaFecha.isValid()) {
            setError('Por favor, selecciona una fecha válida.')
            setFecha(dayjs(viaje.fechaInicio))
        } else{
            setError('La fecha es obligatoria.')
            setFecha(dayjs(viaje.fechaInicio))
        }
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        setFromTouched(true)
        if(!camposIncompletos()){
            event.preventDefault()
            generarDuracionAleatoria()
            onSubmit(viaje)
        }
    }

    return(
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
                value={fecha}
                defaultValue={dayjs()}
                minDateTime={dayjs()}
                onChange={manejarCambioDeFecha}
                slotProps={{
                    textField: {
                        error: !!error,
                        helperText: error,
                    },
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
    )      
}