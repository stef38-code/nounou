import { AdresseJsonEntity } from '../models/adresseJsonEntity';
import { readJSONFile } from './fileJsonOperations';
import { Adresse } from '@core';

/**
 * Recherche une adresse par son identifiant à partir d'un fichier JSON.
 *
 * @param {string} idAdresse - Identifiant unique de l'adresse à rechercher.
 * @returns {Adresse} - L'objet Adresse correspondant à l'identifiant spécifié.
 * @throws {Error} - Si l'adresse avec l'ID spécifié n'est pas trouvée.
 */
export const rechercherAdresse = (idAdresse: string): Adresse => {
  // Lire toutes les adresses à partir du fichier JSON
  const adresses: AdresseJsonEntity[] =
    readJSONFile<AdresseJsonEntity>('adresses.json');

  // Rechercher l'adresse correspondante par son identifiant
  const adresseTrouvee = adresses.find((adresse) => adresse.id === idAdresse);

  // Si aucune adresse n'est trouvée, lancer une erreur
  if (!adresseTrouvee) {
    throw new Error(`Aucune adresse trouvée avec l'ID "${idAdresse}".`);
  }

  // Retourner un objet Adresse formaté
  return {
    id: adresseTrouvee.id,
    numero: adresseTrouvee.numero,
    voie: adresseTrouvee.voie,
    complement: adresseTrouvee.complement || null, // Gérer le cas où le complément est absent
    codePostal: adresseTrouvee.codePostal,
    ville: adresseTrouvee.ville,
  } as Adresse;
};
