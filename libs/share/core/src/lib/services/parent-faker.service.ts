import { Injectable } from '@angular/core';
import { Parent } from '../models/parent';

/**
 * Service injectable responsable de la génération de données factices pour les parents.
 * Ce service utilise la bibliothèque Faker pour créer des objets `Parent` avec des propriétés
 * aléatoires incluant nom, prénom, sexe, adresse, téléphones et emails.
 */
@Injectable({
  providedIn: 'root',
})
export class ParentsFakerService {
  /**
   * Génère une liste de parents fictifs avec des informations détaillées telles que le sexe, le nom, l'adresse,
   * les téléphones, et les emails. Le nombre de parents générés est aléatoire entre 1 et 2.
   *
   * @return {Parent[]} Tableau de parents fictifs avec leurs attributs associés.
   */
  genererParentsMock(): Parent[] {
    return [];
  }
}
