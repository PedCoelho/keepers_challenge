import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './shared';

@Component({
  standalone: true,
  imports: [LayoutModule, RouterModule],
  selector: 'keepers-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'keepers-challenge';
}
