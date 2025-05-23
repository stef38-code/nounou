import { ParentJsonEntity } from '../models/parentJsonEntity';
import { readJSONFile } from './fileJsonOperations';
import { rechercherAdresse } from './AdresseOperations';
import { Adresse, Email, Parent, Telephone } from '@core';
import { rechercherEmail } from './EmailOperations';
import { rechercherTelephone } from './TelephoneOperations';
import { LoggerService } from '../services/LoggerService';

const logger = new LoggerService();
/**
 * Recherche une liste de parents à partir de leurs identifiants, et enrichit leurs données
 * avec leurs adresses, emails et numéros de téléphone.
 *
 * @param {string[]} idParents - Tableau contenant les identifiants des parents à rechercher.
 * @returns {Parent[]} - Liste des objets `Parent` enrichis avec leurs adresses, emails, et téléphones.
 */
export const rechercherParents = (idParents: string[]): Parent[] => {
  if (idParents === undefined || idParents.length === 0) {
    logger.warn('Aucun identifiant de parent fourni');
    return [];
  }
  /**
   * Lire le fichier JSON contenant les informations de tous les parents.
   * @type {ParentJsonEntity[]}
   */
  const parents: ParentJsonEntity[] =
    readJSONFile<ParentJsonEntity>('parents.json');

  /**
   * Rechercher les parents dont les ID correspondent à ceux spécifiés dans `idParents`.
   * Les données sont enrichies pour les parents associés.
   *
   * @type {(ParentJsonEntity | undefined)[]}
   */
  const parentsAssocies: (ParentJsonEntity | undefined)[] =
    filtrerParentsParIds(idParents, parents);
  /**
   * Construire la liste finale des parents enrichis avec leurs adresses, emails et téléphones.
   */
  return assembleInformationParent(parentsAssocies);
};

/**
 * Assemble et enrichit les informations pour une liste de parents.
 * Cette fonction prend les données brutes des parents et les enrichit avec leurs adresses,
 * emails et numéros de téléphone correspondants.
 *
 * @param {ParentJsonEntity[]} parentsAssocies - Tableau d'entités parents à enrichir
 * @returns {Parent[]} Tableau d'objets Parent enrichis avec leurs adresses, emails et téléphones
 * @throws {Error} Lance une erreur si un parent spécifié n'est pas trouvé
 *
 * @example
 * const parentsEnrichis = assembleInformationParent(parentsDeBase);
 * // Retourne: [{id: "1", nom: "Dupont", prenom: "Jean", adresse: {...}, emails: [...], telephones: [...]}]
 */
function assembleInformationParent(
  parentsAssocies: (ParentJsonEntity | undefined)[]
) {
  return parentsAssocies.map((parent) => {
    if (!parent) {
      logger.error(
        'parentID ne correspond à aucun parent dans le fichier JSON'
      );
      throw new Error('Parent introuvable dans la liste associée.');
    }
    if (!parent) {
      // Gestion des cas où
      logger.error(
        'parentID ne correspond à aucun parent dans le fichier JSON'
      );
      throw new Error(
        'parentID ne correspond à aucun parent dans le fichier JSON'
      );
    }

    // Recherche et enrichissement des données correspondantes
    const adresseAssocies: Adresse = rechercherAdresse(parent.adressePostal);
    const emailAssocies: Email[] = rechercherEmail(parent.emails);
    const telephoneAssocies: Telephone[] = rechercherTelephone(
      parent.telephones
    );

    // Construction de l'objet `Parent` enrichi
    return {
      id: parent.id,
      nom: parent.nom,
      prenom: parent.prenom,
      adresse: adresseAssocies,
      emails: emailAssocies,
      telephones: telephoneAssocies,
    } as Parent;
  });
}

/**
 * Filtre une liste de parents en fonction d'un tableau d'identifiants fourni.
 * Pour chaque identifiant dans le tableau idParents, recherche le parent correspondant
 * dans la liste complète des parents.
 *
 * @param {string[]} idParents - Tableau des identifiants des parents à rechercher
 * @param {ParentJsonEntity[]} parents - Liste complète des entités parents disponibles
 * @returns {(ParentJsonEntity | undefined)[]} Tableau contenant les entités parents correspondant aux identifiants.
 *                                            Peut contenir undefined si un parent n'est pas trouvé.
 * @example
 * const idsRecherches = ["1", "2"];
 * const tousLesParents = [{id: "1", nom: "Dupont"}, {id: "2", nom: "Martin"}];
 * const parentsFilters = filtrerParentsParIds(idsRecherches, tousLesParents);
 * // Retourne: [{id: "1", nom: "Dupont"}, {id: "2", nom: "Martin"}]
 */
function filtrerParentsParIds(
  idParents: string[],
  parents: ParentJsonEntity[]
) {
  return idParents.map((parentId: string) => {
    return parents.find((parent: ParentJsonEntity) => parent.id === parentId);
  });
}
