import { TestBed } from '@angular/core/testing';
import { EnfantService } from './enfant.service';
import { Enfant } from '../models/enfant';

describe('EnfantService', () => {
  let service: EnfantService;

  // Avant chaque test, initialiser le service
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnfantService],
    });
    service = TestBed.inject(EnfantService);
  });

  // Vérifier que le service est créé avec succès
  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });

  // Vérifier que la liste générée contient exactement 10 enfants
  it('devrait générer une liste de 10 enfants', () => {
    const enfantsSignal = service.getEnfantsSignal();
    const enfants: Enfant[] = enfantsSignal();

    expect(enfants).toBeTruthy();
    expect(enfants.length).toBe(10);
  });

  // Vérifier que tous les enfants ont un âge de moins ou égal à 3 ans
  it('les enfants devraient avoir un âge de 3 ans ou moins', () => {
    const enfants: Enfant[] = service.getEnfantsSignal()();
    const dateActuelle = new Date();

    enfants.forEach((enfant) => {
      const ageEnMs = dateActuelle.getTime() - enfant.dateNaissance.getTime();
      const ageEnAnnees = ageEnMs / (1000 * 60 * 60 * 24 * 365); // Conversion en années

      expect(ageEnAnnees).toBeLessThanOrEqual(3);
    });
  });

  // Vérifier que chaque enfant a un nom, un prénom et un sexe définis
  it('chaque enfant devrait avoir un nom, prénom et sexe', () => {
    const enfants: Enfant[] = service.getEnfantsSignal()();

    enfants.forEach((enfant) => {
      expect(enfant.nom).toBeTruthy(); // Le nom ne doit pas être vide
      expect(enfant.prenom).toBeTruthy(); // Le prénom ne doit pas être vide
      expect(enfant.sexe).toMatch(/Homme|Femme/); // Le sexe doit être "Homme" ou "Femme"
    });
  });

  // Vérifier que la propriété "dateNaissance" est une date valide
  it('chaque enfant devrait avoir une date de naissance valide', () => {
    const enfants: Enfant[] = service.getEnfantsSignal()();

    enfants.forEach((enfant) => {
      expect(enfant.dateNaissance).toBeInstanceOf(Date); // La date doit être un objet Date
      expect(isNaN(enfant.dateNaissance.getTime())).toBe(false); // La date ne doit pas être invalide
    });
  });

  // Vérifier que la propriété "parents" est initialisée (même si elle est vide)
  it('chaque enfant devrait avoir une propriété "parents" initialisée', () => {
    const enfants: Enfant[] = service.getEnfantsSignal()();

    enfants.forEach((enfant) => {
      expect(enfant.parents).toBeTruthy(); // La propriété parents doit exister
      expect(Array.isArray(enfant.parents)).toBe(true); // Les parents doivent être un tableau
    });
  });
});
