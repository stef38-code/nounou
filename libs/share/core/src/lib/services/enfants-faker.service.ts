import { inject, Injectable } from '@angular/core';
import { fakerFR as faker } from '@faker-js/faker';
import { Enfant } from '../models/enfant';
import { Parent } from '../models/parent';
import { SexeType } from '../models/ModelType';
import { ParentsFakerService } from './parent-faker.service';
import { v7 as uuidv7 } from 'uuid';

/**
 * Service Angular responsable de la génération de données fictives pour des objets `Enfant`.
 * Ce service utilise `ParentsFakerService` pour générer une liste de parents associée
 * à chaque enfant simulé.
 */
@Injectable({
  providedIn: 'root',
})
export class EnfantFakerService {
  parentFakerService = inject(ParentsFakerService);

  /**
   * Crée un objet enfant simulé.
   *
   * @return {Enfant} L'objet enfant mock généré.
   */
  creerEnfantMock(): Enfant {
    return this.genererEnfantsMock();
  }

  /**
   * Génère des données fictives pour un enfant, incluant son nom, prénom, date de naissance,
   * sexe, et une liste de parents.
   *
   * @return {Enfant} Les informations simulées d'un enfant.
   */
  private genererEnfantsMock(): Enfant {
    const id: string = uuidv7().toString();
    // Générer le sexe
    const sexe: SexeType = Math.random() > 0.5 ? 'Femme' : 'Homme';
    // Définir les noms et prénoms
    const prenom =
      sexe === 'Femme'
        ? faker.person.firstName('female')
        : faker.person.firstName('male');
    const nom = faker.person.lastName();
    // Générer une date de naissance aléatoire (enfant de ≤ 3 ans)
    const dateNaissance = faker.date.between({
      from: '2020-01-01',
      to: new Date().toISOString(),
    });

    const parents: Parent[] = this.parentFakerService.genererParentsMock();

    return {
      id,
      nom,
      prenom,
      dateNaissance,
      sexe,
      parents,
    } as Enfant;
  }
}
