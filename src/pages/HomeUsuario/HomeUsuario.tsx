import { useNavigate } from "react-router-dom"
import { CardChoferProps } from "../../components/Tarjetas/TarjetaChofer"
import { TarjetaChofer } from "../../domain/tarjetaChofer"
import { DetalleViajeDTO, TarjetaViaje, Viaje } from "../../domain/viaje"
import { Box, Container, createTheme, Divider, ThemeProvider, Typography } from "@mui/material"
import { Notificacion } from "../../components/Modales/Notificacion"
import React, { useState } from "react"
import { ErrorResponse, mostrarMensajeError } from "../../utils/errorHandling"
import { CardViajeProps } from "../../components/Tarjetas/TarjetaViaje"
import FiltroDeBusquedaDeViaje from "../../domain/filtroDeBusquedaDeViaje"
import { obtenerUserTipo } from "../../services/UsuarioService"
import { useOnInit } from "../../utils/hooks"

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

type CardComponentProps<T> = T extends Viaje ? CardChoferProps : CardViajeProps;

export interface HomeUsuarioProps<T extends Viaje | FiltroDeBusquedaDeViaje, U extends TarjetaChofer | TarjetaViaje>{
    Formulario:React.ComponentType<
        {onSubmit:(data:T) => void}
    >
    AccionDeServicio:(filtros:T) => Promise<U[]>
    CardComponente:React.ComponentType<CardComponentProps<T>>
}

export function HomeUsuario<T extends Viaje | FiltroDeBusquedaDeViaje, U extends TarjetaChofer | TarjetaViaje>({Formulario,AccionDeServicio,CardComponente}:HomeUsuarioProps<T,U>){
    const [resultados,setResultados]= useState<U[]>([])
    const [mensajeNotificacion, setMensajeNotificacion] = useState('')
    const [mostrarNotificacion,setMostrarNotificacion] = useState(false)
    const [severidad,setSeveridad] = useState<'info'|'success'|'error'|'warning'>('info')
    const [viajeActual,setViajeActual] = useState<Viaje>(new Viaje())
    const navigate = useNavigate()

    useOnInit(() => {
        const cargarViajesPendientesDelChofer = async () => {
            try {
                const filtroDeViajeInicial = {
                    usuario: '', 
                    origen: '',
                    destino: '',
                    cantidadDePasajeros: null
                };
                const respuesta = await AccionDeServicio(filtroDeViajeInicial as T);
                setResultados(respuesta)
            } catch (error:unknown) {
                mostrarMensajeError(error as ErrorResponse,setMensajeNotificacion)
                manejarErrorServidor()
            }
        };
        if(obtenerUserTipo()){
            cargarViajesPendientesDelChofer();
        }
    });

    //Item puede ser tanto un Viaje como un Filtro de viaje, esto va a depender de que formulario estes rederizando
    //Si se esta rederizando el FormularioPasajero item va a ser un Viaje, y si se esta rederizando el FormularioConductor item va a ser un FiltroDeBusquedaViaje
    const handleSubmit = async(item:T):Promise<void> => {
        if(!obtenerUserTipo()){
            setViajeActual(item as Viaje)
        }
        try{
            const data = await AccionDeServicio(item)
            setResultados(data)
            await new Promise((res) => setTimeout(res, 500))
            if(data.length === 0){
                setMensajeNotificacion(!obtenerUserTipo()?"No se encontraron choferes disponibles en este momento":"No se encontro ningun viaje que coincida con el filtro proporcionado")
                setSeveridad('info')
                abrirNotificacion()
            }
        }catch(error:unknown){
            mostrarMensajeError(error as ErrorResponse,setMensajeNotificacion)
            manejarErrorServidor()
        }
    }

    const irAlDetalleViaje = (idChofer:string) => {
        const viajeDTO = new DetalleViajeDTO(viajeActual.origen,viajeActual.destino,viajeActual.fechaInicio,viajeActual.duracion,viajeActual.cantidadPasajeros)
        const viajeSerializado = encodeURIComponent(JSON.stringify(viajeDTO))
        navigate(`/detalleviaje/${idChofer}/${viajeSerializado}`)
    }

    const getCardProps = (item: U) => {
        if (!obtenerUserTipo()) {
            return {
                tarjeta: item as TarjetaChofer,
                alSeleccionarChofer: irAlDetalleViaje
            }  as CardComponentProps<T>;
        }
        return {
            tarjeta: item as TarjetaViaje,
            esRealizado:false,
        } as CardComponentProps<T>;
    };

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

    return(
        <>
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
                        {obtenerUserTipo()?'Viajes a realizar':'Realizar un viaje'}
                    </Typography>
                    
                    <Formulario onSubmit={handleSubmit}/>

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

                    <Box sx={{display:'flex',justifyContent:'center',flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', width:'100%'}}>
                    {resultados.map((item, index) => (
                        <CardComponente
                            {...getCardProps(item)}
                            key={index}
                            />
                        ))}
                    </Box>

                    <Notificacion
                        open={mostrarNotificacion}
                        mensaje={mensajeNotificacion}
                        severidad={severidad}
                        onClose={cerrarNotificacion}
                    />
                </Container>     
            </ThemeProvider>
        </>
    )
}



