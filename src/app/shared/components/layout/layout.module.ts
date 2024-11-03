import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainToolbarModule } from '../main-toolbar/main-toolbar.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, MainToolbarModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
