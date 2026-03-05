import React from "react";
import { Typography, Fade } from "@mui/material";

interface LogoProps {
  className?: string;
  colorLogo?: string;
  tamaño?: string
}

const UbertoLogo: React.FC<LogoProps> = ({ className, colorLogo, tamaño }) => {
  return (
    <Fade in={true} timeout={800}>
      <Typography
        fontSize={tamaño}
        className={className}
        sx={{
          fontWeight: "bold",
          color: colorLogo,
          textTransform: "uppercase",
          letterSpacing: 2,
          textAlign: "center",
          padding: "5px",
          
        }}
      >
        Uberto
      </Typography>
    </Fade>
  );
};

export default UbertoLogo;