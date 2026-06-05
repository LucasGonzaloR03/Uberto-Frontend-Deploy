class FiltroDeBusquedaDeViaje { 
    usuario: string; 
    origen: string; 
    destino: string; 
    cantidadDePasajeros: number | null;
    constructor( 
        usuario: string = "", 
        origen: string = "", 
        destino: string = "", 
        cantidadDePasajeros: number | null = 0 
    ) { 
        this.usuario = usuario; 
        this.origen = origen; 
        this.destino = destino; 
        this.cantidadDePasajeros = cantidadDePasajeros === 0 ? null : cantidadDePasajeros; 
    }
    asHttpParams(): URLSearchParams { 
        const params = new URLSearchParams(); 
        if (this.usuario) params.set("usuario", this.usuario); 
        if (this.origen) params.set("origen", this.origen); 
        if (this.destino) params.set("destino", this.destino); 
        if (this.cantidadDePasajeros !== null && this.cantidadDePasajeros > 0) { params.set("cantidadDePasajeros", this.cantidadDePasajeros.toString()); 

        } return params; 
    } 
}

export default FiltroDeBusquedaDeViaje;