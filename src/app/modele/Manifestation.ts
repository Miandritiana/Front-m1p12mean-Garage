export class Manifestation {
    "idManifestation": number;
    "idPersonne": number;
    "idVille": number;
    "idEtablissement": number;
    "dateManifestation": Date;
    "idNiveau": number;
    "idParcours": number;
    "nom"?: string;
    "prenom"?: string;
    "dateNaissance"?: Date;
    "contact"?: string;
    "email"?: string;
    "nomVilleContact"?: string;
    "nomEtablissement"?: string;
    "nomNiveau"?: string;
    "idTypeFormation"?: number;
    "nomParcours"?: string;
    "statutConcours"?: string;
    "isSelected"?: boolean;
}