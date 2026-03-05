import { AppBar, Toolbar, Typography } from "@mui/material"
import UbertoLogo from "./UbertoLogo"

function HeaderApp(){
    return(
        <AppBar sx={{backgroundColor:'var(--primary-color)'}}>
            <Toolbar>
                <Typography sx={{fontWeight:'bold'}}>
                    <UbertoLogo tamaño="1.75em" colorLogo="white"  ></UbertoLogo>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderApp