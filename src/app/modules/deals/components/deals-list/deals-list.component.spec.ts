import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DealsListComponent } from './deals-list.component';

describe('DealsListComponent', () => {
  let component: DealsListComponent;
  let fixture: ComponentFixture<DealsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DealsListComponent],
      imports: [RouterModule.forRoot([]), NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DealsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
