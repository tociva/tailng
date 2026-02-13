import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TngNumberInput, TngSlotMap, TngNumberInputSlot } from '@tailng-ui/ui/form';
import { TngIcon } from '@tailng-ui/icons/icon';

@Component({
  selector: 'playground-number-input-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TngNumberInput, JsonPipe, TngIcon],
  templateUrl: './number-input-demo.component.html',
})
export class NumberInputDemoComponent {
  form = new FormGroup({
    number: new FormControl<number | null>(null, { validators: [Validators.required] }),
    amount: new FormControl<number | null>(null, { validators: [Validators.required] }),
  });

  get numberCtrl() {
    return this.form.controls.number;
  }

  get amountCtrl() {
    return this.form.controls.amount;
  }

  /* ─────────────────────────
   * Demo: slot overrides (keep in TS)
   * ───────────────────────── */
  readonly amountSlot: TngSlotMap<TngNumberInputSlot> = {
    frame: [
      'rounded-full',
      'border-slate-300',
      'bg-white',
    ],
    input: [
      'text-sm',
      'placeholder:text-slate-400',
    ],
    prefix: [
      'text-slate-400',
    ],
  };
}

