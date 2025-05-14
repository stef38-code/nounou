import fs from 'fs';
import path from 'path';

// Chemin de base des données
const BASE_DATA_PATH = path.resolve(
  __dirname,
  '../../../apps/express-api/src/data'
);

/**
 * Lit un fichier JSON et retourne son contenu parsé.
 * @param fileName Nom du fichier JSON (chemin relatif à BASE_DATA_PATH)
 * @returns Le contenu du fichier JSON ou un tableau vide en cas d'erreur.
 */
export const readJSONFile = <T>(fileName: string): T[] => {
  try {
    const filePath = path.join(BASE_DATA_PATH, fileName);
    console.log(`[LOG] Lecture du fichier : ${filePath}`);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    console.error(`[ERREUR] Impossible de lire le fichier ${fileName}:`, error);
    return [];
  }
};

/**
 * Écrit des données dans un fichier JSON.
 * @param fileName Nom du fichier JSON (chemin relatif à BASE_DATA_PATH)
 * @param data Les données à écrire dans le fichier.
 */
export const writeJSONFile = (fileName: string, data: any): void => {
  try {
    const filePath = path.join(BASE_DATA_PATH, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`[LOG] Écriture réussie dans le fichier : ${filePath}`);
  } catch (error) {
    console.error(
      `[ERREUR] Impossible d'écrire dans le fichier ${fileName}:`,
      error
    );
  }
};
