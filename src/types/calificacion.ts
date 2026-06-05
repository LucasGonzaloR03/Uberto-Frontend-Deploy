import { ChoferParaTarjeta, ChoferParaTarjetaJSON } from "./chofer";
import { PasajeroParaTarjeta, PasajeroParaTarjetaJSON } from "./pasajero";

export interface Calificacion {
    id: number;
    para: string;
    comentario: string;
    fecha: string;
    puntuacion: number;
  }
  
  export class TarjetaCalificacion{
    constructor(
      public id:number,
      public pasajero:PasajeroParaTarjeta,
      public chofer:ChoferParaTarjeta,
      public puntaje:number,
      public comentario:string,
      public fechaRealizado:Date
    ){}
  
    static fromJson(tarjetaCalificacionJson:TarjetaCalificacionJSON):TarjetaCalificacion{
      return Object.assign(new TarjetaCalificacion(
        tarjetaCalificacionJson.id,
        PasajeroParaTarjeta.fromJson(tarjetaCalificacionJson.pasajero),
        ChoferParaTarjeta.fromJson(tarjetaCalificacionJson.chofer),
        tarjetaCalificacionJson.puntaje,
        tarjetaCalificacionJson.comentario,
        new Date(tarjetaCalificacionJson.fechaRealizado)
      ))
    }
  }
  
  export type TarjetaCalificacionJSON = {
    id:number,
    pasajero:PasajeroParaTarjetaJSON,
    chofer:ChoferParaTarjetaJSON,
    puntaje:number,
    comentario:string,
    fechaRealizado:string
  }