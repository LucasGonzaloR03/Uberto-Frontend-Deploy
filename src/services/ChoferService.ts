import { TarjetaCalificacion, TarjetaCalificacionJSON } from "../types/calificacion";
import { Chofer, ChoferJSON } from "../types/chofer";
import FiltroDeBusquedaDeViaje from "../types/filtroDeBusquedaDeViaje";
import { TarjetaViaje, TarjetaViajeJSON } from "../types/viaje";
import { REST_SERVER_URL } from "./constants/constants";
import { obtenerUserID } from "./UsuarioService";
import { httpRequest } from "./constants/common";
import { RegistroClicks, RegistroClicksJSON } from "../types/registroClicks";

class ChoferService {

  async getFiltroViajes(filtroViaje:FiltroDeBusquedaDeViaje): Promise<TarjetaViaje[]> {
      const viajesPendientesJSON:TarjetaViajeJSON[] = await httpRequest<TarjetaViajeJSON[]>({
        url:`${REST_SERVER_URL}/chofer/home/filtro?idChofer=${obtenerUserID()}`,
        data:filtroViaje,
        method:'POST'
      }) 
      const viajesPendientes:TarjetaViaje[] = viajesPendientesJSON.map((viajePendienteJson:TarjetaViajeJSON)=>TarjetaViaje.fromJson(viajePendienteJson))
      return viajesPendientes

  }  

  async getViajesRealizados(): Promise<TarjetaViaje[]> {
      const viajesRealizadosJSON:TarjetaViajeJSON[] = await httpRequest<TarjetaViajeJSON[]>({
        url:`${REST_SERVER_URL}/chofer/perfil/viajesrealizados?idChofer=${obtenerUserID()}`,
        method:'GET'
      })
      const viajesrealizados:TarjetaViaje[] = viajesRealizadosJSON.map((viajesRealizadosJson:TarjetaViajeJSON)=>TarjetaViaje.fromJson(viajesRealizadosJson))
      return viajesrealizados
  }

  async getCalificaciones(): Promise<TarjetaCalificacion[]> {
      const tarjetaCalificacionJSON:TarjetaCalificacionJSON[] = await httpRequest<TarjetaCalificacionJSON[]>({
        url:`${REST_SERVER_URL}/chofer/perfil/calificaciones?idChofer=${obtenerUserID()}`,
        method:'GET'
      })
      const tarjetasCalificacion:TarjetaCalificacion[] = tarjetaCalificacionJSON.map((tarjetaCalificacionJson:TarjetaCalificacionJSON)=>TarjetaCalificacion.fromJson(tarjetaCalificacionJson))
      return tarjetasCalificacion
  }

    
  async getDatosChofer(): Promise<Chofer> {
      const choferJSON:ChoferJSON = await httpRequest<ChoferJSON>({
        url:`${REST_SERVER_URL}/chofer/perfil/informacion?idChofer=${obtenerUserID()}`,
        method:'GET'
      })    
      const chofer:Chofer = Chofer.fromJson(choferJSON)
      return chofer
  }

  
  async getImporteTotal(): Promise<number> {
      const importeChofer:number = await httpRequest<number>({
        url:`${REST_SERVER_URL}/chofer/perfil/importetotal?idChofer=${obtenerUserID()}`,
        method:'GET'
      })
      return importeChofer
  }


  async updateChofer(chofer:Chofer){
    return await httpRequest({
      url:`${REST_SERVER_URL}/chofer/perfil/actualizardatos`,
      data:chofer.toJson(),
      method:'PUT'
    })    
  }

 async getChoferClicks(): Promise<RegistroClicks[]> {
      const registroClickChofer:RegistroClicksJSON[] = await httpRequest<RegistroClicksJSON[]>({
        url:`${REST_SERVER_URL}/chofer/perfil/registroclicks?idChofer=${obtenerUserID()}`,
        method:'GET'
      })
      return registroClickChofer.map((registroClickChoferJson:RegistroClicksJSON)=>RegistroClicks.fromJson(registroClickChoferJson))
  }

}

export const choferService = new ChoferService();