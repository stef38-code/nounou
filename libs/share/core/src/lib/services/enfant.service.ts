import { inject, Injectable, signal } from '@angular/core';
import { Enfant } from '../models/enfant';
import { EnfantFakerService } from './enfants-faker.service';

@Injectable({
  providedIn: 'root',
})

/**
 * Service gérant les opérations liées aux enfants dans l'application.
 * Fournit des fonctionnalités pour la gestion et la récupération des données des enfants.
 */
export class EnfantService {
  enfantFakerService = inject(EnfantFakerService);

  /**
   * Signal contenant la liste des enfants.
   * Stocke et gère l'état de la liste des enfants de manière réactive.
   */
  private readonly enfantsSignal = signal<Enfant[]>(this.genererListeEnfants());

  /**
   * Récupère le signal contenant la liste des enfants.
   * @returns Signal contenant un tableau d'objets Enfant.
   */
  getEnfantsSignal() {
    return this.enfantsSignal;
  }

  /**
   * Génère une liste d'enfants aléatoires.
   * @param nombre Nombre d'enfants à générer. Par défaut à 20
   * @returns Tableau d'objets Enfant.
   */
  private genererListeEnfants(nombre = 20): Enfant[] {
    const enfants: Enfant[] = [];
    for (let i = 0; i < nombre; i++) {
      enfants.push(this.enfantFakerService.creerEnfantMock());
    }
    return enfants;
  }

  supprimer(id: string) {
    this.enfantsSignal.set(
      this.enfantsSignal().filter((enfant) => enfant.id !== id)
    );
  }
}
