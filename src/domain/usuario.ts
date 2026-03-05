export class Usuario {

    constructor(public nombre = '') {
    }
  
    equals(otroUsuario: Usuario) {
      return otroUsuario && this.nombre === otroUsuario.nombre
    }
  
    static fromJSON(nombre: string) {
      return new Usuario(nombre)
    }
  
}

export interface UserLogin {
  username: string
  password: string
}

export interface UserLoginResponseDTO {
  userLogedID: number
  tipoUsuario:string
  fotoPerfil: string 
  tokenAcceso: string
  tokenRefresco: string
}

export class UserLoginData {
  constructor(
    public username: string = '',
    public password: string = '',
    
  ) {}

  toJSON(): UserLoginJSON {
    return {
      username: this.username,
      password: this.password
    }
  }
}

export type UserLoginJSON = {
  username: string
  password: string
}
