import { Menu } from "./menu";

export interface LoginResponse {
    message: string; 
    token: string;
    iduser: string;
    role: string;
    nom: string;
    prenom: string;
} 
