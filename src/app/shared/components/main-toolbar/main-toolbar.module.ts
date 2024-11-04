import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainToolbarComponent } from './main-toolbar.component';

@NgModule({
  declarations: [MainToolbarComponent],
  imports: [CommonModule, MatToolbarModule, MatIconModule],
  exports: [MainToolbarComponent],
})
export class MainToolbarModule {}
