import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DealsService } from '../../services/deals.service';
import { DealsFiltersComponent } from '../deals-filters/deals-filters.component';
import { DealsFormComponent } from '../deals-form/deals-form.component';
import {
  dealFiltersMock,
  dealMock,
  DealsServiceMock,
} from './../../mocks/deals.mock';
import { DealsListComponent } from './deals-list.component';

const MOCKS = { mockService: new DealsServiceMock() };

describe('DealsListComponent', () => {
  let component: DealsListComponent;
  let fixture: ComponentFixture<DealsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DealsListComponent,
        DealsFormComponent,
        DealsFiltersComponent,
      ],
      imports: [CommonModule, RouterModule.forRoot([]), NoopAnimationsModule],
      providers: [{ provide: DealsService, useValue: MOCKS.mockService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DealsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should test add action', () => {
    it('should open dialog when Add action is called', () => {
      jest.spyOn(component['dialog'], 'open');
      const add = component.pageActions[0];
      add.action();
      expect(component['dialog'].open).toHaveBeenCalled();
    });

    it('should listen for dialog confirm and call service method when handleDealsForm is called', () => {
      jest.spyOn(component as any, 'updateDeals');
      component.handleDealsForm();

      const dialog = component['dialog'].openDialogs[0];
      dialog.componentInstance.confirm.emit(dealMock);

      expect(MOCKS.mockService.setDeal).toHaveBeenCalledWith(dealMock);
      expect(component['updateDeals']).toHaveBeenCalledTimes(1);
    });
  });

  describe('should test page filters', () => {
    it('should open bottomSheet when openFiltersPane is called', () => {
      jest.spyOn(component['bottomSheet'], 'open');
      component.openFiltersPane();
      expect(component['bottomSheet'].open).toHaveBeenCalledWith(
        DealsFiltersComponent
      );
    });

    it('should listen to filtersApplied event when openFiltersPane is called', () => {
      component.openFiltersPane();
      const ref: DealsFiltersComponent =
        component['bottomSheet']._openedBottomSheetRef?.instance;
      ref.filtersApplied.emit(dealFiltersMock);

      expect(component.activeFilters$.value).toEqual(dealFiltersMock);
    });
  });

  it('should apply filter when handleFilters is called', () => {
    const mockDeals = [
      { ...dealMock, purchasePrice: 100 },
      { ...dealMock, purchasePrice: 1000 },
    ];

    const lowValueFilter = { purchaseMin: 110 };
    expect(component['handleFilters'](mockDeals, lowValueFilter)).not.toContain(
      mockDeals[0]
    );
    expect(component['handleFilters'](mockDeals, lowValueFilter)).toContain(
      mockDeals[1]
    );

    const highValueFilter = { purchaseMax: 900 };
    expect(
      component['handleFilters'](mockDeals, highValueFilter)
    ).not.toContain(mockDeals[1]);
    expect(component['handleFilters'](mockDeals, highValueFilter)).toContain(
      mockDeals[0]
    );

    expect(component['handleFilters'](mockDeals)).toEqual(mockDeals);
    expect(component['handleFilters'](mockDeals, {})).toEqual(mockDeals);
  });
});
