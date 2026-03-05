import { ChoferParaTarjeta, ChoferParaTarjetaJSON } from "./chofer"
import { PasajeroParaTarjeta, PasajeroParaTarjetaJSON } from "./pasajero"

export class Viaje{
    constructor(
        public id: null | number = null,
        public duracion:number = 0,
        public origen:string = "",
        public destino:string = "",
        public cantidadPasajeros:number = 1,
        public fechaInicio:string = ""
    ){}

    static fromJson(tarjetaViajeJSON:ViajeJSON):Viaje{
        return Object.assign(new Viaje(
            tarjetaViajeJSON.id,
            tarjetaViajeJSON.duracion,
            tarjetaViajeJSON.origen,
            tarjetaViajeJSON.destino,
            tarjetaViajeJSON.cantidadPasajeros,
            tarjetaViajeJSON.fechaInicio
        ))
    }

    toJson():ViajeJSON{
        return{
            id: this.id,
            duracion: this.duracion,
            origen: this.origen,
            destino: this.destino,
            cantidadPasajeros: this.cantidadPasajeros,
            fechaInicio: this.fechaInicio
        }
    }

}

export type ViajeJSON = {
    id:null | number,
    duracion:number,
    origen:string,
    destino:string,
    cantidadPasajeros:number,
    fechaInicio:string
}


export class TarjetaViaje{
    constructor(
        public id: number=0,
        public pasajero: PasajeroParaTarjeta,
        public chofer: ChoferParaTarjeta,
        public cantidadDePasajeros: number=0,
        public origen: string='',
        public destino: string='',
        public fechaInicio: string='',
        public fechaFin: string='',
        public importeComision:number=0,
        public importeNormal:number=0,
        public fueCalificado: boolean=false
    ){}

    static fromJson(tarjetaViajeJSON:TarjetaViajeJSON):TarjetaViaje{
        return Object.assign(new TarjetaViaje(
            tarjetaViajeJSON.id,
            tarjetaViajeJSON.pasajero,
            tarjetaViajeJSON.chofer,
            tarjetaViajeJSON.cantidadDePasajeros,
            tarjetaViajeJSON.origen,
            tarjetaViajeJSON.destino,
            tarjetaViajeJSON.fechaInicio,
            tarjetaViajeJSON.fechaFin,
            tarjetaViajeJSON.importeComision,
            tarjetaViajeJSON.importeNormal,
            tarjetaViajeJSON.fueCalificado

        ))
    }

}

export type TarjetaViajeJSON = {
        id:number,
        pasajero:PasajeroParaTarjetaJSON,
        chofer:ChoferParaTarjetaJSON,
        cantidadDePasajeros: number,
        origen: string,
        destino: string,
        fechaInicio: string,
        fechaFin: string,
        importeComision:number,
        importeNormal:number,
        fueCalificado:boolean
}

export class DetalleViajeDTO{
    constructor(
        public origen:string,
        public destino:string,
        public fechaInicio: string,
        public duracion: number,
        public cantidadDePasajeros: number
    ){}
}