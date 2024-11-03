import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MainToolbarComponent } from '../main-toolbar/main-toolbar.component';

@Component({
  selector: 'keepers-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  @ViewChild(MainToolbarComponent, { static: true, read: ElementRef })
  toolbarRef!: ElementRef;

  protected toolbarHeight = 80;

  protected readonly breakpointObserver = inject(BreakpointObserver);

  protected isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    this.toolbarHeight = this.toolbarRef.nativeElement.offsetHeight;
  }
}
