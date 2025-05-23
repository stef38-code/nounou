import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { LoggerService } from './services/LoggerService';
import routeEnfants from './routes/EnfantsApiRouter';

const logger = new LoggerService();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(compression());
app.use(cors());

// Middleware pour intercepter et afficher toutes les requêtes
app.use((req, res, next) => {
  console.log('Requête reçue :');
  console.log(` - Méthode : ${req.method}`);
  console.log(` - URL : ${req.url}`);
  console.log(` - Originale URL : ${req.originalUrl}`);
  console.log(` - En-têtes :`, req.headers);
  console.log(` - Paramètres :`, req.params);
  console.log(` - Requête :`, req.query);

  // Capture le corps si nécessaire (uniquement pour POST/PUT)
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    req.on('data', (chunk) => {
      console.log(` - Corps de la requête : ${chunk.toString()}`);
    });
  }

  next(); // Passer à la route suivante
});
// Connecte les routes enfant sous le segment /api/enfants
app.use('/api/enfants', routeEnfants);

// Lancer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  logger.log(`Serveur démarré sur http://localhost:${PORT}`);
});
