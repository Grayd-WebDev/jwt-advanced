import { AuthResponse } from "../types/response/AuthResponse";
import { AxiosResponse } from "axios";
import $api from "../http";

class AuthService {
  static async login(email:string, password:string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { email, password });
  }
  static async registration(email:string, password:string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post("/registration", { email, password });
  }
  static async logout():Promise<void>{
    return $api.post("/refresh");
  }
}

export default AuthService;