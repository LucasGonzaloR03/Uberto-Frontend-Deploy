import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { DetalleChofer, tipoChoferAStrDetalle } from "../../domain/chofer";
import { useState } from "react";
import { ErrorResponse, mostrarMensajeError } from "../../utils/errorHandling";
import { useOnInit } from "../../utils/hooks";
import TarjetaComentario from "../../components/Tarjetas/TarjetaComentario";
import { Notificacion } from "../../components/Modales/Notificacion";
import { pasajeroService } from "../../services/PasajeroService";
import { DetalleViajeDTO } from "../../domain/viaje";
import { obtenerUserID } from "../../services/UsuarioService";
import dayjs from "dayjs";
import { Spinner } from "../../components/Spinner";

export function DetalleViaje() {
    const [chofer, setChofer] = useState<DetalleChofer>(new DetalleChofer())
    const [mensajeNotificacion, setMensajeNotificacion] = useState('')
    const [mostrarNotificacion, setMostrarNotificacion] = useState(false)
    const [severidad, setSeveridad] = useState<'info' | 'success' | 'error' | 'warning'>('info')
    const { idChofer, viajeSerializado } = useParams()
    const viaje = JSON.parse(decodeURIComponent(viajeSerializado || '{}'))
    const [isLoading, setIsLoading] = useState(false)

    const navegar = useNavigate()

    useOnInit(()=>{
        const traerChofer = async () => {
            setIsLoading(true)
            try {
                const choferSeleccionado = await pasajeroService.getChoferDetalle(idChofer!)
                setChofer(choferSeleccionado)
            } catch (error: unknown) {
                mostrarMensajeError(error as ErrorResponse, setMensajeNotificacion)
                manejarErrorServidor()
            }finally{
                setIsLoading(false)
            }
        }

        traerChofer()
    })

    const manejarConfirmacion = async () => {
        const detalleViaje = new DetalleViajeDTO(viaje.origen, viaje.destino, viaje.fechaInicio, viaje.duracion, viaje.cantidadDePasajeros)
        setIsLoading(true)
        try {
            await pasajeroService.postConfirmarViaje(detalleViaje, idChofer!, obtenerUserID())
            setMensajeNotificacion('Se confirmo el viaje con exito')
            setSeveridad('success')
            abrirNotificacion()
            setTimeout(() => { manejarNavegacion('/homepasajero') }, 2000)
        } catch (error: unknown) {
            mostrarMensajeError(error as ErrorResponse, setMensajeNotificacion)
            manejarErrorServidor()
        }finally{
            setIsLoading(false)
        }
    }

    const manejarNavegacion = (direccion: string) => {
        navegar(direccion)
    }

    const abrirNotificacion = () => {
        cerrarNotificacion()
        setTimeout(() => setMostrarNotificacion(true), 0)
    }

    const cerrarNotificacion = () => {
        setMostrarNotificacion(false)
    }

    const manejarErrorServidor = () => {
        setSeveridad('error')
        abrirNotificacion()
    }

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', width: '100%', padding: '4rem 1rem' }} >
            <Typography
                sx={{ display: 'flex', alignItems: 'start', width: '100%' }}
                variant="h5"
                component="div"
                color="var(--primary-color)"
                fontWeight="bold"
                textAlign="left"
            >
                Confirmar viaje
            </Typography>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                    <Typography color="black" fontWeight="bold">Origen</Typography>
                    <Typography color="black">{viaje.origen}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                    <Typography color="black" fontWeight="bold">Destino</Typography>
                    <Typography color="black">{viaje.destino}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                    <Typography color="black" fontWeight="bold">Fecha</Typography>
                    <Typography color="black">{dayjs(viaje.fechaInicio).format("DD/MM/YYYY")}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                    <Typography color="black" fontWeight="bold">Duración</Typography>
                    <Typography color="black">{viaje.duracion} minutos</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                    <Typography color="black" fontWeight="bold">Cantidad de Pasajeros</Typography>
                    <Typography color="black">{viaje.cantidadDePasajeros}</Typography>
                </Box>
            </Box>
            <Divider orientation="horizontal" flexItem sx={{ opacity: 1, bgColor: 'black', width: '100%', my: 2 }}></Divider>
            <Typography
                sx={{ display: 'flex', alignItems: 'start', width: '100%' }}
                variant="h6"
                component="div"
                color="var(--primary-color)"
                fontWeight="bold"
                textAlign="left"
            >
                {tipoChoferAStrDetalle(chofer.tipoChofer)}
            </Typography>
            <Box sx={{ width: '100%', paddingBottom: '4rem' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                    <Typography color="black" fontWeight="bold">Nombre</Typography>
                    <Typography color="black">{chofer.nombreCompleto}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                    <Typography color="black" fontWeight="bold">Movil</Typography>
                    <Typography color="black">{chofer.marcaVehiculo} | {chofer.modeloVehiculo}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                    <Typography color="black" fontWeight="bold">Dominio</Typography>
                    <Typography color="black">{chofer.patenteVehiculo}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                    <Typography color="black" fontWeight="bold">Calificación</Typography>
                    <Typography color="black">{chofer.puntaje}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', allignItems: 'center' }}>
                    {chofer.listaCalificacion.map((calificacion, indice) => (
                        <TarjetaComentario
                            key={indice}
                            calificacion={calificacion}
                            esPasajeroCalificacion={false}
                            onEliminar={() => { }}
                            esDetalle={true}
                        />
                    ))}
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                position: 'fixed',
                zIndex: 1000,
                bottom: '3.4375rem',
                left: 0,
                backgroundColor: 'white',
                padding: '0.625rem 0',
                gap: '0.9375rem'
            }}>
                <Button
                    sx={{
                        backgroundColor: 'white',
                        textTransform: 'none',
                        flex: 1,
                        maxWidth: '11.25rem',
                        border: '2px solid',
                        borderColor: 'var(--secondary-color)',
                        color: 'var(--secondary-color)',
                        fontSize: '1rem',
                        fontWeight: 'bold'
                    }}
                    variant="contained"
                    size="large"
                    onClick={() => manejarNavegacion('/homepasajero')}
                >
                    Volver
                </Button>
                <Button
                    sx={{
                        backgroundColor: 'var(--secondary-color)',
                        textTransform: 'none',
                        flex: 1,
                        maxWidth: '11.25rem',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 'bold'
                    }}
                    variant="contained"
                    size="large"
                    onClick={manejarConfirmacion}
                >
                    Confirmar
                </Button>
            </Box>
            <Notificacion
                open={mostrarNotificacion}
                mensaje={mensajeNotificacion}
                severidad={severidad}
                onClose={cerrarNotificacion}
            />
            <Spinner isLoading={isLoading} />
        </Container>
    );
}
