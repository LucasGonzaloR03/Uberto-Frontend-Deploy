import { Avatar, Badge, Box, Button, Container, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { VisibilityOff, Visibility } from "@mui/icons-material"
import { ErrorResponse, mostrarMensajeError } from "../../utils/errorHandling"
import UbertoLogo from "../../components/Pestanias/UbertoLogo"
import { Notificacion } from "../../components/Modales/Notificacion"
import { Spinner } from "../../components/Spinner"
import { registerService } from "../../services/RegisterService"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

export interface RegisterData {
    nombre: string
    apellido: string
    username: string
    password: string
    confirmPassword: string
    role: 'CHOFER' | 'PASAJERO' | ''
    tipoChofer?: 'CSIMPLE' | 'CPREMIUM' | 'CMOTO'
    precioBase?: number
    patenteVehiculo: string
    marcaVehiculo: string
    modeloVehiculo: number
    fechaNacimiento: string
    telefono: string
    fotoPerfil?: string
}

const Register = () => {
    const [formData, setFormData] = useState<RegisterData>({
        nombre: '',
        apellido: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: '',
        tipoChofer: 'CSIMPLE',
        patenteVehiculo: '',
        modeloVehiculo: 0,
        telefono: '',
        fechaNacimiento: '',
        marcaVehiculo: '',
        precioBase: undefined,
        fotoPerfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    })

    const [fromTouched, setFromTouched] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [mensajeNotificacion, setMensajeNotificacion] = useState('')
    const [mostrarNotificacion, setMostrarNotificacion] = useState(false)
    const [severidad, setSeveridad] = useState<'info' | 'success' | 'error' | 'warning'>('info')

    const navigate = useNavigate()

    const styleUberto = {
        '& label.Mui-focused': { color: '#4e199e' },
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#4e199e' },
            '&:hover fieldset': { borderColor: '#7a3eb1' },
            '&.Mui-focused fieldset': { borderColor: '#4e199e' }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name as string]: value })
    }

    const registrarse = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFromTouched(true)

        const camposComunesVacios = !formData.nombre || !formData.apellido || !formData.username || !formData.password || !formData.role
        const passwordDiferente = formData.password !== formData.confirmPassword
        const errorChofer = formData.role === 'CHOFER' && (!formData.patenteVehiculo || !formData.modeloVehiculo || !formData.marcaVehiculo || !formData.tipoChofer || !formData.precioBase)
        const errorPasajero = formData.role === 'PASAJERO' && (!formData.telefono || !formData.fechaNacimiento)

        const hayErrores = camposComunesVacios || passwordDiferente || errorChofer || errorPasajero
        if (hayErrores) {
            setMensajeNotificacion(passwordDiferente ? 'Las contraseñas no coinciden' : 'Faltan completar campos obligatorios')
            setSeveridad('error')
            abrirNotificacion()
            return
        }

        setIsLoading(true)
        try {
            await registerService.register(formData)
            setMensajeNotificacion('Se realizó el registro con éxito.')
            setSeveridad('success')
            abrirNotificacion()
            setTimeout(() => { manejarNavegacion('/login') }, 2000)
        } catch (error: unknown) {
            mostrarMensajeError(error as ErrorResponse, setMensajeNotificacion)
            manejarErrorServidor()
        } finally {
            setIsLoading(false)
        }
    }

    const errorHelper = (msg: string) => (
        <Box display="flex" alignItems="center">
            <Typography color="red" fontSize={12}>{msg}</Typography>
        </Box>
    )

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsLoading(true)

        const formDataCloudinary = new FormData()
        formDataCloudinary.append('file', file)
        
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

        formDataCloudinary.append('upload_preset', uploadPreset)

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                { method: 'POST', body: formDataCloudinary }
            )

            if (!response.ok) throw new Error("Error en la subida")

            const data = await response.json()
            setFormData({ ...formData, fotoPerfil: data.secure_url })
        } catch (error) {
            setMensajeNotificacion("No se pudo subir la imagen a la nube.")
            manejarErrorServidor()
            console.error("Cloudinary Error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const manejarNavegacion = (direccion: string) => { navigate(direccion) }

    const abrirNotificacion = () => {
        cerrarNotificacion()
        setTimeout(() => setMostrarNotificacion(true), 0)
    }

    const cerrarNotificacion = () => { setMostrarNotificacion(false) }

    const manejarErrorServidor = () => {
        setSeveridad('error')
        abrirNotificacion()
    }

    return (
        <Container className="body">
            <Box className="login-container" sx={{ py: 3 }}>
                <div className="login-logo-container">
                    <UbertoLogo tamaño="3em" colorLogo="#4e199e" />
                </div>

                <form onSubmit={registrarse}>
                    <FormControl className="login-form" sx={{ m: 1, width: '30ch', gap: 1.2 }} variant="outlined">
                        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <label htmlFor="icon-button-file">
                                        <input
                                            accept="image/*"
                                            id="icon-button-file"
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                        <IconButton 
                                            color="primary" 
                                            aria-label="upload picture" 
                                            component="span"
                                            sx={{ 
                                                backgroundColor: '#4e199e', 
                                                color: 'white',
                                                '&:hover': { backgroundColor: '#7a3eb1' }
                                            }}
                                        >
                                            <PhotoCameraIcon />
                                        </IconButton>
                                    </label>
                                }
                            >
                                <Avatar
                                    src={formData.fotoPerfil}
                                    sx={{ width: 100, height: 100, border: '2px solid #4e199e' }}
                                />
                            </Badge>
                            <Typography variant="caption" sx={{ mt: 1, color: '#4e199e' }}>
                                Foto de Perfil
                            </Typography>
                        </Box>

                        <TextField
                            label="Nombre"
                            name="nombre"
                            fullWidth
                            onChange={handleChange}
                            error={fromTouched && !formData.nombre}
                            helperText={fromTouched && !formData.nombre ? errorHelper("El nombre es obligatorio") : ""}
                            sx={styleUberto}
                        />

                        <TextField
                            label="Apellido"
                            name="apellido"
                            fullWidth
                            onChange={handleChange}
                            error={fromTouched && !formData.apellido}
                            helperText={fromTouched && !formData.apellido ? errorHelper("El apellido es obligatorio") : ""}
                            sx={styleUberto}
                        />

                        <TextField
                            label="Nombre de Usuario"
                            name="username"
                            fullWidth
                            onChange={handleChange}
                            error={fromTouched && !formData.username}
                            helperText={fromTouched && !formData.username ? errorHelper("El nombre de usuario es obligatorio") : ""}
                            sx={styleUberto}
                        />

                        <FormControl variant="outlined" fullWidth error={fromTouched && !formData.password} sx={styleUberto}>
                            <InputLabel>Contraseña</InputLabel>
                            <OutlinedInput
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Contraseña"
                            />
                            {fromTouched && !formData.password && <FormHelperText>{errorHelper("La contraseña es obligatoria")}</FormHelperText>}
                        </FormControl>

                        <FormControl variant="outlined" fullWidth error={fromTouched && formData.password !== formData.confirmPassword} sx={styleUberto}>
                            <InputLabel>Confirmar Contraseña</InputLabel>
                            <OutlinedInput
                                name="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                onChange={handleChange}
                                label="Confirmar Contraseña"
                            />
                            {fromTouched && formData.password !== formData.confirmPassword && (
                                <FormHelperText>{errorHelper("Las contraseñas no coinciden")}</FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={fromTouched && !formData.role} sx={styleUberto}>
                            <InputLabel>¿Qué quieres ser?</InputLabel>
                            <Select
                                name="role"
                                value={formData.role}
                                label="¿Qué quieres ser?"
                                onChange={(e) => handleChange(e as React.ChangeEvent<{ name?: string; value: unknown }>)}
                            >
                                <MenuItem value="PASAJERO">Pasajero</MenuItem>
                                <MenuItem value="CHOFER">Chofer</MenuItem>
                            </Select>
                            {fromTouched && !formData.role && <FormHelperText>Selecciona un rol</FormHelperText>}
                        </FormControl>

                        {formData.role === 'PASAJERO' && (
                            <Box sx={{ p: 2, border: '1px solid #4e199e', borderRadius: 1, display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                                <TextField
                                    label="Telefono"
                                    name="telefono"
                                    size="small"
                                    onChange={handleChange}
                                    error={fromTouched && !formData.telefono}
                                    helperText={fromTouched && !formData.telefono ? errorHelper("Requerido") : ""}
                                    sx={styleUberto}
                                />
                                <TextField
                                    label="Fecha de Nacimiento"
                                    name="fechaNacimiento"
                                    type="date"
                                    size="small"
                                    fullWidth
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                    error={fromTouched && !formData.fechaNacimiento}
                                    helperText={fromTouched && !formData.fechaNacimiento ? errorHelper("Requerido") : ""}
                                    sx={styleUberto}
                                />
                            </Box>
                        )}

                        {formData.role === 'CHOFER' && (
                            <Box sx={{ p: 2, border: '1px solid #4e199e', borderRadius: 1, display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                                <FormControl fullWidth size="small" error={fromTouched && !formData.tipoChofer} sx={styleUberto}>
                                    <InputLabel>Categoría de Servicio</InputLabel>
                                    <Select
                                        name="tipoChofer"
                                        value={formData.tipoChofer}
                                        label="Categoría de Servicio"
                                        onChange={(e) => handleChange(e as React.ChangeEvent<{ name?: string; value: unknown }>)}
                                    >
                                        <MenuItem value="CSIMPLE">Estándar (Simple)</MenuItem>
                                        <MenuItem value="CPREMIUM">Premium</MenuItem>
                                        <MenuItem value="CMOTO">Moto</MenuItem>
                                    </Select>
                                    {fromTouched && !formData.tipoChofer && <FormHelperText>Selecciona una categoría</FormHelperText>}
                                </FormControl>

                                <TextField
                                    label="Patente del Auto"
                                    name="patenteVehiculo"
                                    size="small"
                                    onChange={handleChange}
                                    error={fromTouched && !formData.patenteVehiculo}
                                    helperText={fromTouched && !formData.patenteVehiculo ? errorHelper("Requerido") : "Formato: AAA000 o AA000AA"}
                                    placeholder="AAA000 o AA000AA"
                                    sx={styleUberto}
                                />

                                <TextField
                                    label="Marca del Auto"
                                    name="marcaVehiculo"
                                    size="small"
                                    onChange={handleChange}
                                    error={fromTouched && !formData.marcaVehiculo}
                                    helperText={fromTouched && !formData.marcaVehiculo ? errorHelper("Requerido") : ""}
                                    sx={styleUberto}
                                />

                                <TextField
                                    label="Modelo del Auto"
                                    name="modeloVehiculo"
                                    type="number"
                                    size="small"
                                    onChange={handleChange}
                                    error={fromTouched && !formData.modeloVehiculo}
                                    helperText={fromTouched && !formData.modeloVehiculo ? errorHelper("Requerido") : ""}
                                    sx={styleUberto}
                                />

                                <TextField
                                    label="Precio base del Viaje"
                                    name="precioBase"
                                    type="number"
                                    size="small"
                                    onChange={handleChange}
                                    // FIX: precioBase=0 también es inválido como precio
                                    error={fromTouched && (!formData.precioBase || Number(formData.precioBase) <= 0)}
                                    helperText={fromTouched && (!formData.precioBase || Number(formData.precioBase) <= 0) ? errorHelper("Requerido, debe ser mayor a 0") : ""}
                                    sx={styleUberto}
                                />
                            </Box>
                        )}

                        <Button 
                            type="submit" 
                            variant="contained" 
                            size="large" 
                            sx={{ backgroundColor: "#4e199e", mt: 1, textTransform: 'none' }}
                        >
                            Registrarse
                        </Button>

                        <Button 
                            onClick={() => navigate('/login')} 
                            sx={{ color: "#4e199e", textTransform: 'none', fontSize: '0.8rem' }}
                        >
                            ¿Ya tienes cuenta? Ingresa aquí
                        </Button>
                    </FormControl>
                </form>
            </Box>

            <Notificacion
                open={mostrarNotificacion}
                mensaje={mensajeNotificacion}
                severidad={severidad}
                onClose={cerrarNotificacion}
            />
            <Spinner color="#4e199e" size={50} isLoading={isLoading} />
        </Container>
    )
}

export default Register
