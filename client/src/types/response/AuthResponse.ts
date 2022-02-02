import {IUser} from "../IUser";

export interface AuthResponse{
    accessToken: string,
    refreshToken: string,
    id: string,
    user: IUser
};