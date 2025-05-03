import { Email, Telephone } from './communication';
import { Adresse } from './adresse';
import { RelationType, SexeType } from './ModelType';

/**
 * Représente une entité Parent avec des informations personnelles et de contact.
 *
 * @interface Parent
 * @property {string} nom - Le nom de famille du parent.
 * @property {string} prenom - Le prénom du parent.
 * @property {RelationType} relation - Le type de relation que le parent a avec une autre entité ou personne.
 * @property {SexeType} sexe - Le sexe du parent.
 * @property {Adresse} adresse - L'adresse physique du parent.
 * @property {Email[]} emails - Une liste des adresses électroniques associées au parent.
 * @property {Telephone[]} telephones - Une liste des numéros de téléphone associés au parent.
 */
export interface Parent {
  nom: string;
  prenom: string;
  relation: RelationType;
  sexe: SexeType;
  adresse: Adresse;
  emails: Email[];
  telephones: Telephone[];
}



