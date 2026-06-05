import { Avatar, Box, CardContent, Typography } from "@mui/material";
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { TarjetaChofer } from "../../types/tarjetaChofer";

export interface CardChoferProps {
    tarjeta: TarjetaChofer;
    alSeleccionarChofer: (idChofer: string) => void
}

export function CardChofer({ tarjeta, alSeleccionarChofer }: CardChoferProps) {    
    return (
        <CardContent
            sx={{ display: 'flex', flexDirection: 'column', width: '20rem', height: 'auto', cursor: "pointer" }}
            onClick={() => alSeleccionarChofer(tarjeta.id)}
        >
            <Box 
                sx={{
                    display: 'flex', 
                    alignItems: 'center',
                    padding: '12px 18px', 
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    flexDirection: 'row', 
                    backgroundColor: 'primary.main',
                    justifyContent: 'space-between', 
                }}
            >
                <Typography color="white" sx={{ fontSize: "18px", textAlign: "start", flex: 1 }}>
                    {tarjeta.patenteVehiculo}
                </Typography>

                <StarRateRoundedIcon sx={{ color: 'white', marginRight: 0.5 }} />

                <Typography color="white" sx={{ fontSize: "16px" }}>
                    {tarjeta.puntajeChofer}
                </Typography>
            </Box>

            <Box 
                sx={{
                    padding: '8px 16px',
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    display: 'flex',
                    flexDirection: 'row', 
                    alignItems: 'center',
                    justifyContent: 'space-between',  
                    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Box sx={{ flex: 1, textAlign: 'start', padding: 0.5 }}>
                    <Typography color="primary" sx={{ fontSize: "16px", fontWeight: 'bold' }}>
                        {tarjeta.nombreCompleto}
                    </Typography>
                    <Typography color="secondary" sx={{ fontSize: "12px" }}>
                        {tarjeta.marcaVehiculo} | {tarjeta.modeloVehiculo}
                    </Typography>
                    <Typography color="secondary" sx={{ fontSize: "18px", fontWeight: 'bold' }}>
                        $ {tarjeta.costoComision}
                    </Typography>
                </Box>

                {/* FIX: reemplaza el ícono genérico de taxi por la foto real del chofer */}
                <Avatar
                    src={tarjeta.fotoPerfil ?? undefined}
                    alt={tarjeta.nombreCompleto}
                    sx={{ width: 52, height: 52, border: '2px solid', borderColor: 'primary.main' }}
                />
            </Box> 
        </CardContent>
    )
}

export default CardChofer;
