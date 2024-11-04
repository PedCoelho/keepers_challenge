import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DealsFiltersComponent } from './deals-filters.component';

describe('DealsFiltersComponent', () => {
  let component: DealsFiltersComponent;
  let fixture: ComponentFixture<DealsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DealsFiltersComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DealsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should clear form when clearFilters is called', () => {
    component.form.patchValue({ purchaseMax: 10000, purchaseMin: 0 });
    component.clearFilters();

    expect(component.form.pristine).toBe(true);
    expect(component.form.value.purchaseMax).toBe(null);
    expect(component.form.value.purchaseMin).toBe(null);
  });
  it('should emit form data and dismiss bottomSheet when applyFilters is called', () => {
    jest.spyOn(component.filtersApplied, 'emit');
    jest.spyOn(component['bottomSheet'], 'dismiss');

    component.form.patchValue({ purchaseMax: 10000, purchaseMin: 0 });
    component.applyFilters();

    expect(component.filtersApplied.emit).toHaveBeenCalledWith(
      component.form.getRawValue()
    );

    expect(component['bottomSheet'].dismiss).toHaveBeenCalled();
  });
});
