export class ConsultaDeViaje{
    constructor(
        public fechaInicio: string,    
        public duracion: number,
        public cantidadDePasajeros: number 
    ){}
}

export type TarjetaChoferJSON = {
    id: string 
    patenteVehiculo: string
    nombreCompleto: string 
    marcaVehiculo: string 
    modeloVehiculo: null | number 
    costoComision: null | number 
    puntajeChofer: null | number
    // FIX: agregado para mostrar foto de perfil del chofer en la tarjeta
    fotoPerfil: string | null
}

export class TarjetaChofer{
    constructor(
        public id: string = "",
        public patenteVehiculo: string,
        public nombreCompleto: string,
        public marcaVehiculo: string,
        public modeloVehiculo: null | number,
        public costoComision: null | number,
        public puntajeChofer: null | number,
        // FIX: agregado
        public fotoPerfil: string | null = null
    ){}

    static fromJson(tarjetaChoferJSON: TarjetaChoferJSON): TarjetaChofer {
        return Object.assign(new TarjetaChofer(
            tarjetaChoferJSON.id,
            tarjetaChoferJSON.patenteVehiculo,
            tarjetaChoferJSON.nombreCompleto,
            tarjetaChoferJSON.marcaVehiculo,
            tarjetaChoferJSON.modeloVehiculo,
            tarjetaChoferJSON.costoComision,
            tarjetaChoferJSON.puntajeChofer,
            tarjetaChoferJSON.fotoPerfil
        ))
    }

    toJson(): TarjetaChoferJSON {
        return {
            id: this.id, 
            patenteVehiculo: this.patenteVehiculo,
            nombreCompleto: this.nombreCompleto,
            marcaVehiculo: this.marcaVehiculo, 
            modeloVehiculo: this.modeloVehiculo,
            costoComision: this.costoComision,
            puntajeChofer: this.puntajeChofer,
            fotoPerfil: this.fotoPerfil
        }
    }
}
