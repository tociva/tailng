import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TngTextInput } from '@tailng-ui/ui/form';
import { TngIcon } from '@tailng-ui/icons/icon';

// If you export these types from your form package, import them from there.
// Adjust the import path to match your final exports.
import type { TngSlotMap, TngTextInputSlot } from '@tailng-ui/ui/form';

@Component({
  selector: 'playground-text-input-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TngTextInput, JsonPipe, TngIcon],
  templateUrl: './text-input-demo.component.html',
})
export class TextInputDemoComponent {
  /* ─────────────────────────
   * Form
   * ───────────────────────── */
  form = new FormGroup({
    text: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    search: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  get textCtrl() {
    return this.form.controls.text;
  }

  get searchCtrl() {
    return this.form.controls.search;
  }

  /* ─────────────────────────
   * Demo: slot overrides (keep in TS)
   * ───────────────────────── */
  readonly searchSlot: TngSlotMap<TngTextInputSlot> = {
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