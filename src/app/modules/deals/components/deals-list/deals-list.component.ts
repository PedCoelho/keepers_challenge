import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  BehaviorSubject,
  first,
  firstValueFrom,
  map,
  Observable,
  Subscription,
  switchMap,
} from 'rxjs';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { PageAction } from 'src/app/shared/models/default-page.model';
import { MenuEntry } from 'src/app/shared/models/menu.model';
import { Deal, DealCategories, DealFilters } from '../../models/deals.model';
import { DealsFiltersComponent } from '../deals-filters/deals-filters.component';
import { DealsFormComponent } from '../deals-form/deals-form.component';
import { DealsService } from './../../services/deals.service';

@Component({
  selector: 'keepers-deals-list',
  templateUrl: './deals-list.component.html',
  styleUrl: './deals-list.component.scss',
})
export class DealsListComponent implements OnInit, OnDestroy {
  public readonly displayedColumns: string[] = [
    'select',
    'name',
    'address',
    'purchasePrice',
    'netOperatingIncome',
    'capRate',
  ];

  public readonly selection = new SelectionModel<Deal>(true, []);

  public readonly pageActions: PageAction[] = [
    {
      action: () => this.handleDealsForm(),
      label: 'Add',
      icon: 'add',
    },
  ];

  public readonly pageMenu: MenuEntry[] = [
    {
      icon: 'description',
      label: 'Acquisitions',
      path: 'acquisitions',
    },
    {
      icon: 'description',
      label: 'Development',
      path: 'development',
    },
    {
      icon: 'description',
      label: 'Asset Management',
      path: 'asset-management',
    },
    {
      icon: 'description',
      label: 'Bridge Lending',
      path: 'bridge-lending',
    },
  ];

  public activeMenu: MenuEntry = this.pageMenu[0];

  public deals$!: Observable<Deal[]>;
  public search$: BehaviorSubject<string> = new BehaviorSubject('');
  public activeFilters$: BehaviorSubject<Partial<DealFilters>> =
    new BehaviorSubject({});
  public clearFiltersVisible$: Observable<boolean> = this.activeFilters$.pipe(
    map((filters) => Boolean(filters.purchaseMin ?? filters.purchaseMax))
  );

  public currentDeals$!: Observable<Deal[]>;

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dealsService: DealsService,
    private readonly bottomSheet: MatBottomSheet,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initializeSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.activeMenu.results;
    return numSelected === numRows;
  }

  public async toggleAllRows(): Promise<void> {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else this.selection.select(...(await firstValueFrom(this.currentDeals$)));
  }

  public handleMenuSelection(menu: MenuEntry): void {
    this.router.navigateByUrl(`deals/${menu.path}`);
  }

  public handleSearch(deals: Deal[], searchTerm: string): Deal[] {
    if (!searchTerm.length) return deals;
    return deals.filter((deal) =>
      JSON.stringify(deal).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  public handleDealsForm(): void {
    const config: MatDialogConfig = {
      maxWidth: '500px',
      panelClass: 'full-with-dialog',
    };

    const component = this.dialog.open(DealsFormComponent, config);
    component.componentInstance.selectedDealCategory = this.activeMenu
      .path as DealCategories;

    const sub = component.componentInstance.confirm.subscribe((deal: Deal) => {
      this.dealsService.setDeal(deal);
      this.updateDeals();
      component.close();
    });

    component
      .afterClosed()
      .pipe(first())
      .subscribe(() => sub?.unsubscribe);
  }

  public openFiltersPane(): void {
    const ref = this.bottomSheet.open(DealsFiltersComponent);

    const sub = ref.instance.filtersApplied.subscribe((filters: DealFilters) =>
      this.activeFilters$.next(filters)
    );

    ref
      .afterDismissed()
      .pipe(first())
      .subscribe(() => sub.unsubscribe());
  }

  private handleFilters(deals: Deal[], filters?: DealFilters): Deal[] {
    if (!filters) return deals;

    const minFilter = filters.purchaseMin
      ? (deal: Deal) => deal.purchasePrice >= (filters.purchaseMin as number)
      : () => true;
    const maxFilter = filters.purchaseMax
      ? (deal: Deal) => deal.purchasePrice <= (filters.purchaseMax as number)
      : () => true;

    return deals.filter((deal) => minFilter(deal) && maxFilter(deal));
  }

  private initializeSubscriptions() {
    this.initializeRouteChangeListener();
    this.updateDealCounts();
    this.updateDeals();
  }

  private updateDeals(): void {
    this.deals$ = this.route.params.pipe(
      switchMap(() =>
        this.dealsService.getDeals(this.activeMenu.path as DealCategories)
      )
    );

    this.currentDeals$ = combineLatest([
      this.activeFilters$,
      this.search$,
    ]).pipe(
      switchMap(([filters, search]) =>
        this.deals$.pipe(
          map((deals: Deal[]) => this.handleSearch(deals, search)),
          map((deals: Deal[]) => this.handleFilters(deals, filters))
        )
      )
    );
  }

  private updateDealCounts(): void {
    this.subscriptions.push(
      this.dealsService.getDealCounts().subscribe((counts) => {
        Object.entries(counts).forEach(([category, value]) => {
          const menuItem = this.pageMenu.find((menu) => menu.path === category);
          if (!menuItem) return;
          menuItem.results = value;
        });
      })
    );
  }

  private initializeRouteChangeListener(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => this.handleRouteUpdates(params))
    );
  }

  private handleRouteUpdates(params: Params): void {
    const { mode } = params;

    const selectedMenu = this.pageMenu.find(
      (menuItem) => menuItem.path === mode
    );

    this.selection.clear();

    if (!mode || !selectedMenu) {
      this.handleRedirect();
    } else {
      selectedMenu.active = true;
      this.activeMenu = selectedMenu;
    }
  }

  private handleRedirect(): void {
    this.router.navigate(['deals', 'acquisitions']);
  }
}
