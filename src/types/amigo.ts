export class Amigo {
    constructor(
      public id: number,
      public nombreCompleto: string,
      public fotoPerfil: string,
    ) {}
  
    static fromJson(amigoJSON: AmigoJSON): Amigo {
      return new Amigo(
        amigoJSON.id,
        amigoJSON.nombreCompleto,
        amigoJSON.fotoPerfil,
      )
    }
  
    toJson(): AmigoJSON {
      return {
        id: this.id,
        nombreCompleto: this.nombreCompleto,
        fotoPerfil: this.fotoPerfil,
      }
    }
  }
  
  export type AmigoJSON = {
    id: number
    nombreCompleto: string
    fotoPerfil: string
  }