import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, Observable, shareReplay, Subscription } from 'rxjs';
import { PageAction } from '../../models/default-page.model';
import { MenuEntry } from '../../models/menu.model';

@Component({
  selector: 'keepers-default-page',
  templateUrl: './default-page.component.html',
  styleUrl: './default-page.component.scss',
})
export class DefaultPageComponent implements OnDestroy {
  @Input() pageTitle?: string;
  @Input() pageActions: PageAction[] = [];
  @Input() menuConfig: MenuEntry[] = [];
  @Input() clearFiltersVisible = false;

  @Output() menuTriggered = new EventEmitter<MenuEntry>();
  @Output() searchTriggered = new EventEmitter<string>();
  @Output() filtersTriggered = new EventEmitter<void>();
  @Output() filtersCleared = new EventEmitter<void>();

  public readonly toolbarHeight = 85;

  public readonly breakpointObserver = inject(BreakpointObserver);
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  public search = new FormControl();
  private readonly subscriptions: Subscription[] = [];

  constructor() {
    this.subscriptions.push(
      this.search.valueChanges
        .pipe(debounceTime(50))
        .subscribe((val) => this.searchTriggered.emit(val))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public handleMenuTriggering(entry: MenuEntry) {
    this.unselectMenuItems();

    entry.active = true;
    this.menuTriggered.emit(entry);
  }

  private unselectMenuItems() {
    this.menuConfig.forEach((menuItem) => delete menuItem.active);
  }
}
