/**
 * Interface représentant un élément du menu latéral.
 * Utilisée pour configurer les éléments de navigation dans le composant sider.
 */
export interface SiderMenuItem {
  /** Le texte à afficher pour l'élément du menu */
  label: string;
  /** L'URL de destination lors du clic sur l'élément */
  link: string;
  /** L'icône optionnelle à afficher à côté du label */
  icon?: string;
}
