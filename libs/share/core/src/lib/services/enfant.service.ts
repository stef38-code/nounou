import { Injectable, signal } from '@angular/core';
import { Enfant, Sexe } from '@core';

@Injectable({
  providedIn: 'root',
})
export class EnfantService {
  // Signal contenant la liste des enfants
  private readonly enfantsSignal = signal<Enfant[]>(this.genererListeEnfants());

  // Méthode pour récupérer la liste des enfants sous forme de signal
  getEnfantsSignal() {
    return this.enfantsSignal;
  }

  // Générer une liste mock de 10 enfants âgés de moins ou égal à 3 ans
  private genererListeEnfants(): Enfant[] {
    const enfants: Enfant[] = [];
    for (let i = 0; i < 10; i++) {
      enfants.push(this.creerEnfantMock(i));
    }
    return enfants;
  }

  // Création d'un enfant mock
  private creerEnfantMock(index: number): Enfant {
    const noms = ['Dupont', 'Martin', 'Durand', 'Lefèvre', 'Morel'];
    const prenomsFilles = ['Sophie', 'Emma', 'Julie', 'Anna', 'Clara'];
    const prenomsGarcons = ['Lucas', 'Hugo', 'Ethan', 'Leo', 'Maxime'];

    const sexe: Sexe = Math.random() > 0.5 ? 'Femme' : 'Homme';
    const nom = noms[index % noms.length];
    const prenom =
      sexe === 'Femme'
        ? prenomsFilles[index % prenomsFilles.length]
        : prenomsGarcons[index % prenomsGarcons.length];

    const dateActuelle = new Date();
    const ageEnJours = Math.floor(Math.random() * (3 * 365)); // Age random (< 3 ans)
    const dateNaissance = new Date(
      dateActuelle.setDate(dateActuelle.getDate() - ageEnJours)
    );

    return {
      nom,
      prenom,
      dateNaissance,
      sexe,
      parents: [], // Vous pouvez également générer des parents mock si nécessaire
    };
  }
}
