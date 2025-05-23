import { HttpErrorResponse, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { loggerReponseInterceptor } from './logger-reponse.interceptor';

describe('loggerReponseInterceptor', () => {
  let consoleGroupMock: jest.SpyInstance;
  let consoleLogMock: jest.SpyInstance;
  let consoleErrorMock: jest.SpyInstance;
  let consoleGroupEndMock: jest.SpyInstance;

  beforeEach(() => {
    // Mock des fonctions console
    consoleGroupMock = jest.spyOn(console, 'group').mockImplementation(jest.fn());
    consoleLogMock = jest.spyOn(console, 'log').mockImplementation(jest.fn());
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(jest.fn());
    consoleGroupEndMock = jest.spyOn(console, 'groupEnd').mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Réinitialisation des mocks pour chaque test
  });

  it('devrait journaliser les détails de la réponse réussie', (done) => {
    // Configuration d'un appel HTTP fictif
    const mockRequest = new HttpRequest('GET', '/test');
    const mockHandler: HttpHandlerFn = jest.fn(() =>
      of(new HttpResponse({ status: 200, body: { message: 'success' } }))
    );

    // Appeler l'intercepteur
    loggerReponseInterceptor(mockRequest, mockHandler).subscribe(() => {
      // Vérifications des logs
      expect(consoleGroupMock).toHaveBeenCalledWith('HTTP Response', 'GET', '/test');
      expect(consoleLogMock).toHaveBeenCalledWith('Response Body:', { message: 'success' });
      expect(consoleGroupEndMock).toHaveBeenCalled();

      done(); // Termine le test unitaire
    });
  });

  it('devrait journaliser les détails d’une erreur de réponse', (done) => {
    // Configuration d'un appel HTTP fictif qui retourne une erreur
    const mockRequest = new HttpRequest('GET', '/test');
    const mockHandler: HttpHandlerFn = jest.fn(() =>
      throwError(() => new HttpErrorResponse({ status: 404, statusText: 'Not Found' }))
    );

    // Appeler l'intercepteur
    loggerReponseInterceptor(mockRequest, mockHandler).subscribe({
      error: () => {
        // Vérifications des logs
        expect(consoleGroupMock).toHaveBeenCalledWith('HTTP Response Error', 'GET', '/test');
        expect(consoleErrorMock).toHaveBeenCalledWith('Error Status:', 404);
        expect(consoleErrorMock).toHaveBeenCalledWith(
          'Error Message:',
          'Http failure response for /test: 404 Not Found'
        );
        expect(consoleGroupEndMock).toHaveBeenCalled();

        done(); // Termine le test unitaire
      },
    });
  });
});
