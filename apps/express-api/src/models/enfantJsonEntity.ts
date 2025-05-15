import { SexeType } from './ModelType';

export interface EnfantJsonEntity {
  id: string;
  nom: string;
  prenom: string;
  dateNaissance: Date;
  sexe: SexeType;
  parents: string[]; //clef etrangere sur le fichier parents.json, 1 à 2 parents (obligatoire)
  famille: string[]; //clef etrangere sur le fichier parents.json, 0 à n avec  SexeType != 'Mère' && 'Père'
  fratrie: string[]; //clef etrangere sur le fichier enfants.json, 0 à n
}
