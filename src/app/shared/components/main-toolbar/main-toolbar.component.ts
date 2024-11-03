import { Component } from '@angular/core';

@Component({
  selector: 'keepers-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrl: './main-toolbar.component.scss',
})
export class MainToolbarComponent {
  public handleNavigation() {
    location.replace('');
  }
}
