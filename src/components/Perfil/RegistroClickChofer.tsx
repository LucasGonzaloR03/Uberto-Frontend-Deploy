import { useState } from "react";
import { RegistroClicks } from "../../domain/registroClicks";
import { useOnInit } from "../../utils/hooks";
import { choferService } from "../../services/ChoferService";
import { Box, Container, Typography } from "@mui/material";

import TarjetaRegistroClick from "../Tarjetas/TarjetaRegistroClick";





export function RegistroClickChofer() {

    const [registroClicks, setRegistroClicks] = useState<RegistroClicks[]>([]);

    useOnInit(() => {const obtenerRegistroClicks = async () => {
        try {   
            const registroClicksChofer = await choferService.getChoferClicks()
            setRegistroClicks(registroClicksChofer);
        }
        catch(error) {
            console.error("Error al obtener los registros de clicks:", error);
        }

    }
    obtenerRegistroClicks();
    
}
)

    return (
   <Container disableGutters sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%' }}>
     

      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", width: "100%", pb:"4rem" }}>
        {registroClicks.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No hay clicks registrados en este momento.
          </Typography>
        ) : (
          registroClicks.map((tarjetaClick) => (
            <TarjetaRegistroClick  tarjeta={tarjetaClick}  />
          ))
        )}
      </Box>
    
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        width: '100%', 
        marginTop: 4,
        position: 'fixed',
        zIndex: 1000,
        bottom: '3.4375rem',
        left: 0,
        backgroundColor: 'white' 
        }}
      >
        <Typography variant="body1" color="black" fontWeight="bold" fontSize= "25px" >
          Total clicks
        </Typography>
        <Typography variant="h6" color="black"  sx={{ fontSize: "25px", margin: 0 }}>
          {registroClicks.length}
        </Typography>
      </Box>
      
    </Container>
    );
}