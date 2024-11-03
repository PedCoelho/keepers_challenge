import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { PageAction } from '../../models/default-page.model';
import { MenuEntry } from '../../models/menu.model';

@Component({
  selector: 'keepers-default-page',
  templateUrl: './default-page.component.html',
  styleUrl: './default-page.component.scss',
})
export class DefaultPageComponent {
  @Input() pageTitle?: string;
  @Input() pageActions: PageAction[] = [];
  @Input() menuConfig: MenuEntry[] = [];

  @Output() menuTriggered = new EventEmitter<MenuEntry>();

  protected readonly toolbarHeight = 85;

  protected readonly breakpointObserver = inject(BreakpointObserver);
  protected isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  public handleMenuTriggering(entry: MenuEntry) {
    this.unselectMenuItems();

    entry.active = true;
    this.menuTriggered.emit(entry);
  }

  private unselectMenuItems() {
    this.menuConfig.forEach((menuItem) => delete menuItem.active);
  }
}
