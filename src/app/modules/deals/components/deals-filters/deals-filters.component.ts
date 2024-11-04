import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DealFilters } from '../../models/deals.model';

@Component({
  selector: 'keepers-deals-filters',
  templateUrl: './deals-filters.component.html',
  styleUrl: './deals-filters.component.scss',
})
export class DealsFiltersComponent {
  @Output() filtersApplied = new EventEmitter<DealFilters>();

  constructor(private readonly bottomSheet: MatBottomSheet) {}
  public form = new FormGroup({
    purchaseMin: new FormControl(),
    purchaseMax: new FormControl(),
  });

  public clearFilters(): void {
    this.form.reset();
  }

  public applyFilters(): void {
    this.filtersApplied.emit(this.form.value);
    this.bottomSheet.dismiss();
  }
}
