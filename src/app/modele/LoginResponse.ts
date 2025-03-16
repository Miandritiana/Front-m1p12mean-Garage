import { Menu } from "./menu";

export interface LoginResponse {
    idUtilisateur: number; 
    jwtToken: string;
    expiration: Date;
    nom: string;
    prenom: string;
    menu:Menu[]
} 
