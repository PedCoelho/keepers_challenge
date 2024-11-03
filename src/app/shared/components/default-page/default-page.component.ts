import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, Input } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'keepers-default-page',
  templateUrl: './default-page.component.html',
  styleUrl: './default-page.component.scss',
})
export class DefaultPageComponent {
  @Input() pageTitle?: string;

  protected readonly breakpointObserver = inject(BreakpointObserver);
  protected isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
