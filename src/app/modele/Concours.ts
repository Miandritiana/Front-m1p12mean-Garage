export interface  Concours {
    "idConcours": number;
    "idPersonne": number;
    "idCalendrierConcours": number;
    "idPlageHoraire": number;
    "typePresentation": number;
    "dateInscription": Date;
    "idCampus": number;
    "idTypeFormation": number;
    "idNiveau": number;
    "idParcours": number;
    "etat": number;
    "nom": string;
    "prenom": string;
    "contact": string;
    "email": string;
    "nomCampus": string;
    "niveau": string;
    "parcours": string;
    "dateConcoursEcrit": Date;
    "dateConcoursOral": Date;
    "heureDebut": string;
    "heureFin": string;
    "sujet": string,
    "etatConcours": string;
    "isSelected" : boolean;

    "filiere":string;
    "dateConcours": Date;
    "salle":string;
    "resultatEssaie": string;
    "enseignant":string;
    "dateNaissance":Date;
    "abreviationNiveau":string
    "modePaiement" :number
}