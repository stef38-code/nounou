import { Injectable } from '@angular/core';
import { fakerFR as faker } from '@faker-js/faker';
import { Parent } from '../models/parent';
import { Adresse } from '../models/adresse';
import { Email, Telephone } from '../models/communication';
import { RelationType, SexeType } from '../models/ModelType';

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
    const parents: Parent[] = [];
    const nbParents: number = Math.random() > 0.5 ? 1 : 2;
    for (let i = 0; i < nbParents; i++) {
      // Générer le sexe
      const sexe: SexeType = Math.random() > 0.5 ? 'Femme' : 'Homme';

      // Définir les noms et prénoms
      const prenom =
        sexe === 'Femme'
          ? faker.person.firstName('female')
          : faker.person.firstName('male');
      const relation: RelationType = sexe === 'Femme' ? 'Mère' : 'Père';
      const nom = faker.person.lastName();
      const adresse: Adresse = {
        numero: faker.location.buildingNumber(),
        voie: faker.location.streetAddress(),
        ville: faker.location.city(),
        codePostal: faker.location.zipCode(), // Utilise un format français
      };
      // Générer téléphones (fixe et mobile)
      const telephones: Telephone[] = [
        {
          telephone: faker.phone.number({ style: 'human' }), // Numéro fixe au format français
          type: 'personnel', // Numéro mobile au format français
        },
        {
          telephone: faker.phone.number({ style: 'human' }), // Numéro fixe au format français
          type: 'professionnel',
        },
      ];
      // Générer emails (personnel et professionnel)
      const emails: Email[] = [
        {
          email: faker.internet.email({ firstName: prenom, lastName: nom }),
          type: 'personnel',
        },
        {
          email: faker.internet.email({
            firstName: prenom,
            lastName: nom,
            provider: 'prof.fakerjs.fr',
          }),
          type: 'professionnel',
        },
      ];
      parents.push({
        nom: nom,
        prenom: prenom,
        relation: relation,
        sexe: sexe,
        adresse: adresse,
        emails: emails,
        telephones: telephones,
      });
    }
    return parents;
  }
}
