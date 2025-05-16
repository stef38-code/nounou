import { Injectable } from '@angular/core';
import { LoggerService } from './LoggerService';

@Injectable({
  providedIn: 'root',
})
export class AppLoggerService {
  private logger: LoggerService;

  constructor() {
    this.logger = new LoggerService();
  }

  log(message: string): void {
    this.logger.log(message);
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
