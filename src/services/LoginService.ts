import axios from 'axios'
import { REST_SERVER_URL } from './constants/constants';
import { UserLogin, UserLoginResponseDTO } from '../types/usuario';

class LoginService {

  loggedIn: boolean = false

  async allInstances() {
    const { data } = await axios.get(`${REST_SERVER_URL}/usuarios`)
    return data
  }
  
  async login(userData: UserLogin): Promise<UserLoginResponseDTO> {
    this.loggedIn = true;
    const response = await axios.post<UserLoginResponseDTO>(`${REST_SERVER_URL}/api/auth/login`, userData);
    return response.data;
  }

}

export const loginService = new LoginService()