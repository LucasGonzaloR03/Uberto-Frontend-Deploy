import axios from "axios";
import { REST_SERVER_URL } from "./constants/constants";
import { RegisterData } from "../pages/Register/Register";

class RegisterService{
    async register(dataRegister: RegisterData): Promise<void> {
        await axios.post(`${REST_SERVER_URL}/api/auth/register`, dataRegister)
    }
}

export const registerService = new RegisterService()