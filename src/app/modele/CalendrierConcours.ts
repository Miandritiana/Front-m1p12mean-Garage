export interface  CalendrierConcours {
    dateConcours:number;
    heure:Date;
    type:boolean;
    details:{
        concours:{
            idConcours:number,
            idEtudiant: number,
            idCalendrier: number,
            idPlageHoraireOral: number,
            typePresentation: number,
            dossier: string,
            idVague: number,
            idSujet: number,
            resulatEssaie: number,
            etat: number,
            dateInscriptionConcours: Date,
            nom: string,
            prenom: string,
            contact: string,
            email: string,
            dateConcours: Date,
            heureDebut: string,
            heureFin: string,
            numero: string,
            sujet: string; 
            idNiveau: number,
            idFiliere: number,
            filiere: string,
            codeFiliere: string,
            niveau: string,
            libelleTypePresentation: string,
            idEnseignant: number;
            enseignant: string;
            etatLibelle: string;
        }
    }[]
}