import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DealsFormComponent } from './deals-form.component';

describe('DealsFormComponent', () => {
  let component: DealsFormComponent;
  let fixture: ComponentFixture<DealsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DealsFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DealsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
