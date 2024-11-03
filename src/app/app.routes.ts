import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/deals/deals.module').then((m) => m.DealsModule),
  },
];
