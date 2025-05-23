import {
  HttpHeaderResponse,
  HttpInterceptorFn,
  HttpProgressEvent,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

/**
 * `loggerReponseInterceptor` est un intercepteur HTTP Angular qui intercepte
 * toutes les réponses des requêtes HTTP sortantes (succès ou erreur)
 * et les journalise dans la console.
 *
 * @example
 * // Enregistrer cet intercepteur dans un module Angular :
 * import { provideHttpClient, withInterceptors } from '@angular/common/http';
 * import { loggerReponseInterceptor } from './interceptors/logger-reponse.interceptor';
 *
 * @NgModule({
 *   providers: [
 *     provideHttpClient(withInterceptors([loggerReponseInterceptor]))
 *   ]
 * })
 * export class AppModule {}
 *
 * @remarks
 * - Les réponses HTTP réussies (statuts 2xx) sont affichées dans une structure
 *   de `console.group`, avec des informations telles que l'URL de la requête,
 *   la méthode HTTP et le corps de la réponse.
 * - Les erreurs de réponse HTTP (statuts 4xx ou 5xx) sont également capturées
 *   et leur état est journalisé de manière similaire.
 *
 * @returns Un flux RxJS contenant les réponses HTTP interceptées ou leur erreur.
 */
export const loggerReponseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap({
      /**
       * Gestion des réponses réussies.
       *
       * @param event - L'événement HTTP (par exemple, `HttpHeaderResponse`, `HttpResponse`).
       *
       * @remarks
       * - Si l'événement est de type `HttpHeaderResponse`, journalisez le statut HTTP.
       * - Si l'événement est de type `HttpResponse`, affichez également le corps de la réponse.
       */
      next: (
        event: HttpSentEvent | HttpHeaderResponse | HttpResponse<unknown> | HttpProgressEvent | HttpUserEvent<unknown>
      ) => {
        console.group('HTTP Response', req.method, req.url);
        if (event instanceof HttpHeaderResponse) {
          console.log('Status:', event.status); // Statut HTTP (2xx)
        }
        if (event instanceof HttpResponse) {
          console.log('Response Body:', event.body); // Corps de la réponse au succès
        }
        console.groupEnd();
      },
      /**
       * Gestion des erreurs de réponse.
       *
       * @param error - L'objet erreur retourné par la requête HTTP.
       *
       * @remarks
       * - Journalisez les informations sur l'erreur, telles que le statut et le message.
       */
      error: (error) => {
        console.group('HTTP Response Error', req.method, req.url);
        console.error('Error Status:', error.status); // Statut de l'erreur HTTP (4xx, 5xx)
        console.error('Error Message:', error.message); // Message d'erreur
        console.groupEnd();
      },
    })
  );
};
