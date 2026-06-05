import { REST_SERVER_URL } from "./constants/constants";
import { TarjetaChoferJSON, TarjetaChofer } from "../types/tarjetaChofer";
import { AmigoDelAmigoDTO, AmigoDelAmigoJSON, Pasajero, PasajeroJSON } from "../types/pasajero";
import { obtenerUserID } from "./UsuarioService";
import { DetalleViajeDTO, TarjetaViaje, TarjetaViajeJSON, Viaje, ViajeJSON } from "../types/viaje";

import { TarjetaCalificacion, TarjetaCalificacionJSON } from "../types/calificacion";
import { httpRequest } from "./constants/common";
import { DetalleChofer, DetalleChoferJSON } from "../types/chofer";


class PasajeroService {
  async getChoferesDisponibles(viaje: Viaje): Promise<TarjetaChofer[]> {
    const consulta = new DetalleViajeDTO(viaje.origen, viaje.destino, viaje.fechaInicio, viaje.duracion, viaje.cantidadPasajeros)
    const consultaViajeJSON:TarjetaChoferJSON[] = await httpRequest<TarjetaChoferJSON[]>({
      url:`${REST_SERVER_URL}/pasajero/home/choferesdisponibles?idPasajero=${obtenerUserID()}`,
      data:consulta,
      method:'POST'
    })
    const choferesdisponibles:TarjetaChofer[] = consultaViajeJSON.map((consultaViajeJson:TarjetaChoferJSON)=>TarjetaChofer.fromJson(consultaViajeJson))
    return choferesdisponibles
  }

  async getChoferDetalle(idChofer: string): Promise<DetalleChofer> {
    const choferDetalleJson:DetalleChoferJSON = await httpRequest<DetalleChoferJSON>({
      url:`${REST_SERVER_URL}/pasajero/home/detalleViaje?idChofer=${idChofer}&&idPasajero=${obtenerUserID()}`,
      method:'GET'
    })
    return DetalleChofer.fromJson(choferDetalleJson)
  }

  async postConfirmarViaje(viaje: DetalleViajeDTO, idChofer: string, idPasajero: number) {
    return httpRequest({
      url:`${REST_SERVER_URL}/pasajero/home/confirmarviaje?idChofer=${idChofer}&&idPasajero=${idPasajero}`,
      data:viaje,
      method:'POST'
    })
  }

  async getDatosPasajero(): Promise<Pasajero> {
      const datosPasajeroJSON:PasajeroJSON = await httpRequest<PasajeroJSON>({
        url:`${REST_SERVER_URL}/pasajero/perfil/informacion?idPasajero=${obtenerUserID()}`,
        method:'GET'
      })
      const datosPasajero:Pasajero = Pasajero.fromJson(datosPasajeroJSON)
      return datosPasajero
  }

  putActualizarPasajero(pasajero: Pasajero) {
    return httpRequest({
      url:`${REST_SERVER_URL}/pasajero/perfil/actualizardatos`,
      data:pasajero.toJson(),
      method:'PUT'
    })
  }

  putAgregarSaldo(monto: number) {
    return httpRequest({
      url:`${REST_SERVER_URL}/pasajero/perfil/actualizarsaldo?idPasajero=${obtenerUserID()}&&saldo=${monto}`,
      method:'PUT'
    })
  }

  async getUltimaBusquedaDeUnViaje():Promise<Viaje>{
    const ultimaBusquedaDelPasajeroJSON:ViajeJSON = await httpRequest<ViajeJSON>({
      url:`${REST_SERVER_URL}/pasajero/home/formulario?idPasajero=${obtenerUserID()}`,
      method:'GET'
    })
    return Viaje.fromJson(ultimaBusquedaDelPasajeroJSON)
  }
  
  async getViajesRealizados(): Promise<TarjetaViaje[]> {
    const viajesRealizadosJSON:TarjetaViajeJSON[] = await httpRequest<TarjetaViajeJSON[]>({
      url:`${REST_SERVER_URL}/pasajero/perfil/viajesrealizados?idUsuario=${obtenerUserID()}`,
      method:'GET'
    })
    const viajesRealizados:TarjetaViaje[] = viajesRealizadosJSON.map((viajeRealizadoJson:TarjetaViajeJSON)=>TarjetaViaje.fromJson(viajeRealizadoJson))
    return viajesRealizados
  }

  async getViajesPendientes(): Promise<TarjetaViaje[]> {
    const viajesPendientesJSON:TarjetaViajeJSON[] = await httpRequest<TarjetaViajeJSON[]>({
      url:`${REST_SERVER_URL}/pasajero/perfil/viajespendientes?idUsuario=${obtenerUserID()}`,
      method:'GET'
    })
    const viajesPendientes:TarjetaViaje[] = viajesPendientesJSON.map((viajePendienteJson:TarjetaViajeJSON)=>TarjetaViaje.fromJson(viajePendienteJson))
    return viajesPendientes
  }

  async getCalificaciones(): Promise<TarjetaCalificacion[]> {
    const tarjetasCalificacionJson:TarjetaCalificacionJSON[] = await httpRequest<TarjetaCalificacionJSON[]>({
      url:`${REST_SERVER_URL}/pasajero/perfil/calificaciones?idUsuario=${obtenerUserID()}`,
      method:'GET'
    })
    const tarjetasCalificacion:TarjetaCalificacion[] = tarjetasCalificacionJson.map((tarjetaCalificacionJson:TarjetaCalificacionJSON)=>TarjetaCalificacion.fromJson(tarjetaCalificacionJson))
    return tarjetasCalificacion
  }

  postCalificacion(idViaje: number, comentario: string, puntaje: number) {
    const nuevaCalificacion = {
      idViaje,
      comentario,
      puntaje
    }
    httpRequest({
      url:`${REST_SERVER_URL}/pasajero/perfil/calificar`,
      data:nuevaCalificacion,
      method:'POST'
    })
  }

  async deleteCalificacion(idCalificacion: number) {
    return httpRequest({
      url:`${REST_SERVER_URL}/pasajero/perfil/eliminarCalificacion?idCalificacion=${idCalificacion}`,
      method:'DELETE'
    })
  }

  async getAmigos(): Promise<AmigoDelAmigoDTO[]> {
    const tarjetaAmigosJson:AmigoDelAmigoJSON[] = await httpRequest<AmigoDelAmigoJSON[]>({
      url:`${REST_SERVER_URL}/pasajero/perfil/mostraramigos?idPasajero=${obtenerUserID()}`,
      method:'GET'
    })
    const tarjetasAmigos:AmigoDelAmigoDTO[] = tarjetaAmigosJson.map((tarjetaAmigoJson:AmigoDelAmigoJSON)=>AmigoDelAmigoDTO.fromJson(tarjetaAmigoJson))
    console.log("Tarjetas de amigos obtenidas:", tarjetasAmigos);
    return tarjetasAmigos
  }

  postAgregarAmigo(idAmigo: number) {
    return httpRequest({
      url: `${REST_SERVER_URL}/pasajero/perfil/agregaramigo?idPasajero=${obtenerUserID()}&&idAmigo=${idAmigo}`,
      method:'POST'
    })
  }
  

  deleteAmigo(idAmigo: number) {
    return httpRequest({
      url:`${REST_SERVER_URL}/pasajero/perfil/eliminaramigo?idPasajero=${obtenerUserID()}&&idAmigo=${idAmigo}`,
      method:'DELETE'
    })
  }
  

}

export const pasajeroService = new PasajeroService();