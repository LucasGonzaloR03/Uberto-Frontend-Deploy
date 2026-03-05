

export type RegistroClicksJSON = {
    nombrePasajero: string,
    fechaHoraClick: string
}


export class RegistroClicks{
    constructor(
        public nombrePasajero: string,
        public fechaHoraClick: string
    ){}

    static fromJson(registroClicksJSON:RegistroClicksJSON):RegistroClicks{
        return Object.assign(new RegistroClicks(
            registroClicksJSON.nombrePasajero,
            registroClicksJSON.fechaHoraClick
        ))
    }
}