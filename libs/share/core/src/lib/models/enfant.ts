import { Parent } from './parent';

export interface Enfant {
  nom: string;
  prenom: string;
  dateNaissance: Date;
  sexe: Sexe;
  parents: Parent[];
}

export type Sexe = 'Homme' | 'Femme';
