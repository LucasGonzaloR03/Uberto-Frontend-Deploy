import { Box, Button, Container, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { ErrorResponse, mostrarMensajeError } from "../../utils/errorHandling";
import UbertoLogo from "../../components/Pestanias/UbertoLogo";
import { Notificacion } from "../../components/Modales/Notificacion";
import { UserLoginData } from "../../types/usuario";
import { loginService } from "../../services/LoginService";
import { useOnInit } from "../../utils/hooks";
import { Spinner } from "../../components/Spinner";
import {
  USER_KEY_ID_STORAGE,
  USER_KEY_TIPO_STORAGE,
  USER_KEY_FOTO_STORAGE,
  USER_KEY_TOKEN_ACCESS,
  USER_KEY_TOKEN_REFRESH,
} from "../../services/UsuarioService";

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [fromTouched, setFromTouched] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const snackbarOpen = !!errorMessage
  const navigate = useNavigate()
  const handleNavigation = (path: string) => { navigate(path); }

  const ingresar = async () => {
    setFromTouched(true);
    if (!userName || !password) {
      setErrorMessage(
        !userName && !password ? 'El nombre de usuario y la contraseña están vacíos' :
        !userName ? 'El nombre de usuario está vacío' : 'La contraseña está vacía'
      );
      return;
    }
    setIsLoading(true);
    try {
      const userData = new UserLoginData(userName, password)
      const usuarioLogueado = await loginService.login(userData.toJSON())
      sessionStorage.setItem(USER_KEY_ID_STORAGE, usuarioLogueado.userLogedID.toString())
      sessionStorage.setItem(USER_KEY_TIPO_STORAGE, usuarioLogueado.tipoUsuario.toString())
      sessionStorage.setItem(USER_KEY_FOTO_STORAGE, usuarioLogueado.fotoPerfil.toString())
      sessionStorage.setItem(USER_KEY_TOKEN_ACCESS, usuarioLogueado.tokenAcceso)
      sessionStorage.setItem(USER_KEY_TOKEN_REFRESH, usuarioLogueado.tokenRefresco)
      switch (usuarioLogueado.tipoUsuario) {
        case "CHOFER": handleNavigation('/homechofer'); break
        case "PASAJERO": handleNavigation('/homepasajero'); break
        default: handleNavigation('/login')
      }
    } catch (error: unknown) {
      mostrarMensajeError(error as ErrorResponse, setErrorMessage)
    } finally {
      setIsLoading(false);
    }
  };

  useOnInit(() => { sessionStorage.clear() })

  return (
    // FIX: centrado manejado con sx de MUI, sin depender de clase CSS externa
    <Container sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ mb: 1 }}>
          <UbertoLogo tamaño="3em" colorLogo="#4e199e" />
        </Box>

        <form>
          <FormControl sx={{ m: 1, width: '25ch', gap: 1.2, color: '#7B4BDF' }} variant="outlined">
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              color="primary"
              name="username"
              required
              onChange={handleUsername}
              error={fromTouched && !userName}
              helperText={
                fromTouched && !userName ? (
                  <Box display="flex" alignItems="center">
                    <Typography color="red" fontSize={12}>El usuario es obligatorio</Typography>
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

            <FormControl variant="outlined" fullWidth required margin="normal" error={fromTouched && !password}
              sx={{
                '& label.Mui-focused': { color: '#4e199e' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#4e199e' },
                  '&:hover fieldset': { borderColor: '#7a3eb1' },
                  '&.Mui-focused fieldset': { borderColor: '#4e199e' }
                }
              }}
            >
              <InputLabel htmlFor="password-input">Contraseña</InputLabel>
              <OutlinedInput
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                onChange={handlePassword}
                label="Contraseña"
              />
              {fromTouched && !password && (<FormHelperText>La contraseña es obligatoria</FormHelperText>)}
            </FormControl>

            <Button onClick={ingresar} variant="contained" size="large"
              sx={{ backgroundColor: "#4e199e", marginTop: 1, fontFamily: ['Roboto', 'sans-serif'], textTransform: 'none' }}
            >
              Ingresar
            </Button>
            <Button onClick={() => navigate('/register')}
              sx={{ color: "#4e199e", textTransform: 'none', fontSize: '0.8rem' }}
            >
              ¿No tienes una cuenta? Registrate aquí
            </Button>
          </FormControl>
        </form>
      </Box>

      <Notificacion
        open={snackbarOpen}
        mensaje={errorMessage}
        severidad="error"
        onClose={() => setErrorMessage('')}
      />
      <Spinner color="#4e199e" size={50} isLoading={isLoading} />
    </Container>
  );
};

export { Login };
