export interface  TotalNoteConcours {
    idConcours: number,
    idNoteConcoursEntretien: number
    noteEntretien: number
    noteMaximumEntretien:number
    idEnseignantEntretien: number
    enseignantEntretien: string
    dateSaisieEntretien: Date
    idNoteConcoursEssai: number
    noteEssai: number
    noteMaximumEssai: number
    idEnseignantEssai: number
    enseignantEssai: string
    dateSaisieEssai: Date
    participant: string
    idEtudiant: number
    filiere: string
    niveau: string
    moyenne:number
    etat:string
}