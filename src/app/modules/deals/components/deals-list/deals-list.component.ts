import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuEntry } from 'src/app/shared/models/menu.model';

@Component({
  selector: 'keepers-deals-list',
  templateUrl: './deals-list.component.html',
  styleUrl: './deals-list.component.scss',
})
export class DealsListComponent implements OnInit {
  protected readonly pageMenu: MenuEntry[] = [
    {
      icon: 'description',
      label: 'Acquisitions',
      path: 'acquisitions',
      results: 12,
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

  protected activeMenu: MenuEntry = this.pageMenu[0];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.handleMenuSelection();
  }

  private handleMenuSelection() {
    const { mode } = this.route.snapshot.params;
    console.log(this.route.snapshot.params);
    console.log(mode);

    const selectedMenu = this.pageMenu.find((item) => item.path.includes(mode));

    if (!mode || !selectedMenu) {
      this.handleRedirect();
    } else {
      selectedMenu.active = true;
      this.activeMenu = selectedMenu;
    }
  }

  private handleRedirect() {
    console.log('redirecting');
    // this.router.navigateByUrl('deals/acquisition');
  }
}
