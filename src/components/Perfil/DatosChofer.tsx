import { useState } from "react";
import { TextField, Button, Typography, Box, Divider} from "@mui/material";
import { Chofer, tipoChoferAStrPerfil } from "../../types/chofer";
import { choferService } from "../../services/ChoferService";
import { ErrorResponse, mostrarMensajeError } from "../../utils/errorHandling";
import { useOnInit } from "../../utils/hooks";
import { Notificacion } from "../Modales/Notificacion";
import { Spinner } from "../Spinner";

export const DatosChofer = () => {
    const [fromTouched,setFromTouched] = useState(false)
    const [infoChofer, setInfoChofer] = useState<Chofer>( new  Chofer() );
    const [notificacion, setNotificacion] = useState({ open: false, mensaje: "", severidad: "success" as "success" | "error" });
    const [mensajeError, setMensajeError] =useState("")
    const [isLoading, setIsLoading] = useState(false)

    useOnInit(() => { traerDatosChofer() })
  
    const traerDatosChofer = async () => {
      setIsLoading(true)
      try {
        const infoChofer = await choferService.getDatosChofer()
        setInfoChofer(infoChofer)
      } catch (error) {
        mostrarMensajeError(error as ErrorResponse, setMensajeError)
        setNotificacion({
          open: true,
          mensaje:`${ mensajeError}`,
          severidad: 'error',
        })
      }
      finally {
        setIsLoading(false)
      }
    }
  
    const comprobacionDeCamposIncompletos = () => {
      const camposObligatorios: (keyof Chofer)[] = ['nombre', 'apellido', 'precioBase', 'patenteVehiculo', 'marcaVehiculo', 'modeloVehiculo']
      return camposObligatorios.some(campo => !infoChofer[campo])
    }
  
    const manejoCreacionChofer = (name: keyof Chofer, value: string | number | undefined): void => {
      (infoChofer as unknown as Record<keyof Chofer, string | number | undefined>)[name] = value
      generarNuevaInfoChofer(infoChofer)
    }
      
    const generarNuevaInfoChofer = (infoChofer: Chofer) => {
      const nuevoInfoChofer = Object.assign(new Chofer(), infoChofer)
      setInfoChofer(nuevoInfoChofer)
    }
    
    const handleGuardarCambios = async () => {
      setIsLoading(true)
      try {
        setFromTouched(true)
        if(comprobacionDeCamposIncompletos()) {
          setNotificacion({ open: true, mensaje: "Por favor completa los campos obligatorios.", severidad: "error" });
          setIsLoading(false)
          return
        }
        choferService.updateChofer(infoChofer)
        setNotificacion({open:true, mensaje:"Se actualizaron datos correctamente", severidad:"success"})
      } catch (error) {
        mostrarMensajeError(error as ErrorResponse,setMensajeError)
        setNotificacion({open:true, mensaje:`${mensajeError}`, severidad:"error"})
      }finally {
        setIsLoading(false)
      }
    }
  
    return (
      <Box sx={{paddingBottom:"4rem"}}>
        <Typography variant="h6" color="var(--primary-color)" textAlign={"left"} >Datos del chofer</Typography>
        
        //Input nombre del chofer
        <TextField 
          label="Nombre" 
          fullWidth  
          margin="normal" 
          color="primary" 
          name="titulo" 
          required
          value={infoChofer.nombre}
          onChange={(event) => manejoCreacionChofer('nombre', event.target.value)}
          error={fromTouched && !infoChofer.nombre}
          helperText={
              fromTouched && !infoChofer.nombre ? (
                  <Box display="flex" alignItems="center" gap={1}>
                      <Typography color="red">El nombre es obligatorio</Typography>
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

        //Input apellido del chofer
        <TextField 
          label="Apellido" 
          fullWidth  
          margin="normal" 
          color="primary" 
          name="titulo" 
          required
          value={ infoChofer.apellido } 
          onChange={(event) => manejoCreacionChofer('apellido', event.target.value) } 
          error={fromTouched && !infoChofer.apellido}
          helperText={
            fromTouched && !infoChofer.apellido ? (
              <Box display="flex" alignItems="center" gap={1}>
                <Typography color="red">El apellido es obligatorio</Typography>
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

        //Input precio base del chofer
        <TextField 
          label="Precio Base" 
          fullWidth  
          margin="normal" 
          color="primary" 
          name="titulo" 
          required
          value={ infoChofer.precioBase } 
          onChange={(event) => manejoCreacionChofer('precioBase', event.target.value) } 
          error={fromTouched && !infoChofer.precioBase}
          helperText={
            fromTouched && !infoChofer.precioBase ? (
              <Box display="flex" alignItems="center" gap={1}>
                <Typography color="red">El precio base es obligatorio</Typography>
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
      

        <Divider variant="middle" component="li" sx={{borderColor: "black"}}/>

        <Typography
            sx={{ display: 'flex', justifyItems: 'start', width: '100%' ,margin: '1rem' }}
            variant="h5"
            component="div"
            color="#4e199e"
            fontWeight="bold"
            textAlign="left"
        >
            Chofer {tipoChoferAStrPerfil(infoChofer.tipoChofer)}
        </Typography>

        <TextField
            label="Dominio"
            fullWidth
            margin="normal"
            color="primary"
            name="titulo"
            required
            value={ infoChofer.patenteVehiculo }
            onChange={(event) => manejoCreacionChofer('patenteVehiculo', event.target.value) }
            error={fromTouched && (!infoChofer.patenteVehiculo )}
            helperText={fromTouched && !infoChofer.patenteVehiculo ? "El dominio es obligatorio" : "El formato debe ser AAA000 o AA000AA"}
            placeholder="AAA000 o AA000AA"
            sx={{
                '& label.Mui-focused': { color: '#4e199e' },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#4e199e' },
                    '&:hover fieldset': { borderColor: '#7a3eb1' },
                    '&.Mui-focused fieldset': { borderColor: '#4e199e' }
                }
            }}
        />

         //Marca del auto del chofer
        <TextField 
            label="Marca del Vehículo" 
            fullWidth  
            margin="normal" 
            color="primary" 
            name="titulo" 
            required
            value={ infoChofer.marcaVehiculo } 
            onChange={(event) => manejoCreacionChofer('marcaVehiculo', event.target.value) } 
            error={fromTouched && !infoChofer.marcaVehiculo}
            helperText={
                fromTouched && !infoChofer.marcaVehiculo ? (
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography color="red">La marca es obligatoria</Typography>
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

        //Modelo del auto del chofer
        <TextField 
            label="Modelo" 
            fullWidth  
            margin="normal" 
            color="primary" 
            name="titulo" 
            required
            value={ infoChofer.modeloVehiculo } 
            onChange={(event) => manejoCreacionChofer('modeloVehiculo', event.target.value) } 
            error={fromTouched && !infoChofer.modeloVehiculo}
            helperText={
                fromTouched && !infoChofer.modeloVehiculo ? (
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography color="red">El modelo del vehiculo es obligatorio</Typography>
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

        <Button variant="contained" onClick={()=>handleGuardarCambios( )} fullWidth sx={{backgroundColor:'var(--secondary-color)'}}>
          Guardar Cambios
        </Button>

        <Notificacion
          open={notificacion.open}
          mensaje={notificacion.mensaje}
          severidad={notificacion.severidad}
          onClose={() => setNotificacion({ ...notificacion, open: false })}
        />
        
        <Spinner isLoading={isLoading} />
      </Box>
    );
  };
  
  export default DatosChofer