import {
  HttpErrorResponse,
  HttpHeaderResponse,
  HttpInterceptorFn,
  HttpProgressEvent,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';

/**
 * Intercepteur HTTP unique qui journalise les détails des requêtes et réponses HTTP.
 */
export const loggerHttpInterceptor: HttpInterceptorFn = (req, next) => {
  // Préparer les paramètres de requête sous forme d'objet clé-valeur
  const params: { [key: string]: string } = {};
  req.params.keys().forEach((key) => {
    params[key] = req.params.get(key) ?? 'null';
  });

  // Démarrer un nouveau groupe pour chaque requête (log indépendant)
  console.groupCollapsed(`HTTP ${req.method} ${req.url}`);
  try {
    // Section "Request"
    console.log('Request:');
    console.group(); // Sous-groupe pour la requête
    console.table(params); // Affichage des paramètres sous forme de tableau

    // Préparer les headers sous forme tabulaire
    const headersTable = Object.fromEntries(req.headers.keys().map((key) => [key, req.headers.get(key)]));
    console.table(headersTable); // Afficher les headers au format clé-valeur
    console.groupEnd(); // Fermer le sous-groupe de la requête

    // Passer la requête suivante dans la chaîne d'interceptions ou au backend
    return next(req).pipe(
      tap({
        // Gestion des réponses réussies
        next: (
          event: HttpSentEvent | HttpHeaderResponse | HttpResponse<unknown> | HttpProgressEvent | HttpUserEvent<unknown>
        ) => {
          if (event instanceof HttpHeaderResponse || event instanceof HttpResponse) {
            console.log('Response:');
            console.group(); // Sous-groupe pour gérer les réponses
            console.log('Status:', event.status); // Statut HTTP
            if (event instanceof HttpResponse) {
              console.log('Response Body:', event.body); // Corps de la réponse
            }
            console.groupEnd(); // Fermer le sous-groupe de la réponse
          }
        },
        // Gestion des erreurs
        error: (error: HttpErrorResponse) => {
          console.log('Response:');
          console.group(); // Sous-groupe pour gérer les erreurs
          console.error('Error Status:', error.status); // Statut de l'erreur
          console.error('Error Message:', error.message); // Message de l'erreur
          console.groupEnd(); // Fermer le sous-groupe de l'erreur
        },
      }),
      // Ajout de `finalize` pour garantir que chaque groupe principal est fermé indépendamment
      finalize(() => {
        console.groupEnd(); // Fermer le groupe principal à la fin
      })
    );
  } catch (e) {
    console.error('Erreur pendant la journalisation : ', e);
    console.groupEnd(); // Fermer le groupe principal en cas d'erreur dans l'intercepteur
    throw e; // Reporter l'exception pour ne pas perturber les requêtes HTTP
  }
};
