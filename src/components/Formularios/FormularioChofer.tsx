import { useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, TextField, IconButton, Button } from "@mui/material";
import FiltroDeBusquedaDeViaje from "../../domain/filtroDeBusquedaDeViaje";

export interface FormularioChoferProps{ onSubmit: (filtroViaje:FiltroDeBusquedaDeViaje) => void }

export function FormularioChofer({onSubmit}:FormularioChoferProps){

    const decrementarPasajeros = () => { if (filtro.cantidadDePasajeros === null || filtro.cantidadDePasajeros <= 1) return; manejoDeCreacionDeUnFiltro( 'cantidadDePasajeros', filtro.cantidadDePasajeros - 1 ); };    
    const incrementarPasajeros = () => { manejoDeCreacionDeUnFiltro( 'cantidadDePasajeros', filtro.cantidadDePasajeros === null ? 1 : filtro.cantidadDePasajeros + 1 ); };    
    const [filtro,setFiltro] = useState<FiltroDeBusquedaDeViaje>(new FiltroDeBusquedaDeViaje())

    const generarNuevoFiltro = (filtro: FiltroDeBusquedaDeViaje) => {
        const nuevoFiltro = Object.assign(new FiltroDeBusquedaDeViaje(), filtro)
        setFiltro(nuevoFiltro)
    }

    const manejoDeCreacionDeUnFiltro = (name: keyof FiltroDeBusquedaDeViaje, value: string | number |  undefined |  null): void => {
        (filtro as unknown as Record<keyof FiltroDeBusquedaDeViaje, string | number | undefined |  null>)[name] = value
        generarNuevoFiltro(filtro)
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        onSubmit(filtro)
    }

    return(
        <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column', width:'100%'}}>
            <TextField 
                label="Usuario" 
                fullWidth  
                margin="normal" 
                color="primary" 
                name="usuario" 
                value={filtro.usuario}
                onChange={(event) => manejoDeCreacionDeUnFiltro('usuario', event.target.value)}
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
                name="origen" 
                value={filtro.origen}
                onChange={(event) => manejoDeCreacionDeUnFiltro('origen', event.target.value)}
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
                value={filtro.destino}
                onChange={(event) => manejoDeCreacionDeUnFiltro('destino', event.target.value)}
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
                fullWidth margin="normal" 
                value={filtro.cantidadDePasajeros === null ? "" : filtro.cantidadDePasajeros} 
                color="primary" name="cantidadDePasajeros" type="number" 
                onChange={(event) => { const valor = event.target.value; const valorNumerico = valor === "" ? null : Number(valor); manejoDeCreacionDeUnFiltro( "cantidadDePasajeros", valorNumerico === 0 ? null : valorNumerico ); }}
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
                                disabled={filtro.cantidadDePasajeros === null || filtro.cantidadDePasajeros <= 1}                                >
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
                Filtrar
            </Button>
        </Box> 
    )
}