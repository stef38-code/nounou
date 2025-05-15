import { communicationType } from './ModelType';

/**
 * Interface représentant une adresse email avec son type de communication associé
 */
export interface EmailJsonEntity {
  id: string;
  /** Le type de communication (personnel, professionnel, etc.) */
  type: communicationType;
  /** L'adresse email */
  email: string;
}

/**
 * Interface représentant un numéro de téléphone avec son type de communication associé
 */
export interface TelephoneJsonEntity {
  id: string;
  /** Le type de communication (personnel, professionnel, etc.) */
  type: communicationType;
  /** Le numéro de téléphone */
  telephone: string;
}
