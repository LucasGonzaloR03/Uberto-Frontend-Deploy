import { Box, Button, Container, createTheme, Divider, IconButton, TextField, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import FiltroDeBusquedaDeViaje from "../../domain/filtroDeBusquedaDeViaje";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TarjetaViaje } from '../../domain/viaje';
import { useOnInit } from "../../utils/hooks";
import CardViaje from "../../components/Tarjetas/TarjetaViaje";
import { choferService } from "../../services/ChoferService";

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

export function HomeChofer() {
 
    const [fromTouched, setFromTouched] = useState<boolean>(false)
 
    const [viajesArealizar, setViajesArealizar] = useState<TarjetaViaje[]>([])
 
    const [filtro, setFiltro] = useState<FiltroDeBusquedaDeViaje>(new FiltroDeBusquedaDeViaje())

    const incrementarPasajeros = () => { manejoDeCreacionDeUnFiltro('cantidadDePasajeros', filtro.cantidadDePasajeros + 1); };
    
    const decrementarPasajeros = () => { if (filtro.cantidadDePasajeros > 0) { manejoDeCreacionDeUnFiltro('cantidadDePasajeros', filtro.cantidadDePasajeros - 1); } }
    
    const camposIncompletos = () => {
        const camposObligatorios: (keyof FiltroDeBusquedaDeViaje)[] = ['usuario', 'origen', 'destino', 'cantidadDePasajeros']
        const camposIncompletos = camposObligatorios.some(campo => !filtro[campo])
        return camposIncompletos
    }

    useOnInit(() => {
        const cargarDatosIniciales = async () => {
            try{
                const filtroInicial = new FiltroDeBusquedaDeViaje('','','',0)
                const viajesFiltrados = await choferService.getFiltroViajes(filtroInicial)
                setViajesArealizar(viajesFiltrados)
            } catch (error) { console.error("Error al obtener los viajes a realizar. ", error); }
        };
        cargarDatosIniciales();
    });

    const manejoDeCreacionDeUnFiltro = (name: keyof FiltroDeBusquedaDeViaje, value: string | number | undefined): void => {
        (filtro as unknown as Record<keyof FiltroDeBusquedaDeViaje, string | number | undefined>)[name] = value
        generarNuevoFiltro(filtro)
    }

    const generarNuevoFiltro = (filtro: FiltroDeBusquedaDeViaje) => {
        const nuevoFiltro = Object.assign(new FiltroDeBusquedaDeViaje(), filtro)
        setFiltro(nuevoFiltro)
    }

    const buscarFiltroDeViaje = () => {
        setFromTouched(true);
        try {
            if (!camposIncompletos()) { traerViajesArealizar() }
        } catch(error) { 
            console.error("Los campos cargados estan incompletos ", error);
        }
    }

    const traerViajesArealizar = async () => {
        try{
            const viajesFiltrados = await choferService.getFiltroViajes(filtro)
            setViajesArealizar(viajesFiltrados)
        } catch (error) { 
            console.error("Error al obtener los viajes a realizar. ", error); 
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', width: '100%', padding:'4rem 1rem' }}>
                <Typography
                    sx={{ display: 'flex', justifyItems: 'start', width: '100%' }}
                    variant="h5"
                    component="div"
                    color="primary"
                    fontWeight="bold"
                    textAlign="left"
                >
                    Viajes a realizar
                </Typography>
                <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column', width:'100%'}}>
                    <TextField 
                        label="Usuario" 
                        fullWidth  
                        margin="normal" 
                        color="primary" 
                        name="titulo" 
                        required
                        value={filtro.usuario}
                        onChange={(event) => manejoDeCreacionDeUnFiltro('usuario', event.target.value)}
                        error={fromTouched && !filtro.usuario}
                        helperText={
                            fromTouched && !filtro.usuario ? (
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography color="red">El usuario es obligatorio</Typography>
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
                        label="Origen" 
                        fullWidth  
                        margin="normal" 
                        color="primary" 
                        name="titulo" 
                        required
                        value={filtro.origen}
                        onChange={(event) => manejoDeCreacionDeUnFiltro('origen', event.target.value)}
                        error={fromTouched && !filtro.origen}
                        helperText={
                            fromTouched && !filtro.origen ? (
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
                        name="titulo" 
                        required
                        value={filtro.destino}
                        onChange={(event) => manejoDeCreacionDeUnFiltro('destino', event.target.value)}
                        error={fromTouched && !filtro.destino}
                        helperText={
                            fromTouched && !filtro.destino ? (
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
                    <TextField
                        label="Cantidad de Pasajeros"
                        required
                        fullWidth
                        margin="normal"
                        value={filtro.cantidadDePasajeros === 0 ? "" : filtro.cantidadDePasajeros}
                        color="primary"
                        name="cantidadDePasajeros"
                        type="number"
                        onChange={(event) => {
                            const valor = event.target.value;
                            manejoDeCreacionDeUnFiltro('cantidadDePasajeros', valor === "" ? "" : Number(valor));
                        }}
                        error={fromTouched && !filtro.cantidadDePasajeros}
                        helperText={
                            fromTouched && !filtro.cantidadDePasajeros ? (
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
                                        disabled={filtro.cantidadDePasajeros <= 1}   
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
                        onClick={buscarFiltroDeViaje}
                        variant="contained"
                        size="large"
                    >
                        Filtrar
                    </Button>
                </Box> 
                <Divider orientation="horizontal" flexItem sx={{ opacity: 1, bgColor: 'black', width:'100%', my:2 }}></Divider>
                <Typography
                    sx={{ display: 'flex', justifyItems: 'start', width: '100%' }}
                    variant="h5"
                    component="div"
                    color="primary"
                    fontWeight="bold"
                    textAlign="left"
                >
                    Resultados
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", width: "100%" }}>
                    { viajesArealizar.map((tarjetaViaje, indice) => (
                        <CardViaje key={tarjetaViaje.id || indice} tarjeta={tarjetaViaje} esRealizado={false} manejarCalificacion={()=>{}} /> ) )
                    }
                </Box>
            </Container>
        </ThemeProvider>
    );
}