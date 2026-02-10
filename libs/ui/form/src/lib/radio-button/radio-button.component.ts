import {
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { TngSlotMap, TngSlotValue } from '@tailng-ui/ui';
import { TngRadioButtonSlot } from './radio-button.slots';

@Component({
  selector: 'tng-radio-button',
  standalone: true,
  templateUrl: './radio-button.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TngRadioButton),
      multi: true,
    },
  ],
})
export class TngRadioButton implements ControlValueAccessor {
  readonly id = input<string>('');
  readonly name = input<string>('');

  readonly value = input.required<string>();
  readonly label = input<string>('');
  readonly disabled = input(false);
  readonly required = input(false);

  /* ─────────────────────────
   * Slot hooks (micro styling)
   * ───────────────────────── */
  slot = input<TngSlotMap<TngRadioButtonSlot>>({});

  private readonly _formValue = signal<string | null>(null);
  readonly isChecked = computed(() => this._formValue() === this.value());

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  private readonly _formDisabled = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());

  writeValue(value: string | null): void {
    this._formValue.set(value ?? null);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  /* ─────────────────────────
   * Computed slot classes
   * ───────────────────────── */
  readonly containerClassFinal = computed(() =>
    this.cx(
      'inline-flex items-center gap-2 cursor-pointer select-none',
      this.slotClass('container'),
    ),
  );

  readonly inputClassFinal = computed(() =>
    this.cx(
      // size + shape
      'h-4 w-4 rounded-full',
      // theme tokens
      'border border-border bg-bg',
      'accent-primary',
      // focus ring
      'focus-visible:outline-none',
      'focus-visible:ring-2 focus-visible:ring-primary',
      'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      // disabled
      'disabled:opacity-50 disabled:pointer-events-none',
      // user override
      this.slotClass('input'),
    ),
  );

  readonly labelClassFinal = computed(() =>
    this.cx('text-sm text-fg', this.slotClass('label')),
  );

  /* ─────────────────────────
   * Helpers
   * ───────────────────────── */
  private slotClass(key: TngRadioButtonSlot): TngSlotValue {
    return this.slot()?.[key];
  }

  private cx(...parts: Array<TngSlotValue>): string {
    return parts
      .flatMap((p) => (Array.isArray(p) ? p : [p]))
      .map((p) => (p ?? '').toString().trim())
      .filter(Boolean)
      .join(' ');
  }

  onSelect(event: Event): void {
    if (this.isDisabled()) return;

    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this._formValue.set(this.value());
      this.onChange(this.value());
      this.onTouched();
    }
  }

  onBlur(): void {
    this.onTouched();
  }
}
