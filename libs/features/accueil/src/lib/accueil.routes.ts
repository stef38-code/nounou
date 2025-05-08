import { Route } from '@angular/router';

export const accueilRoutes: Route[] = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  {
    path: 'accueil',
    loadComponent: async () =>
      (await import('./accueil/accueil.component')).AccueilComponent,
  },
];
