import { computed, Injectable, signal, Signal } from '@angular/core';
import { httpResource, HttpResourceRef, HttpResourceRequest } from '@angular/common/http';
import { Enfant } from '../models/enfant';

@Injectable({
  providedIn: 'root',
})
export class EnfantService {
  private readonly apiUrl = 'http://localhost:3000/api/enfants';
  supprimerIdEnfant = signal<string | null>(null);

  /**
   * Ressource réactive centrale pour récupérer tous les enfants via `GET`.
   */
  readonly enfantsResource: HttpResourceRef<Enfant[] | undefined>;
  readonly suprimerEnfant: HttpResourceRef<void | undefined>;

  constructor() {
    this.enfantsResource = httpResource<Enfant[]>({
      method: 'GET',
      url: this.apiUrl,
    });
    this.suprimerEnfant = httpResource<void>(() => {
      const id = this.supprimerIdEnfant();
      if (!id) {
        return undefined;
      }
      const ParamRequest: { url: string; method: string; params: Record<string, string>; defaultValue: string | null } =
        {
          url: `${this.apiUrl}`,
          method: 'DELETE',
          params: {
            id: id,
          } as Record<string, string>,
          defaultValue: null,
        };
      return ParamRequest;
    });
  }
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
   * @param requete La requête HTTP à exécuter.
   */
  private executeRequestAndReload(requete: HttpResourceRequest) {
    try {
      const resource = httpResource(requete);

      resource.value(); // Attente jusqu'à completion
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
  ajouterEnfant(enfant: Enfant): void {
    const request: HttpResourceRequest = {
      method: 'POST', // `POST` pour la création d'une nouvelle ressource
      url: this.apiUrl,
      body: enfant,
    };

    this.executeRequestAndReload(request);
  }

  /**
   * Supprimer un enfant par son ID.
   * @param id L'identifiant de l'enfant à supprimer.
   */
  supprimerEnfant(id: string): void {
    this.supprimerIdEnfant.set(id);
    const resource = this.suprimerEnfant.value;
    console.log('ressource', resource);
    if (resource !== undefined) {
      this.enfantsResource.reload();
    }
  }
  /**
   * Modifier un enfant existant.
   * @param enfant L'objet enfant avec les nouvelles données à appliquer.
   */
  modifierEnfant(enfant: Enfant): void {
    const request: HttpResourceRequest = {
      method: 'PUT', // `PUT` pour la mise à jour
      url: `${this.apiUrl}/${enfant.id}`, // ID inclus dans l'URL pour mettre à jour la ressource
      body: enfant,
    };

    this.executeRequestAndReload(request);
  }
}
