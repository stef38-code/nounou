import { Route } from '@angular/router';

export const enfantsRoutes: Route[] = [
  { path: '', redirectTo: 'liste', pathMatch: 'full' },
  {
    path: 'liste',
    loadComponent: async () =>
      (await import('./liste/liste.component')).ListeComponent,
  },
  {
    path: 'details',
    loadComponent: async () =>
      (await import('./details/details.component')).DetailsComponent,
  },
];
