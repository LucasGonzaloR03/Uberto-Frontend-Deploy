import { Box, CardContent, Typography } from "@mui/material";
import { RegistroClicks } from "../../domain/registroClicks";
import { Alarm, CalendarDots, CursorClick } from "@phosphor-icons/react";
import dayjs from "dayjs";


export interface TarjetaRegistroClickProps {
    tarjeta: RegistroClicks;
}

export function TarjetaRegistroClick({ tarjeta }: TarjetaRegistroClickProps) {    

    const horaClick = dayjs(tarjeta.fechaHoraClick).format("HH:mm");

    const fechaClick = dayjs(tarjeta.fechaHoraClick).format("DD/MM/YYYY");
      
    
    return (
        <CardContent sx={{ display:'flex', flexDirection: 'column', width: '20rem', height: 'auto', cursor: "pointer" }} >
            <Box 
                sx={{
                    display: 'flex', 
                    alignItems: 'center',
                    padding: '12px 18px', 
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    flexDirection: 'row', 
                    backgroundColor: "var(--primary-color)",
                    justifyContent: 'space-between', 
                }}
            >
                <Typography color="white" sx={{ fontSize: "18px", textAlign: "start", flex: 1 }}> {tarjeta.nombrePasajero} </Typography>

                <CursorClick size={30} color="#fdeded" weight="duotone" />

                
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
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                    
                    <Box sx={{display: 'flex', flexDirection: 'row',alignItems: 'center'}}>
                        <Box sx={{ textAlign: 'center' }}>
                            <CalendarDots size={30} color="#151414" weight="duotone" />
                        </Box>
                        <Box sx={{ flex: 1, textAlign: 'start', padding: 0.5 }}>
                            <Typography color= "var(--primary-color)" sx={{ fontSize: "16px" , fontWeight: 'bold' }}>
                                {fechaClick}
                            </Typography>                  
                        </Box>
                    </Box>

                    <Box sx={{display: 'flex', flexDirection: 'row',alignItems: 'center'}}>              
                        <Box sx={{ textAlign: 'center' }}>
                            <Alarm size={30} color="#151414" weight="duotone" />
                        </Box>
                        <Box sx={{ flex: 1, textAlign: 'start', padding: 0.5 }}>
                            <Typography color= "var(--primary-color)" sx={{ fontSize: "16px" , fontWeight: 'bold' }}>
                                {horaClick}
                            </Typography>                  
                        </Box>
                    </Box>
                </Box>
            </Box> 
        </CardContent>
    )
}

export default TarjetaRegistroClick;