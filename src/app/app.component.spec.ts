import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LayoutModule } from './shared';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        NoopAnimationsModule,
        RouterModule.forRoot([]),
        LayoutModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it(`should have as title 'keepers-challenge'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('keepers-challenge');
  });
});
