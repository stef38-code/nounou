import { RelationType, SexeType } from './ModelType';

export interface ParentJsonEntity {
  id: string;
  nom: string;
  prenom: string;
  relation: RelationType;
  sexe: SexeType;
  adressePostal: string; //clef etrangere sur le fichier adresses.json, 1 seule est unique adresse (obligatoire)
  emails: string[]; //clef etrangere sur le fichier emails.json, il est possible d'avoir de 0 à n adresse mail
  telephones: string[]; //clef etrangere sur le fichier telephones.json, il est possible d'avoir de 1 à n numero de telephone
}
