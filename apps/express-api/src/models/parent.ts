import { Email, Telephone } from './communication';
import { Adresse } from './adresse';
import { RelationType, SexeType } from './ModelType';

/**
 * Représente une entité Parent avec des informations personnelles et de contact.
 *
 * @interface Parent
 * @property {string} id - L'identifiant unique du parent.
 * @property {string} nom - Le nom de famille du parent.
 * @property {string} prenom - Le prénom du parent.
 * @property {RelationType} relation - Le type de relation que le parent a avec une autre entité ou personne.
 * @property {SexeType} sexe - Le sexe du parent.
 * @property {Adresse} adresse - L'adresse physique du parent.
 * @property {Email[]} emails - Une liste des adresses électroniques associées au parent.
 * @property {Telephone[]} telephones - Une liste des numéros de téléphone associés au parent.
 */
export interface Parent {
  id: string;
  nom: string;
  prenom: string;
  relation: RelationType;
  sexe: SexeType;
  adresse: Adresse; //clef etrangere sur le fichier adresses.json, 1 seule est unique adresse (obligatoire)
  emails: Email[]; //clef etrangere sur le fichier emails.json, il est possible d'avoir de 0 à n adresse mail
  telephones: Telephone[]; //clef etrangere sur le fichier telephones.json, il est possible d'avoir de 1 à n numero de telephone
}
