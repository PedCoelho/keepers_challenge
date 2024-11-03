import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { firstValueFrom, map, Observable, Subscription, switchMap } from 'rxjs';
import { PageAction } from 'src/app/shared/models/default-page.model';
import { MenuEntry } from 'src/app/shared/models/menu.model';
import { Deal, DealCategories } from '../../models/deals.model';
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
      action: () => {
        throw new Error('Function not implemented.');
      },
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
  public filteredDeals$!: Observable<Deal[]>;

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dealsService: DealsService
  ) {}

  ngOnInit(): void {
    this.initializeSubscriptions();
    this.filteredDeals$ = this.deals$;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public handleMenuSelection(menu: MenuEntry) {
    this.router.navigateByUrl(`deals/${menu.path}`);
  }

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.activeMenu.results;
    return numSelected === numRows;
  }

  public async toggleAllRows(): Promise<void> {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else
      this.selection.select(...(await firstValueFrom(this.filteredDeals$)));
  }

  public handleSearch(value: string) {
    if (!value) {
      this.filteredDeals$ = this.deals$;
    }

    this.filteredDeals$ = this.deals$.pipe(
      map((deals) =>
        deals.filter((deal) =>
          JSON.stringify(deal).toLowerCase().includes(value.toLowerCase())
        )
      )
    );
  }

  private initializeSubscriptions() {
    this.subscriptions.push(
      this.route.params.subscribe((params) => this.handleRouteUpdates(params))
    );

    this.subscriptions.push(
      this.dealsService.getDealCounts().subscribe((counts) => {
        Object.entries(counts).forEach(([category, value]) => {
          const menuItem = this.pageMenu.find((menu) => menu.path === category);
          if (!menuItem) return;
          menuItem.results = value;
        });
      })
    );

    this.deals$ = this.route.params.pipe(
      switchMap(() =>
        this.dealsService.getDeals(this.activeMenu.path as DealCategories)
      )
    );
  }

  private handleRouteUpdates(params: Params) {
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

  private handleRedirect() {
    this.router.navigate(['deals', 'acquisitions']);
  }
}
