import { AppBar, Avatar, Box, Toolbar } from "@mui/material"
import UbertoLogo from "./UbertoLogo"
import { obtenerUserFotoPerfil, obtenerUserTipo } from "../../services/UsuarioService"

function HeaderApp() {
    const fotoPerfil = obtenerUserFotoPerfil()
    const esChofer = obtenerUserTipo()

    return (
        <AppBar sx={{ backgroundColor: 'var(--primary-color)' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <UbertoLogo tamaño="1.75em" colorLogo="white" />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar
                        src={fotoPerfil}
                        alt={esChofer ? 'Chofer' : 'Pasajero'}
                        sx={{
                            width: 36,
                            height: 36,
                            border: '2px solid rgba(255,255,255,0.6)',
                        }}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderApp
