import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import { House, SignOut, UserCircle } from "@phosphor-icons/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { obtenerUserTipo } from "../../services/UsuarioService"

function FooterApp(){
    const [value, setValue] = useState(0)
    const navegar = useNavigate()

    const manejarNavegacion = (direccion: string) => {
        navegar(direccion)
    }

    const salirDeLaApp = () => { 
        sessionStorage.clear()
        manejarNavegacion('/login')
    }

    return(
        <Paper elevation={3} sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 1 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(_event, newValue) => { setValue(newValue) }}
                sx={{ backgroundColor: 'var(--primary-color)' }}
            >
                <BottomNavigationAction
                    onClick={() => !obtenerUserTipo() ? manejarNavegacion('/homepasajero') : manejarNavegacion('/homechofer')}
                    icon={<House color="white" weight="fill" size={32} />}
                />
                <BottomNavigationAction
                    onClick={() => manejarNavegacion('/perfilUsuario')}
                    icon={<UserCircle color="white" weight="bold" size={32} />}
                />
                <BottomNavigationAction
                    onClick={salirDeLaApp}
                    icon={<SignOut color="white" weight="bold" size={32} />}
                />
            </BottomNavigation>
        </Paper>
    )
}

export default FooterApp
