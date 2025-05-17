import { computed, Injectable, Signal } from '@angular/core';
import { httpResource, HttpResourceRequest } from '@angular/common/http';
import { Enfant } from '../models/enfant';

@Injectable({
  providedIn: 'root',
})
export class EnfantService {
  private readonly apiUrl = 'http://localhost:3000/api/enfants';

  /**
   * Ressource réactive centrale pour récupérer tous les enfants via `GET`.
   */
  readonly enfantsResource = httpResource<Enfant[]>({
    method: 'GET',
    url: this.apiUrl,
  });

  /**
   * Signal réactif dérivé des données de la ressource.
   * Retourne un tableau vide si les données ne sont pas encore disponibles.
   */
  getEnfantsSignal(): Signal<Enfant[]> {
    return computed(() => this.enfantsResource?.value() ?? []);
  }

  /**
   * Signal indiquant si une opération est en cours (chargement).
   */
  get isLoading(): Signal<boolean> {
    return this.enfantsResource.isLoading;
  }

  /**
   * Méthode utilitaire pour gérer les ressources HTTP (POST/DELETE/PUT) et recharger les données.
   * @param request La requête HTTP à exécuter.
   */
  private async executeRequestAndReload(request: HttpResourceRequest) {
    try {
      const resource = httpResource<void>(request); // Exécute la requête
      await resource; // Attente jusqu'à completion
      this.enfantsResource.reload(); // Recharger si la requête réussit
    } catch (error) {
      console.error('Une erreur est survenue :', error);
      throw error; // Remonte l'erreur pour un traitement éventuel.
    }
  }

  /**
   * Ajouter un nouvel enfant.
   * @param enfant L'objet enfant à ajouter.
   */
  async ajouterEnfant(enfant: Enfant): Promise<void> {
    const request: HttpResourceRequest = {
      method: 'POST', // `POST` pour la création d'une nouvelle ressource
      url: this.apiUrl,
      body: enfant,
    };

    await this.executeRequestAndReload(request);
  }

  /**
   * Supprimer un enfant par son ID.
   * @param id L'identifiant de l'enfant à supprimer.
   */
  async supprimerEnfant(id: string): Promise<void> {
    try {
      // Préparation de la requête HTTP pour supprimer l'enfant
      const request: HttpResourceRequest = {
        method: 'DELETE', // Méthode HTTP DELETE
        url: `${this.apiUrl}/${id}`,
      };

      // Exécution de la requête et gestion de l'attente
      await this.executeRequestAndReload(request); // Appelle la méthode centralisée
    } catch (error) {
      console.error('Erreur lors de la suppression de l’enfant :', error);
      throw error;
    }
  }

  /**
   * Modifier un enfant existant.
   * @param enfant L'objet enfant avec les nouvelles données à appliquer.
   */
  async modifierEnfant(enfant: Enfant): Promise<void> {
    const request: HttpResourceRequest = {
      method: 'PUT', // `PUT` pour la mise à jour
      url: `${this.apiUrl}/${enfant.id}`, // ID inclus dans l'URL pour mettre à jour la ressource
      body: enfant,
    };

    await this.executeRequestAndReload(request);
  }
}
