import express from 'express';
import cors from 'cors';
import compression from 'compression';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';

// Chemin absolu vers le fichier express.json
const configPath = path.resolve(__dirname, './express.json');
// Toujours pointer sur les fichiers dans `apps/express-api/src/data`
const DATA_DIR = path.resolve(__dirname, '../../../apps/express-api/src');

// Charger la configuration depuis express.json
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// Initialiser Express
const app = express();
app.use(express.json());
app.use(morgan('dev')); // Dev mode pour logs HTTP détaillés
if (config.middlewares.includes('cors')) app.use(cors());
if (config.middlewares.includes('compression')) app.use(compression());

// Fonction pour lire un fichier JSON
const readJSONFile = (filePath: string) => {
  try {
    const dataPath = path.resolve(DATA_DIR, filePath);
    console.log(`[LOG] Lecture du fichier : ${filePath}`); // Log pour la lecture
    return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  } catch (error) {
    console.error(`[ERREUR] Impossible de lire le fichier ${filePath}:`, error);
    return [];
  }
};

// Fonction pour écrire dans un fichier JSON
const writeJSONFile = (filePath: string, data: unknown) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Erreur d'écriture dans le fichier ${filePath}:`, error);
  }
};

// Générer automatiquement les routes selon express.json
Object.entries(config.routes).forEach(([key, methods]) => {
  Object.entries(methods).forEach(([method, routeDetails]: any) => {
    const { endpoint, dataFile } = routeDetails;

    if (method === 'get') {
      app.get(endpoint, (req, res) => {
        const data = readJSONFile(dataFile);
        if (data.length === 0) {
          console.log('[AVERTISSEMENT]  vide ou non trouvé.');
          return res.status(404).json({ message: 'Aucune donnée trouvée.' });
        }

        res.json(data);
      });
    }

    if (method === 'post') {
      app.post(endpoint, (req, res) => {
        const data = readJSONFile(dataFile);
        const newItem = { id: Date.now().toString(), ...req.body };
        data.push(newItem);
        writeJSONFile(dataFile, data);
        res.status(201).json(newItem);
      });
    }

    if (method === 'put') {
      app.put(`${endpoint}/:id`, (req, res) => {
        const data = readJSONFile(dataFile);
        const id = req.params.id;
        const updatedData = data.map((item: any) =>
          item.id === id ? { ...item, ...req.body } : item
        );
        writeJSONFile(dataFile, updatedData);
        res.json({ message: 'Modification réussie' });
      });
    }

    if (method === 'delete') {
      app.delete(`${endpoint}/:id`, (req, res) => {
        const data = readJSONFile(dataFile);
        const id = req.params.id;
        const remainingData = data.filter((item: any) => item.id !== id);
        writeJSONFile(dataFile, remainingData);
        res.json({ message: 'Suppression réussie' });
      });
    }
  });
});

// Démarrer le serveur
const PORT = config.port ?? 3000;
app.listen(PORT, () =>
  console.log(`Serveur Express démarré sur http://localhost:${PORT}`)
);
