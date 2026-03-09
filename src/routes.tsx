import { Routes, Route, Navigate } from 'react-router-dom';
import { DetalleViaje } from './pages/HomeUsuario/DetalleViaje';
import PerfilUsuario from './pages/PerfilDeUsuario/PerfilDeUsuario';
import { HomeUsuario } from './pages/HomeUsuario/HomeUsuario';
import { FormularioPasajero } from './components/Formularios/FormularioPasajero';
import { pasajeroService } from './services/PasajeroService';
import { TarjetaViaje, Viaje } from './domain/viaje';
import CardChofer from './components/Tarjetas/TarjetaChofer';
import { FormularioChofer } from './components/Formularios/FormularioChofer';
import FiltroDeBusquedaDeViaje from './domain/filtroDeBusquedaDeViaje';
import CardViaje from './components/Tarjetas/TarjetaViaje';
import { TarjetaChofer } from './domain/tarjetaChofer';
import { JSX } from 'react';
import { choferService } from './services/ChoferService';
import { Login } from './pages/Login/Login';
import RegisterForm from './pages/Register/Register';


const USER_KEY_ID_STORAGE = 'userLogedID';

const ProtectedRoute = (element: JSX.Element) => {
    const isAuthenticated = !!sessionStorage.getItem(USER_KEY_ID_STORAGE);
    return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<RegisterForm/>} />
            <Route path="/perfilUsuario" element = {ProtectedRoute(<PerfilUsuario/>)} />           
            <Route path="/detalleviaje/:idChofer/:viajeSerializado" element = {ProtectedRoute(<DetalleViaje/>)}/>
            <Route path="/homepasajero" element={ProtectedRoute(<HomeUsuario<Viaje,TarjetaChofer> Formulario={FormularioPasajero} AccionDeServicio={pasajeroService.getChoferesDisponibles} CardComponente={CardChofer}/>)}/>
            <Route path="/homechofer" element={ProtectedRoute(<HomeUsuario<FiltroDeBusquedaDeViaje,TarjetaViaje> Formulario={FormularioChofer} AccionDeServicio={choferService.getFiltroViajes} CardComponente={CardViaje}/>)}/>
            
            <Route path="*" element={<Navigate to= "/login" />} />
        </Routes>
    );
};

export default AppRoutes;