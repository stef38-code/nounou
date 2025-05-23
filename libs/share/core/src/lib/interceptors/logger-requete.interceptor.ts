import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Intercepteur HTTP qui journalise les détails de chaque requête HTTP sortante.
 *
 * @description
 * Cet intercepteur capture et affiche dans la console les informations suivantes pour chaque requête :
 * - La méthode HTTP utilisée (GET, POST, etc.)
 * - L'URL de la requête
 * - Les paramètres de la requête
 * - Les en-têtes de la requête
 *
 * Les informations sont regroupées dans la console pour une meilleure lisibilité.
 *
 * @type {HttpInterceptorFn} Fonction d'interception HTTP d'Angular qui prend une requête
 * et une fonction 'next' pour la chaîne d'interception
 */
export const loggerRequeteInterceptor: HttpInterceptorFn = (req, next) => {
  // Extraction des paramètres sous forme d'objet
  const params: { [key: string]: string } = {};
  req.params.keys().forEach((key) => {
    params[key] = req.params.get(key) ?? 'null'; // Récupère la valeur ou 'null' si elle est absente
  });

  // Utilisation de groupe pour organiser les logs
  console.group('HTTP Request', req.method, req.url);
  console.table(params); // Liste des paramètres avec leurs valeurs
  console.log('Headers:', req.headers); // Liste des headers si utile (optionnel)
  console.groupEnd();

  // Passer la requête à l'étape suivante
  return next(req);
};
