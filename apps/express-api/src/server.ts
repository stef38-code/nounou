import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { readJSONFile, writeJSONFile } from './fileJsonOperations';
import { Parent } from './models/parent'; // Import des fonctions utilitaires
import { Enfant } from './models/enfant'; // Import des fonctions utilitaires

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(compression());

// Exemple de gestion de la route GET /api/enfants
app.get('/api/enfants', (req, res) => {
  console.log('[LOG] Requête GET /api/enfants reçue');

  // Utiliser les fonctions importées
  const enfants = readJSONFile<Enfant>('enfants.json');
  const parents = readJSONFile<Parent>('parents.json');

  const enfantsAvecParents = enfants.map((enfant: Enfant) => {
    const parentsAssocies = enfant.parents.map((parentId: string) => {
      return parents.find(
        (parent: Parent) => parent.id === parentId.toString()
      );
    });

    return {
      ...enfant,
      parents: parentsAssocies.filter(Boolean),
    };
  });

  if (enfantsAvecParents.length === 0) {
    return res.status(404).json({ message: 'Aucun enfant trouvé.' });
  }

  res.json(enfantsAvecParents);
});

// Exemple de gestion de la route POST /api/enfants
app.post('/api/enfants', (req, res) => {
  console.log('[LOG] Requête POST /api/enfants reçue');

  const enfants = readJSONFile('enfants.json');
  const newEnfant = { id: Date.now().toString(), ...req.body };
  enfants.push(newEnfant);

  writeJSONFile('enfants.json', enfants); // Utilisation de la fonction écriture
  res.status(201).json(newEnfant);
});

// Lancer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
