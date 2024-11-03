import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DealsListComponent } from './components/deals-list.component';

const routes: Route[] = [{ path: '', component: DealsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealsRoutingModule {}
