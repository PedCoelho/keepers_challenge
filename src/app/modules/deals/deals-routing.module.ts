import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DealsListComponent } from './components/deals-list/deals-list.component';

const routes: Route[] = [
  { path: '', redirectTo: 'acquisitions', pathMatch: 'full' },
  { path: ':mode', component: DealsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealsRoutingModule {}
