import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DefaultPageModule } from 'src/app/shared/components/default-page/default-page.module';
import { DealsListComponent } from './components/deals-list.component';
import { DealsRoutingModule } from './deals-routing.module';

@NgModule({
  declarations: [DealsListComponent],
  imports: [CommonModule, DefaultPageModule, DealsRoutingModule],
  exports: [DealsListComponent],
})
export class DealsModule {}
