import { IUser } from "./../types/IUser";
import { AxiosResponse } from "axios";
import $api from "../http";

export default class UserService{
    static async fetchUsers():Promise<AxiosResponse<IUser[]>>{
        return $api.get<IUser[]>("./users");
    };
};