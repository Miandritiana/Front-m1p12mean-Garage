export interface  CalendrierDispatch {
    idCalendrierConcours: number,
    idPlageHoraire: number,
    dateConcoursEcrit: Date,
    dateConcoursOral: Date,
    idCampus: number,
    heureDebut: string,
    lieuxOral: string,
    effectif: number,
    idEnseignant: number,
    idSalle: number,
    urlVisio: string,
    nom: string,
    prenom: string,
    salle: string,
    typePresentation: number;
    idConcoursEnseignantDispatch:number
}