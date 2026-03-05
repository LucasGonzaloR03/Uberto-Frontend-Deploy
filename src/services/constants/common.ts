import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios'
import { USER_KEY_TOKEN_ACCESS } from '../UsuarioService'


export async function httpRequest<T>(request: AxiosRequestConfig): Promise<T> {
  const token = sessionStorage.getItem(USER_KEY_TOKEN_ACCESS) ?? ''
  const headers = request.headers as AxiosHeaders ?? new AxiosHeaders()
  headers.setAuthorization(`Bearer ${token}`)
  const okRequest = {
    ...request,
    headers,
  }
  const response = await axios(okRequest)
  return response.data
}
