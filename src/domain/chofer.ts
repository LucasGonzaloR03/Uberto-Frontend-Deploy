import { TarjetaCalificacion, TarjetaCalificacionJSON } from "./calificacion";

export class Chofer{
    constructor(
        public id: string = "",
        public nombre:string = '',
        public apellido:string = '',
        public modeloVehiculo:string = '',
        public marcaVehiculo:string = '',
        public patenteVehiculo = '',
        public precioBase:number = 0,
        public fotoPerfil:string = '',
        public tipoChofer:string  = ''
    ){}
    
    public nombreCompleto:string = `${this.nombre} ${this.apellido}`

    static fromJson(ChoferJSON:ChoferJSON):Chofer{
        return Object.assign(new Chofer(
            ChoferJSON.id,
            ChoferJSON.nombre,
            ChoferJSON.apellido,
            ChoferJSON.modeloVehiculo,
            ChoferJSON.marcaVehiculo,
            ChoferJSON.patenteVehiculo,
            ChoferJSON.precioBase,
            ChoferJSON.fotoPerfil,
            ChoferJSON.tipoChofer
        ))
    }

    toJson():ChoferJSON{
        return{
            id:this.id,
            nombre:this.nombre,
            apellido:this.apellido,
            modeloVehiculo:this.modeloVehiculo,
            marcaVehiculo:this.marcaVehiculo,
            patenteVehiculo:this.patenteVehiculo,
            precioBase:this.precioBase,
            fotoPerfil:this.fotoPerfil,
            tipoChofer: this.tipoChofer
        }
    }

    public precioDelViajeParaPasajero(): number {
        return this.precioBase * 1.05;
    }
}

export type ChoferJSON = {
    id:string,
    nombre:string,
    apellido:string,
    modeloVehiculo:string,
    marcaVehiculo:string,
    patenteVehiculo:string,
    precioBase:number,
    fotoPerfil:string,
    tipoChofer:string
}

export class DetalleChofer{
    constructor(
        public id: string = "",
        public nombreCompleto:string = '',
        public tipoChofer:string = '',
        public marcaVehiculo:string = '',
        public modeloVehiculo:number = 0,
        public patenteVehiculo:string = '',
        public puntaje: number = 0,
        public listaCalificacion:TarjetaCalificacion[] = []
    ){
    }
    static fromJson(detalleChoferJson:DetalleChoferJSON):DetalleChofer{
        return Object.assign(new DetalleChofer(
            detalleChoferJson.id,
            detalleChoferJson.nombreCompleto,
            detalleChoferJson.tipoChofer,
            detalleChoferJson.marcaVehiculo,
            detalleChoferJson.modeloVehiculo,
            detalleChoferJson.patenteVehiculo,
            detalleChoferJson.puntaje,
            detalleChoferJson.listaCalificacion.map((tarjetaCalificacionJson:TarjetaCalificacionJSON)=>TarjetaCalificacion.fromJson(tarjetaCalificacionJson))
        ))
    }
}

export type DetalleChoferJSON = {
    id:string,
    nombreCompleto:string,
    tipoChofer:string,
    marcaVehiculo:string,
    modeloVehiculo:number,
    patenteVehiculo:string,
    puntaje:number,
    listaCalificacion:TarjetaCalificacionJSON[]
}


export class ChoferParaTarjeta{
    constructor(
    public fotoPerfil: string,
    public nombreCompleto: string
    ){}

    static fromJson(choferParaTarjetaJSON:ChoferParaTarjetaJSON):ChoferParaTarjeta{
        return Object.assign(new ChoferParaTarjeta(
            choferParaTarjetaJSON.fotoPerfil,
            choferParaTarjetaJSON.nombreCompleto
        ))
    }

    
}

export type ChoferParaTarjetaJSON = {
    fotoPerfil:string,
    nombreCompleto:string
}

export function tipoChoferAStrPerfil(tipoChofer:string): string{
    const tipoChoferStrMap: { [key: string]: string } = {
        "ChoferSimple": 'Automovilista Simple',
        "ChoferPremium": 'Automovilista Premium',
        "ChoferMoto": 'Motocicleta',
    }
    return tipoChoferStrMap[tipoChofer]
}

export function tipoChoferAStrDetalle(tipoChofer:string): string{
    const tipoChoferStrMap: { [key: string]: string } = {
        "ChoferSimple": 'Chofer Simple',
        "ChoferPremium": 'Chofer Premium',
        "ChoferMoto": 'Chofer Moto',
    }
    return tipoChoferStrMap[tipoChofer]
}