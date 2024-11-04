import { Route } from '@angular/router';
import { BadRouteComponent } from './shared/components/bad-route/bad-route.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'deals', pathMatch: 'full' },
  {
    path: 'deals',
    loadChildren: () =>
      import('./modules/deals/deals.module').then((m) => m.DealsModule),
  },
  { path: '**', component: BadRouteComponent },
];
