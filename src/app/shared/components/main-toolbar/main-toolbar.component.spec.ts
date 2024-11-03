import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainToolbarComponent } from './main-toolbar.component';
import { MainToolbarModule } from './main-toolbar.module';

describe('MainToolbarComponent', () => {
  let component: MainToolbarComponent;
  let fixture: ComponentFixture<MainToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainToolbarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MainToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
