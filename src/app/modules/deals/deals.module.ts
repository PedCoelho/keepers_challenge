import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { DefaultPageModule } from 'src/app/shared/components/default-page/default-page.module';
import { DealsListComponent } from './components/deals-list/deals-list.component';
import { DealsRoutingModule } from './deals-routing.module';

@NgModule({
  declarations: [DealsListComponent],
  imports: [
    CommonModule,
    DealsRoutingModule,
    DefaultPageModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  exports: [DealsListComponent],
})
export class DealsModule {}
