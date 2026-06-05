import { useState } from "react";
import { useOnInit } from "../../utils/hooks";
import { PlusCircle } from "@phosphor-icons/react";
import CardAmigo from "../Tarjetas/TarjetaAmigo";
import { Notificacion } from "../Modales/Notificacion";
import { CardAgregarAmigo } from "../Modales/ModalAgregarAmigo";
import { AmigoDelAmigoDTO, Pasajero, TarjetaAmigo } from "../../types/pasajero";
import { pasajeroService } from "../../services/PasajeroService";
import { ErrorResponse, mostrarMensajeError } from "../../utils/errorHandling";
import { TextField, Button, Typography, Box, Divider, IconButton, InputAdornment } from "@mui/material";
import { Spinner } from "../Spinner";


export const DatosPasajero = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [fromTouched, setFromTouched] = useState(false)
    const [saldoFormulario, setsaldoFormulario] = useState(0)
    const [infoPasajero, setInfoPasajero] = useState<Pasajero>(new Pasajero());
    const [posiblesAmigos, setPosiblesAmigos] = useState<AmigoDelAmigoDTO[]>([])
    const [notificacion, setNotificacion] = useState({ open: false, mensaje: "", severidad: "success" as "success" | "error" });
    const [isLoading, setIsLoading] = useState(false);

    useOnInit(() => {
        traerDatosPasajero()
        traerPosiblesAmigos()
    })

    const traerDatosPasajero = async () => {
        setIsLoading(true)
        try {
            const infoPasajero = await pasajeroService.getDatosPasajero()
            setInfoPasajero(infoPasajero)
        } catch (error) {
            const mensaje = mostrarMensajeError(error as ErrorResponse, () => {})
            setNotificacion({ open: true, mensaje: mensaje ?? 'Error al cargar los datos.', severidad: "error" })
        } finally {
            setIsLoading(false)
        }
    }

    const traerPosiblesAmigos = async () => {
        setIsLoading(true)
        try {
            const amigosPosiblesPasajeros = await pasajeroService.getAmigos()
            setPosiblesAmigos(amigosPosiblesPasajeros)
        } catch (error) {
            const mensaje = mostrarMensajeError(error as ErrorResponse, () => {})
            setNotificacion({ open: true, mensaje: mensaje ?? 'Error al cargar amigos.', severidad: "error" })
        } finally {
            setIsLoading(false)
        }
    }

    const comprobacionDeCamposIncompletos = () => {
        const camposObligatorios: (keyof Pasajero)[] = ['nombre', 'apellido', 'telefono']
        return camposObligatorios.some(campo => !infoPasajero[campo])
    }

    const manejoCreacionPasajero = (name: keyof Pasajero, value: string | number | undefined): void => {
        (infoPasajero as unknown as Record<keyof Pasajero, string | number | undefined>)[name] = value
        generarNuevaInfoPasajero(infoPasajero)
    }
    
    const generarNuevaInfoPasajero = (infoPasajero: Pasajero) => {
        const NuevaInfoPasajero = Object.assign(new Pasajero(), infoPasajero)
        setInfoPasajero(NuevaInfoPasajero)
    }

    const handleGuardarCambios = async () => {
        setFromTouched(true)
        if (comprobacionDeCamposIncompletos()) {
            setNotificacion({ open: true, mensaje: "Por favor completa los campos obligatorios.", severidad: "error" });
            return
        }
        setIsLoading(true)
        try {
            await pasajeroService.putActualizarPasajero(infoPasajero)
            setNotificacion({ open: true, mensaje: "Se actualizaron datos correctamente", severidad: "success" })
        } catch (error) {
            const mensaje = mostrarMensajeError(error as ErrorResponse, () => {})
            setNotificacion({ open: true, mensaje: mensaje ?? 'Error al guardar los cambios.', severidad: "error" })
        } finally {
            setIsLoading(false)
        }
    }

    const handleAgregarSaldo = async () => {
        // FIX: validación de saldo — no permitir agregar 0 o negativo
        if (saldoFormulario <= 0) {
            setNotificacion({ open: true, mensaje: "El monto a agregar debe ser mayor a 0.", severidad: "error" })
            return
        }
        setIsLoading(true)
        try {
            await pasajeroService.putAgregarSaldo(saldoFormulario)
            setsaldoFormulario(0)
            setNotificacion({ open: true, mensaje: "Se actualizó saldo correctamente", severidad: "success" })
            traerDatosPasajero()
        } catch (error) {
            const mensaje = mostrarMensajeError(error as ErrorResponse, () => {})
            setNotificacion({ open: true, mensaje: mensaje ?? 'Error al agregar saldo.', severidad: "error" })
        } finally {
            setIsLoading(false)
        }
    }

    const agregarAmigo = async (idAmigo: number) => {
        setIsLoading(true)
        try {
            await pasajeroService.postAgregarAmigo(idAmigo)
            traerDatosPasajero()
            setNotificacion({ open: true, mensaje: 'Se agregó amigo con éxito', severidad: 'success' })
            const posiblesAmigos = await pasajeroService.getAmigos()
            setPosiblesAmigos(posiblesAmigos)
        } catch (error: unknown) {
            const mensaje = mostrarMensajeError(error as ErrorResponse, () => {})
            setNotificacion({ open: true, mensaje: mensaje ?? 'Error al agregar un amigo.', severidad: 'error' })
        } finally { 
            setIsLoading(false)
        }
    }

    const eliminarAmigo = async (amigoAEliminar: TarjetaAmigo) => {
        setIsLoading(true)
        try {
            await pasajeroService.deleteAmigo(amigoAEliminar.id)
            traerDatosPasajero()
            setNotificacion({ open: true, mensaje: `"${amigoAEliminar.nombreCompleto}" fue eliminado correctamente`, severidad: 'success' })
            const posiblesAmigos = await pasajeroService.getAmigos()
            setPosiblesAmigos(posiblesAmigos)
        } catch (error: unknown) {
            const mensaje = mostrarMensajeError(error as ErrorResponse, () => {})
            setNotificacion({ open: true, mensaje: mensaje ?? 'Error al eliminar amigo.', severidad: 'error' })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box sx={{ paddingBottom: "4rem" }}>
            <Typography variant="h6" color="var(--primary-color)" textAlign={"left"}>Datos del pasajero</Typography>

            <TextField
                label="Nombre"
                fullWidth
                margin="normal"
                color="primary"
                name="nombre"
                required
                value={infoPasajero.nombre}
                onChange={(event) => manejoCreacionPasajero('nombre', event.target.value)}
                error={fromTouched && !infoPasajero.nombre}
                helperText={
                    fromTouched && !infoPasajero.nombre ? (
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography color="red">El nombre es obligatorio</Typography>
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
                label="Apellido" 
                fullWidth  
                margin="normal" 
                color="primary" 
                name="apellido"
                required
                value={infoPasajero.apellido} 
                onChange={(event) => manejoCreacionPasajero('apellido', event.target.value)} 
                error={fromTouched && !infoPasajero.apellido}
                helperText={
                    fromTouched && !infoPasajero.apellido ? (
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography color="red">El apellido es obligatorio</Typography>
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
                label="Telefono" 
                fullWidth  
                margin="normal" 
                color="primary" 
                name="telefono"
                required
                value={infoPasajero.telefono}
                onChange={(event) => manejoCreacionPasajero('telefono', event.target.value)}
                error={fromTouched && !infoPasajero.telefono}
                helperText={
                    fromTouched && !infoPasajero.telefono ? (
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography color="red">El teléfono es obligatorio</Typography>
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
      
            <Button variant="contained" fullWidth onClick={handleGuardarCambios} sx={{ backgroundColor: 'var(--secondary-color)' }}>
                Guardar Cambios
            </Button>
      
            <Divider variant="middle" component="li" sx={{ borderColor: "black" }}/>
      
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                <Typography sx={{ color: "var(--primary-color)", fontWeight: "bold" }}>Saldo Disponible:</Typography>
                <Typography sx={{ color: "var(--secondary-color)", fontWeight: "bold" }}>${infoPasajero.saldo}</Typography>
            </Box>

            <TextField
                label="Saldo a agregar"
                fullWidth
                margin="normal"
                color="primary"
                name="saldo"
                type="number"
                value={saldoFormulario === 0 ? "" : saldoFormulario}
                onChange={(event) => {
                    const valor = parseFloat(event.target.value) || 0;
                    setsaldoFormulario(valor);
                }}
                // FIX: validación correcta — el campo de saldo a agregar no depende de infoPasajero.saldo
                error={saldoFormulario < 0}
                helperText={saldoFormulario < 0 ? (
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography color="red">El monto no puede ser negativo</Typography>
                    </Box>
                ) : ""}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
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
          
            <Button variant="contained" onClick={handleAgregarSaldo} fullWidth sx={{ backgroundColor: 'var(--secondary-color)' }}>
                Agregar Saldo
            </Button>

            <Divider variant="middle" component="li" sx={{ borderColor: "black" }}/>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                <Typography sx={{ color: "var(--primary-color)", fontWeight: "bold" }}>Amigos</Typography>
                <IconButton onClick={() => setModalOpen(true)} sx={{ color: "var(--primary-color)" }}>
                    <PlusCircle size={32} />        
                </IconButton>
            </Box>

            {infoPasajero.listaAmigos.map((amigo, index) => (
                <CardAmigo
                    key={index}
                    id={amigo.id}
                    nombre={amigo.nombreCompleto}
                    otroDato="Amigo cercano"
                    imagenUsuario={amigo.fotoPerfil}
                    eliminar={() => eliminarAmigo(amigo)}
                />
            ))}

            <CardAgregarAmigo
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                posiblesAmigos={posiblesAmigos}
                onConfirm={agregarAmigo}
            />

            <Notificacion
                open={notificacion.open}
                mensaje={notificacion.mensaje}
                severidad={notificacion.severidad}
                onClose={() => setNotificacion({ ...notificacion, open: false })}
            />

            <Spinner isLoading={isLoading} />
        </Box>
    );
};

export default DatosPasajero
