import { Component, EventEmitter, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Deal, DealCategories } from '../../models/deals.model';

@Component({
  selector: 'keepers-deals-form',
  templateUrl: './deals-form.component.html',
  styleUrl: './deals-form.component.scss',
})
export class DealsFormComponent {
  @Output() confirm = new EventEmitter<Deal>();
  @Output() closed = new EventEmitter<void>();

  set selectedDealCategory(value: DealCategories) {
    this.form.controls.category.patchValue(value);
    this._category = value;
  }

  get selectedDealCategory() {
    return this._category;
  }

  public form;
  private _category: DealCategories = DealCategories.ACQUISITIONS;

  constructor(
    private readonly matDialog: MatDialog,
    private readonly formBuilder: NonNullableFormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      purchasePrice: [0, Validators.required],
      address: ['', Validators.required],
      netOperatingIncome: [0, Validators.required],
      category: [DealCategories.ACQUISITIONS, Validators.required],
      capRate: [{ value: 0, disabled: true }, Validators.required],
    });

    this.form.valueChanges.subscribe(
      ({ purchasePrice, netOperatingIncome }) => {
        const capRate = this.form.controls.capRate;
        if (!purchasePrice || !netOperatingIncome)
          capRate.patchValue(0, { emitEvent: false });

        if (purchasePrice && netOperatingIncome && purchasePrice !== 0) {
          this.form.controls.capRate.patchValue(
            netOperatingIncome / purchasePrice,
            { emitEvent: false }
          );
        }
      }
    );
  }

  public close() {
    this.closed.emit();
    this.matDialog.closeAll();
  }
}
