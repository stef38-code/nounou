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

  constructor() {}
  /**
   * Récupère le signal contenant la liste des enfants.
   * @returns Signal contenant un tableau d'objets Enfant.
   */
  getEnfantsSignal() {
    return this.enfantsSignal;
  }

  /**
   * Génère une liste simulée de 20 enfants.
   * Utilise le service EnfantFakerService pour créer des données fictives d'enfants.
   * @returns Tableau d'objets Enfant contenant les données simulées.
   */
  private genererListeEnfants(): Enfant[] {
    const enfants: Enfant[] = [];
    for (let i = 0; i < 20; i++) {
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
