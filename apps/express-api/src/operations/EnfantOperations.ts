import { EnfantJsonEntity } from '../models/enfantJsonEntity';
import { rechercherParents } from './ParentOperations';
import { readJSONFile } from './fileJsonOperations';
import { Enfant, Parent } from '@core';

/**
 * Génère une liste d'enfants enrichie avec des informations sur leurs parents.
 *
 * @returns {Enfant[]} - Liste des objets `Enfant` contenant les informations de base,
 * ainsi que les détails de leurs parents associés.
 *
 * @throws {Error} - Lance une erreur si le fichier des enfants JSON ne peut pas être lu.
 */
export function listesEnfantsAvecParent(): Enfant[] {
  // Lire les données JSON des enfants
  const enfantsJsonEntity: EnfantJsonEntity[] =
    readJSONFile<EnfantJsonEntity>('enfants.json');

  /**
   * Parcourir la liste des enfants et enrichir chaque entrée avec les informations
   * associées à leurs parents.
   */
  return enfantsJsonEntity.map((enfant: EnfantJsonEntity): Enfant => {
    // Recherche des parents associés à l'enfant
    const parentsAssocies: Parent[] = rechercherParents(enfant.parents);
    const familleAssocies: Parent[] = rechercherParents(enfant.famille);

    // Construire l'objet enrichi pour l'enfant
    return {
      id: enfant.id, // Identifiant unique de l'enfant
      nom: enfant.nom, // Nom de famille de l'enfant
      prenom: enfant.prenom, // Prénom de l'enfant
      dateNaissance: enfant.dateNaissance, // Date de naissance de l'enfant
      sexe: enfant.sexe, // Sexe de l'enfant (e.g., Masculin/Féminin)

      // Informations supplémentaires enrichies
      parents: parentsAssocies, // Liste des parents associés
      famille: familleAssocies, // Famille
      fratrie: [], // Fratrie (champ vide par défaut dans cette version)
    } as Enfant;
  });
}

/**
 * Recherche et retourne les informations des membres de la fratrie à partir de leurs identifiants.
 *
 * @param {string[]} fraterieIds - Tableau des identifiants uniques des membres de la fratrie à rechercher.
 * @returns {Enfant[]} - Liste des objets `Enfant` correspondant aux identifiants de la fratrie,
 * avec les informations de base mais sans les détails des parents, famille ou fratrie.
 *
 * @throws {Error} - Lance une erreur si le fichier des enfants JSON ne peut pas être lu.
 */
export function rechercherFratrie(fraterieIds: string[]): Enfant[] {
  if (fraterieIds === undefined || fraterieIds.length === 0) {
    return [];
  }
  const enfantsJsonEntity: EnfantJsonEntity[] =
    readJSONFile<EnfantJsonEntity>('enfants.json');
  return enfantsJsonEntity
    .filter((enfant: EnfantJsonEntity) => fraterieIds.includes(enfant.id))
    .map((enfant: EnfantJsonEntity) => ({
      id: enfant.id, // Identifiant unique de l'enfant
      nom: enfant.nom, // Nom de famille de l'enfant
      prenom: enfant.prenom, // Prénom de l'enfant
      dateNaissance: enfant.dateNaissance, // Date de naissance de l'enfant
      sexe: enfant.sexe, // Sexe de l'enfant (e.g., Masculin/Féminin)
      parents: [], // Liste des parents associés
      famille: [], // Famille
      fratrie: [], // Fratrie (champ vide par défaut dans cette version)
    }));
}
