import { Email } from '@core';
import { readJSONFile } from './fileJsonOperations';
import { EmailJsonEntity } from '../models/communicationJsonEntity';

/**
 * Recherche une liste d'emails correspondant à une liste d'identifiants spécifiés.
 *
 * @param {string[]} idEmail - Tableau contenant les identifiants uniques des emails à rechercher.
 * @returns {Email[]} - Liste des objets `Email` correspondant aux identifiants fournis.
 */
export function rechercherEmail(idEmail: string[]): Email[] {
  if (idEmail.length === 0) {
    return [];
  }
  // Lire toutes les entrées d'emails à partir du fichier JSON
  const emailsJsonEntity: EmailJsonEntity[] =
    readJSONFile<EmailJsonEntity>('emails.json');

  /**
   * Filtrer les emails pour ne garder que ceux dont l'identifiant est présent dans le tableau `idEmail`,
   * puis transformer les données en instance de `Email` pour produire la liste des résultats trouvés.
   */
  return emailsJsonEntity
    .filter((email: EmailJsonEntity) => idEmail.includes(email.id)) // Filtrer les emails pertinents
    .map((email: EmailJsonEntity) => ({
      id: email.id, // Identifiant de l'email
      email: email.email, // Adresse email
      type: email.type, // Type de la communication (ex. Personnel, Professionnel)
    }));
}
