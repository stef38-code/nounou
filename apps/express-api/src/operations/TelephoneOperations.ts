import { Telephone } from '@core';
import { readJSONFile } from './fileJsonOperations';
import { TelephoneJsonEntity } from '../models/communicationJsonEntity';

/**
 * Recherche et retourne les téléphones correspondant aux identifiants fournis.
 *
 * @param idTelephone - Tableau d'identifiants de téléphones à rechercher
 * @returns Tableau d'objets Telephone correspondant aux identifiants fournis
 *
 * @description
 * Cette fonction :
 * - Lit les données depuis le fichier 'telephones.json'
 * - Filtre les téléphones pour ne garder que ceux dont l'ID est dans le tableau fourni
 * - Transforme chaque entrée en objet Telephone avec id, numéro et type
 */
export function rechercherTelephone(idTelephone: string[]): Telephone[] {
  const telephoneJsonEntity =
    readJSONFile<TelephoneJsonEntity>('telephones.json');
  return telephoneJsonEntity
    .filter((telephoneJSonEntity: TelephoneJsonEntity) =>
      idTelephone.includes(telephoneJSonEntity.id)
    ) // Garder seulement les telephones correspondants
    .map((telephoneJSonEntity: TelephoneJsonEntity) => ({
      id: telephoneJSonEntity.id,
      telephone: telephoneJSonEntity.telephone,
      type: telephoneJSonEntity.type,
    }));
}
