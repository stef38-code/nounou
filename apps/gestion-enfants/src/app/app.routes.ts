import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil',loadComponent: async () => await import('@accueil').then((m)=>m.AccueilComponent)},
  { path: 'parents', loadComponent: () => import('@parents').then((m)=>m.ParentsComponent)},
  { path: 'enfants', loadComponent: () => import('@enfants').then((m)=>m.EnfantsComponent) },
];
