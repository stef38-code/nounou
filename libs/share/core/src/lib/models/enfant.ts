import { Parent } from './parent';
import { SexeType } from './ModelType';


/**
 * Représente un enfant avec des informations personnelles, ses parents, et d'autres attributs pertinents.
 *
 * @interface Enfant
 * @property {string} id - L'identifiant unique de l'enfant.
 * @property {string} nom - Le nom de famille de l'enfant.
 * @property {string} prenom - Le prénom de l'enfant.
 * @property {Date} dateNaissance - La date de naissance de l'enfant.
 * @property {SexeType} sexe - Le sexe de l'enfant, représenté par une valeur de type SexeType.
 * @property {Parent[]} parents - La liste des parents de l'enfant.
 */
export interface Enfant {
  id: string;
  nom: string;
  prenom: string;
  dateNaissance: Date;
  sexe: SexeType;
  parents: Parent[];
}


