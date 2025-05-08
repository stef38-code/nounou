import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  {
    path: 'accueil',
    loadChildren: async () =>
      await import('@accueil').then((m) => m.accueilRoutes),
  },
  {
    path: 'parents',
    loadChildren: () => import('@parents').then((m) => m.parentsRoutes),
  },
  {
    path: 'enfants',
    loadChildren: () => import('@enfants').then((m) => m.enfantsRoutes),
  },
];
