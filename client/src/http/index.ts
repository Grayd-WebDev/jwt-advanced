import { config } from "process";
import { AuthResponse } from "./../types/response/AuthResponse";
import axios from "axios";

export const API_URL = "http://localhost:5000/api";

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config:any)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});
$api.interceptors.response.use((config)=>{
    return config;
},async(error)=>{
    if(error.response.status === 401 && error.config && !error.config._isRetry){
        try {
            const originalRequest = error.config;
                const tokens = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials:true});
                localStorage.setItem("token", tokens.data.accessToken);
                return $api.request(originalRequest);
        } catch (e) {
            console.log("Unauthorized");
            
        }
    }
    throw error;

});
export default $api;