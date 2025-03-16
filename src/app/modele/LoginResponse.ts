import { Menu } from "./menu";

export interface LoginResponse {
    message: string; 
    token: string;
    idUser: string;
    role: string;
    nom: string;
    prenom: string;
} 
