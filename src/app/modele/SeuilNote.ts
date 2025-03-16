export interface SeuilNote  {
    idSeuilNoteConcours?: number,
    idNiveau: number,
    note: number,
    dateSaisie?: Date,
    idPat?: number,
    nomNiveau?: string,
    noteInitial?: number,
    showEdit?: boolean;
}
