import { Concours } from "./Concours";
import { DetailNoteConcours } from "./DetailNoteConcours";
import { NoteConcours } from "./NoteConcours";
import { ObservationNoteConcours } from "./ObservationNoteConcours";

export interface  NoteData {
    detailNote:{
        epreuve:string,
        idEpreuve:number,
        detail:DetailNoteConcours[],
        observation?: ObservationNoteConcours
    }[],
    concours:Concours;
    noteConcours:NoteConcours;
}