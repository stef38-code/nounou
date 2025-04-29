import { Email, Telephone } from './communication';
import { Sexe } from './enfant';
import { Adresse } from './adresse';

export interface Parent {
  nom: string;
  prenom: string;
  sexe: Sexe;
  adresse: Adresse;
  emails: Email[];
  telephones: Telephone[];
}


