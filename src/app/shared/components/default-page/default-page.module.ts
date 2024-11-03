import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DefaultPageComponent } from './default-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [DefaultPageComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
  ],
  exports: [DefaultPageComponent],
})
export class DefaultPageModule {}
