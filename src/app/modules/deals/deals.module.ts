import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { DefaultPageModule } from 'src/app/shared/components/default-page/default-page.module';
import { DealsFiltersComponent } from './components/deals-filters/deals-filters.component';
import { DealsFormComponent } from './components/deals-form/deals-form.component';
import { DealsListComponent } from './components/deals-list/deals-list.component';
import { DealsRoutingModule } from './deals-routing.module';

@NgModule({
  declarations: [DealsListComponent, DealsFiltersComponent, DealsFormComponent],
  imports: [
    CommonModule,
    DealsRoutingModule,
    DefaultPageModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatBottomSheetModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  exports: [DealsListComponent, DealsFiltersComponent, DealsFormComponent],
})
export class DealsModule {}
