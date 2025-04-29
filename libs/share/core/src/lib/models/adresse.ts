export interface Adresse {
  numero: string;          // Numéro de rue (par ex. "12", "35B", etc.)
  voie: string;            // Nom de la rue ou voie (par ex. "Rue de Paris")
  complement?: string;     // Complément d'adresse (par ex. "Bâtiment A", "Appartement 3B") - optionnel
  codePostal: string;      // Code postal (par ex. "75001")
  ville: string;           // Nom de la commune ou ville (par ex. "Paris")
}
