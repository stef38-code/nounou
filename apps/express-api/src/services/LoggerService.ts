import * as winston from 'winston';

export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    // Récupérer l'environnement (par exemple : 'development' ou 'production')
    const environment = process.env.NODE_ENV || 'development';

    // Définir le niveau de log selon l'environnement
    const logLevel = environment === 'production' ? 'error' : 'debug';

    // Configurer Winston
    this.logger = winston.createLogger({
      level: logLevel, // Niveau de log défini en fonction de l'environnement
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() // Format JSON pour des journaux structurés
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(), // Ajouter des couleurs pour le terminal
            winston.format.simple() // Format simple pour plus de lisibilité dans le terminal
          ),
        }),
        new winston.transports.File({
          filename: 'logs/app.log', // Enregistrer les logs dans un fichier
          level: logLevel,
        }),
      ],
    });

    // Log initial pour vérifier la configuration
    this.logger.info(`Logger configuré pour l'environnement : ${environment}`);
  }

  log(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
}
