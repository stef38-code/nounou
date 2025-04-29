export interface Email {
  type: communicationType;
  email: string;
}
export interface Telephone {
  type: communicationType;
  telephone: string;
}
export type communicationType = 'personnel' | 'professionnel';
