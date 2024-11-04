import { of } from 'rxjs';
import { Deal, DealCategories, DealFilters } from '../models/deals.model';

export const dealMock: Deal = {
  name: 'Oriental',
  purchasePrice: 1330,
  address: '7772 Spencer Cliffs',
  netOperatingIncome: 1110,
  category: DealCategories.ACQUISITIONS,
  capRate: 10,
};

export const dealFiltersMock: DealFilters = {
  purchaseMax: 100,
  purchaseMin: 0,
};

export class DealsServiceMock {
  getDeals = jest.fn().mockReturnValue(of({}));
  setDeal = jest.fn().mockReturnValue(of({}));
  getDealCounts = jest.fn().mockReturnValue(of({}));
}
