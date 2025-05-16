import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { readJSONFile, writeJSONFile } from './operations/fileJsonOperations'; // Import des fonctions utilitaires
import { listesEnfantsAvecParent } from './operations/EnfantOperations';
import { Enfant } from '@core';
import { LoggerService } from './services/LoggerService';

const logger = new LoggerService();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(compression());

// Exemple de gestion de la route GET /api/enfants
app.get('/api/enfants', (req, res) => {
  logger.log('Requête GET /api/enfants reçue');

  const enfantsAvecParents = listesEnfantsAvecParent();

  if (enfantsAvecParents.length === 0) {
    logger.warn('Aucun enfant trouvé.');
    return res.status(404).json({ message: 'Aucun enfant trouvé.' });
  }
  logger.debug(
    `Nombre d'enfants avec parents trouvés : ${enfantsAvecParents.length}`
  );
  res.json(enfantsAvecParents);
});

// Exemple de gestion de la route POST /api/enfants
app.post('/api/enfants', (req, res) => {
  console.log('[LOG] Requête POST /api/enfants reçue');

  const enfants = readJSONFile<Enfant>('enfants.json');
  const newEnfant = { id: Date.now().toString(), ...req.body } as Enfant;
  enfants.push(newEnfant);

  writeJSONFile<Enfant>('enfants.json', enfants); // Utilisation de la fonction écriture
  res.status(201).json(newEnfant);
});

// Lancer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  logger.log(`Serveur démarré sur http://localhost:${PORT}`);
});
