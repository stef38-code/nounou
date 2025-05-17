import express, { NextFunction, Request, Response, Router } from 'express';
import { query, ValidationChain, validationResult } from 'express-validator';
import { listesEnfantsAvecParent } from '../operations/EnfantOperations';
import { readJSONFile, writeJSONFile } from '../operations/fileJsonOperations';
import { Enfant } from '@core';
import { LoggerService } from '../services/LoggerService';
import { v7 as uuidv7 } from 'uuid';

const routeEnfants: Router = express.Router();
const logger = new LoggerService();

/**
 * Middleware pour vérifier l'existence d'un enfant.
 * @param id Identifiant de l'enfant recherché
 * @param enfants Liste des enfants
 * @returns Index de l'enfant s'il existe, sinon `null`
 */
const verifyEnfantExists = (id: string, enfants: Enfant[]): number | null => {
  const enfantIndex = enfants.findIndex((e) => e.id === id);
  return enfantIndex !== -1 ? enfantIndex : null;
};

/**
 * @swagger
 * /api/enfants:
 *   get:
 *     summary: Récupère la liste des enfants avec leurs parents.
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès.
 *       404:
 *         description: Aucun enfant trouvé.
 */
routeEnfants.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  logger.log('Requête GET /api/enfants reçue');

  const enfantsAvecParents = listesEnfantsAvecParent();

  if (enfantsAvecParents.length === 0) {
    logger.warn('Aucun enfant trouvé.');
    res.status(404).json({ message: 'Aucun enfant trouvé.' });
    return;
  }

  logger.debug(`Nombre d'enfants avec parents trouvés : ${enfantsAvecParents.length}`);

  res.status(200).json(enfantsAvecParents);
});

/**
 * @swagger
 * /api/enfants/search:
 *   get:
 *     summary: Rechercher des enfants par identifiant, nom ou prénom.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: Rechercher un enfant par son id.
 *       - in: query
 *         name: nom
 *         schema:
 *           type: string
 *         required: false
 *         description: Filtrer les enfants par nom.
 *       - in: query
 *         name: prenom
 *         schema:
 *           type: string
 *         required: false
 *         description: Filtrer les enfants par prénom.
 *     responses:
 *       200:
 *         description: Enfants correspondants aux critères.
 *       404:
 *         description: Aucun résultat trouvé.
 */
const validateQuery = [
  query('id').isString().notEmpty().withMessage("L'identifiant (id) est requis."),
  query('nom').optional().isString().withMessage('Le nom doit être un texte.'),
  query('prenom').optional().isString().withMessage('Le prénom doit être un texte.'),
];

// Middleware pour traiter les résultats de validation
const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

routeEnfants.get(
  '/search',
  [...validateQuery, handleValidationErrors],
  (req: express.Request, res: express.Response) => {
    logger.log('Requête GET /api/enfants/search reçue');

    const { id, nom, prenom } = req.query;

    const enfants = readJSONFile<Enfant>('enfants.json');

    const filteredEnfants = enfants.filter((enfant) => {
      const matchesId = id ? enfant.id === id : true;
      const matchesNom = nom && typeof nom === 'string' ? enfant.nom.toLowerCase().includes(nom.toLowerCase()) : true;
      const matchesPrenom =
        prenom && typeof prenom === 'string' ? enfant.prenom.toLowerCase().includes(prenom.toLowerCase()) : true;

      return matchesId && matchesNom && matchesPrenom;
    });

    if (filteredEnfants.length === 0) {
      logger.warn('Aucun résultat trouvé.');
      res.status(404).json({ message: 'Aucun résultat trouvé.' });
    }

    logger.debug(`Résultats trouvés : ${filteredEnfants.length}`);
    res.status(200).json(filteredEnfants);
  }
);

/**
 * @swagger
 * /api/enfants:
 *   post:
 *     summary: Ajouter un nouvel enfant.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               age:
 *                 type: number
 *               parent:
 *                 type: string
 *     responses:
 *       201:
 *         description: Nouvel enfant créé avec succès.
 */
routeEnfants.post('/', (req: Request, res: Response) => {
  logger.debug('Requête POST /api/enfants reçue');

  const enfants = readJSONFile<Enfant>('enfants.json');
  const newEnfant = { id: uuidv7(), ...req.body } as Enfant;

  enfants.push(newEnfant);
  writeJSONFile<Enfant>('enfants.json', enfants);

  res.status(201).json(newEnfant);
});

/**
 * @swagger
 * /api/enfants/{id}:
 *   delete:
 *     summary: Supprimer un enfant par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'identifiant de l'enfant à supprimer.
 *     responses:
 *       200:
 *         description: Enfant supprimé avec succès.
 *       404:
 *         description: Enfant non trouvé.
 */
const validateQueryDelete: ValidationChain[] = [
  query('id').isString().notEmpty().withMessage("L'identifiant (id) est requis."),
];

routeEnfants.delete(
  '/',
  [...validateQueryDelete, handleValidationErrors],
  (req: express.Request, res: express.Response) => {
    const id = req.query.id as string;
    logger.debug('---------------------------------------------------------------');
    logger.debug(`[DELETE] /api/enfants/${id} reçue`);
    logger.debug(`originalUrl: ${req.originalUrl}`);
    logger.debug('---------------------------------------------------------------');

    const enfants = readJSONFile<Enfant>('enfants.json');
    const enfantIndex = verifyEnfantExists(id, enfants);

    if (enfantIndex === null) {
      logger.warn(`Enfant avec l'id ${id} introuvable.`);
      res.status(404).json({ message: `Enfant avec l'id ${id} introuvable.` });
      return;
    }

    //const deletedEnfant = enfants.splice(enfantIndex, 1);
    //writeJSONFile<Enfant>('enfants.json', enfants);

    logger.log(`Enfant avec l'id ${id} supprimé.`);
    res.status(200).json({ message: `Enfant supprimé avec succès.`, enfant: id });
  }
);

/**
 * @swagger
 * /api/enfants/{id}:
 *   put:
 *     summary: Mettre à jour un enfant par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de l'enfant.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               age:
 *                 type: number
 *               parent:
 *                 type: string
 *     responses:
 *       200:
 *         description: Enfant mis à jour avec succès.
 *       404:
 *         description: Enfant introuvable.
 */
routeEnfants.put('/:id', async (req: express.Request, res: express.Response): Promise<void> => {
  const { id } = req.params;
  const updatedData = req.body;
  if (!id || !updatedData) {
    res.status(400).json({ error: 'Données invalides' });
    return;
  }

  logger.log(`[LOG] Requête PUT /api/enfants/${id} reçue`);

  const enfants = readJSONFile<Enfant>('enfants.json');
  const enfantIndex = verifyEnfantExists(id, enfants);

  if (enfantIndex === null) {
    logger.warn(`Enfant avec l'id ${id} introuvable.`);
    res.status(404).json({ message: `Enfant avec l'id ${id} introuvable.` });
    return;
  }

  enfants[enfantIndex] = { ...enfants[enfantIndex], ...updatedData };
  writeJSONFile<Enfant>('enfants.json', enfants);

  logger.log(`Enfant avec l'id ${id} mis à jour.`);
  res.status(200).json({
    message: 'Enfant mis à jour avec succès',
    enfant: enfants[enfantIndex],
  });
});

export default routeEnfants;
