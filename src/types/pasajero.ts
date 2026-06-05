export class Pasajero{
    constructor(
        public id:number = 0,
        public nombre:string =  '',
        public apellido:string = '',
        public telefono:number = 0,
        public saldo:number = 0,
        public fotoPerfil:string = '',
        public listaAmigos:TarjetaAmigo[] = []
    ){}

    public nombreCompleto:string = `${this.nombre} ${this.apellido}`
    
    static fromJson(pasajeroJSON:PasajeroJSON):Pasajero{
        return Object.assign(new Pasajero(
            pasajeroJSON.id,
            pasajeroJSON.nombre,
            pasajeroJSON.apellido,
            pasajeroJSON.telefono,
            pasajeroJSON.saldo,
            pasajeroJSON.fotoPerfil,
            pasajeroJSON.listaAmigos.map( (amigo: TarjetaAmigoJSON) => TarjetaAmigo.fromJson(amigo))

        ))
    }

    toJson():PasajeroJSON{
        return{
            id:this.id,
            nombre:this.nombre,
            apellido:this.apellido,
            telefono:this.telefono,
            saldo:this.saldo,
            fotoPerfil:this.fotoPerfil,
            listaAmigos:this.listaAmigos
        }
    }
}

export type PasajeroJSON = {
    id:number,
    nombre:string,
    apellido:string,
    telefono:number,
    saldo:number,
    fotoPerfil:string,
    listaAmigos:TarjetaAmigoJSON[]
}


// dominio para traer solo los datos necesario de amigo al front

export class TarjetaAmigo{
    constructor(
        public id:number = 0,
        public fotoPerfil:string =  '',
        public nombreCompleto:string = '',
    
    ){} 

    static fromJson(tarjetaAmigoJSON:TarjetaAmigoJSON):TarjetaAmigo{
        return Object.assign(new TarjetaAmigo(
            tarjetaAmigoJSON.id,
            tarjetaAmigoJSON.fotoPerfil,
            tarjetaAmigoJSON.nombreCompleto
        

        ))
    }
}

export type TarjetaAmigoJSON = {
    id:number,
    fotoPerfil:string,
    nombreCompleto:string,
}

export class PasajeroParaTarjeta{
    constructor(
    public fotoPerfil: string,
    public nombreCompleto: string
    ){}

    static fromJson(pasajeroParaTarjetaJSON:PasajeroParaTarjetaJSON):PasajeroParaTarjeta{
        return Object.assign(new PasajeroParaTarjeta(
            pasajeroParaTarjetaJSON.fotoPerfil,
            pasajeroParaTarjetaJSON.nombreCompleto
        ))
    }
}

export type PasajeroParaTarjetaJSON = {
    fotoPerfil:string,
    nombreCompleto:string
}


export class AmigoDelAmigoDTO {
    constructor(
        public id: number = 0,
        public nombre: string = '',
        public apellido: string = ''
    ) {}

    static fromJson(amigoDelAmigoJSON: AmigoDelAmigoJSON): AmigoDelAmigoDTO {
        return Object.assign(new AmigoDelAmigoDTO(
            amigoDelAmigoJSON.id,
            amigoDelAmigoJSON.nombre,
            amigoDelAmigoJSON.apellido
        ));
    }
}

export type AmigoDelAmigoJSON = {
    id: number,
    nombre: string,
    apellido: string
}