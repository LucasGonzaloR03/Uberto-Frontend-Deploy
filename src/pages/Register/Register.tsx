import { Box, Button, Container, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { ErrorResponse, mostrarMensajeError } from "../../utils/errorHandling";
import UbertoLogo from "../../components/Pestanias/UbertoLogo";
import { Notificacion } from "../../components/Modales/Notificacion";
import { Spinner } from "../../components/Spinner";
import { registerService } from "../../services/RegisterService";

// Definimos el tipo para TypeScript
export interface RegisterData {
    nombre: string;
    apellido: string;
    username: string;
    password: string;
    confirmPassword: string;
    role: 'CHOFER' | 'PASAJERO' | '';
    tipoChofer?: 'CSIMPLE' | 'CPREMIUM' | 'CMOTO';
    precioBase?: number;
    patenteVehiculo: string;
    marcaVehiculo: string;
    modeloVehiculo: string;
    edad: number;
    telefono: string;
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
        modeloVehiculo: '',
        telefono: '',
        edad: 0,
        marcaVehiculo: '',
        precioBase: undefined
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [fromTouched, setFromTouched] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // Estilo Uberto reutilizado
    const styleUberto = {
        '& label.Mui-focused': { color: '#4e199e' },
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#4e199e' },
            '&:hover fieldset': { borderColor: '#7a3eb1' },
            '&.Mui-focused fieldset': { borderColor: '#4e199e' }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name as string]: value });
    };

    const registrarse = async (e: React.FormEvent) => {
        e.preventDefault();
        setFromTouched(true);

        // Validación siguiendo tu lógica de Login
        const camposComunesVacios = !formData.nombre || !formData.apellido || !formData.username || !formData.password || !formData.role;
        const passwordDiferente = formData.password !== formData.confirmPassword;
        const errorChofer = formData.role === 'CHOFER' && (!formData.patenteVehiculo || !formData.modeloVehiculo || !formData.marcaVehiculo || formData.tipoChofer === undefined || formData.precioBase === undefined);
        const errorPasajero = formData.role === 'PASAJERO' && (!formData.telefono || !formData.edad);

        if (camposComunesVacios || passwordDiferente || formData.role === 'CHOFER'? errorChofer : errorPasajero) {
            setErrorMessage(passwordDiferente ? 'Las contraseñas no coinciden' : 'Faltan completar campos obligatorios');
            return;
        }

        setIsLoading(true);
        try {
            // Simulación: await registerService.register(formData);
            console.log("Datos de registro:", formData);
            await registerService.register(formData);
            navigate('/login');
        } catch (error: unknown) {
            mostrarMensajeError(error as ErrorResponse, setErrorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Componente auxiliar para mensajes de error (como tu Login)
    const errorHelper = (msg: string) => (
        <Box display="flex" alignItems="center">
            <Typography color="red" fontSize={12}>{msg}</Typography>
        </Box>
    );

    return (
        <Container className="body">
            <Box className="login-container" sx={{ py: 3 }}>
                <div className="login-logo-container">
                    <UbertoLogo tamaño="3em" colorLogo="#4e199e" />
                </div>

                <form onSubmit={registrarse}>
                    <FormControl className="login-form" sx={{ m: 1, width: '30ch', gap: 1.2 }} variant="outlined">
                        
                        {/* NOMBRE */}
                        <TextField
                            label="Nombre"
                            name="nombre"
                            fullWidth
                            onChange={handleChange}
                            error={fromTouched && !formData.nombre}
                            helperText={fromTouched && !formData.nombre ? errorHelper("El nombre es obligatorio") : ""}
                            sx={styleUberto}
                        />

                        {/* APELLIDO */}
                        <TextField
                            label="Apellido"
                            name="apellido"
                            fullWidth
                            onChange={handleChange}
                            error={fromTouched && !formData.apellido}
                            helperText={fromTouched && !formData.apellido ? errorHelper("El apellido es obligatorio") : ""}
                            sx={styleUberto}
                        />

                        {/* EMAIL */}
                        <TextField
                            label="Nombre de Usuario"
                            name="username"
                            fullWidth
                            onChange={handleChange}
                            error={fromTouched && !formData.username}
                            helperText={fromTouched && !formData.username ? errorHelper("El nombre de usuario es obligatorio") : ""}
                            sx={styleUberto}
                        />

                        {/* PASSWORD */}
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

                        {/* CONFIRMAR PASSWORD */}
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

                        {/* ROL SELECT */}
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

                        {/* CAMPOS CONDICIONALES CHOFER */}

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
                                    label="Edad"
                                    name="edad"
                                    type="number"
                                    size="small"
                                    onChange={handleChange}
                                    error={fromTouched && !formData.edad}
                                    helperText={fromTouched && !formData.edad ? errorHelper("Requerido") : ""}
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
                                    helperText={fromTouched && !formData.patenteVehiculo ? errorHelper("Requerido") : ""}
                                    sx={styleUberto}
                                />
                                <TextField
                                    label="Modelo del Auto"
                                    name="modeloVehiculo"
                                    size="small"
                                    onChange={handleChange}
                                    error={fromTouched && !formData.modeloVehiculo}
                                    helperText={fromTouched && !formData.modeloVehiculo? errorHelper("Requerido") : ""}
                                    sx={styleUberto}
                                />
                                <TextField
                                    label="Marca del Auto"
                                    name="marcaVehiculo"
                                    size="small"
                                    onChange={handleChange}
                                    error={fromTouched && !formData.marcaVehiculo}
                                    helperText={fromTouched && !formData.marcaVehiculo? errorHelper("Requerido") : ""}
                                    sx={styleUberto}
                                />
                                <TextField
                                    label="Precio base del Viaje"
                                    name="precioBase"
                                    type="number"
                                    size="small"
                                    onChange={handleChange}
                                    error={fromTouched && !formData.precioBase}
                                    helperText={fromTouched && !formData.precioBase? errorHelper("Requerido") : ""}
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
                open={!!errorMessage}
                mensaje={errorMessage}
                severidad="error"
                onClose={() => setErrorMessage('')}
            />
            <Spinner color="#4e199e" size="50px" isLoading={isLoading} />
        </Container>
    );
};

export default Register;