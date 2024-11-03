import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Deal, DealCategories } from '../models/deals.model';
import { dealsDB } from './deals.database';

@Injectable({
  providedIn: 'root',
})
export class DealsService {
  private readonly deals: Deal[] = dealsDB;

  public getDeals(category: DealCategories): Observable<Deal[]> {
    return of(this.deals.filter((deal) => deal.category === category));
  }

  public getDealCounts(): Observable<Record<DealCategories, number>> {
    return of(
      this.deals.reduce<Record<DealCategories, number>>(
        (acc, { category }) => {
          acc[category]++;
          return acc;
        },
        {
          [DealCategories.ACQUISITIONS]: 0,
          [DealCategories.DEVELOPMENT]: 0,
          [DealCategories.ASSET_MANAGEMENT]: 0,
          [DealCategories.BRIDGE_LENDING]: 0,
        }
      )
    );
  }
}
