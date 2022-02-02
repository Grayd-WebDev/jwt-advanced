import { AuthResponse } from "./../types/response/AuthResponse";
import { IUser } from "../types/IUser";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { API_URL } from "../http";

export default class Store{
    user = {} as IUser;
    isAuth = false;
    
    constructor(){
        makeAutoObservable(this);
    }

    setIsAuth(bool: boolean){
        this.isAuth = bool;
    }

    setUser(user: IUser){
        this.user = user;
    }

   async login(email:string, password:string){
       try{
           const res = await AuthService.login(email, password);
           console.log(res);

           localStorage.setItem("token", res.data.accessToken);
           this.setIsAuth(true);
           this.setUser(res.data.user);
       } catch(e:any) {
           console.log(e.response?.data?.message);
       }
   }
   async registration(email:string, password:string){
        try{
            const res = await AuthService.registration(email, password);
            console.log(res);
            
            localStorage.setItem("token", res.data.accessToken);
            this.setIsAuth(true);
            this.setUser(res.data.user);
        } catch(e:any) {
            console.log(e.response?.data?.message);
        }
    }
    
    async logout(){
        try{
            const res = await AuthService.logout();
            localStorage.removeItem("token");
            this.setIsAuth(false);
            this.setUser({} as IUser);
        } catch(e:any) {
            console.log(e.response?.data?.message);
        }
    }
    async checkAuth(){
        try{
            const res = await axios.get<AuthResponse>(`${API_URL}/refresh`,{withCredentials: true});
            localStorage.setItem("token",res.data.accessToken);
            this.setIsAuth(true);
            this.setUser(res.data.user);
        } catch(e:any) {
            console.log(e.response?.data?.message);
        }
    }
};