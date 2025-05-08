import { Route } from '@angular/router';

export const parentsRoutes: Route[] = [
  { path: '', redirectTo: 'parents', pathMatch: 'full' },
  {
    path: 'parents',
    loadComponent: async () =>
      (await import('./liste/liste.component')).ListeComponent,
  },
];
