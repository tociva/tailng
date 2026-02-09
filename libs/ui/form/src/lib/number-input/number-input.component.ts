import {
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { TngSlotMap, TngSlotValue } from '@tailng-ui/ui';
import { TngNumberInputSlot } from './number-input.slots';

@Component({
  selector: 'tng-number-input',
  standalone: true,
  templateUrl: './number-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TngNumberInput),
      multi: true,
    },
  ],
})
export class TngNumberInput implements ControlValueAccessor {
  id = input<string>('');
  name = input<string>('');

  placeholder = input<string>('');

  disabled = input(false);
  readonly = input(false);

  prefixClickable = input<boolean>(false);

  /* ─────────────────────────
   * Slot hooks (micro styling)
   * ───────────────────────── */
  slot = input<TngSlotMap<TngNumberInputSlot>>({});

  // For mobile keypad experience
  inputmode = input<'numeric' | 'decimal'>('decimal');
  autocomplete = input<string>('off');

  // numeric constraints
  min = input<number | null>(null);
  max = input<number | null>(null);
  step = input<number | 'any' | null>(null); // e.g. 1, 0.01, 'any'

  private readonly _value = signal<number | null>(null);
  readonly value = computed(() => this._value());

  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  /* ─────────────────────────
   * Disabled state (forms + input)
   * ───────────────────────── */
  private readonly _formDisabled = signal<boolean | null>(null);

  /**
   * Final disabled value:
   * - Standalone usage: uses `disabled()` input
   * - Reactive Forms (CVA): uses `setDisabledState` value once called
   */
  readonly disabledFinal = computed(() => {
    const form = this._formDisabled();
    return form === null ? this.disabled() : form;
  });

  readonly isDisabled = computed(() => this.disabledFinal());

  writeValue(value: number | null): void {
    this._value.set(value ?? null);
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  /* ─────────────────────────
   * ControlValueAccessor
   * ───────────────────────── */

  /* ─────────────────────────
   * Slot finals (defaults + overrides)
   * ───────────────────────── */
  readonly frameClassFinal = computed(() =>
    this.cx(
      'flex h-10 w-full items-center rounded-md border border-border bg-bg text-foreground',
      'focus-within:border-transparent',
      'focus-within:ring-2 focus-within:ring-primary',
      'focus-within:ring-offset-1 focus-within:ring-offset-background',
      this.isDisabled() ? 'pointer-events-none opacity-50' : '',
      this.readonly() ? 'bg-muted/30 text-muted' : '',
      this.slotClass('frame'),
    ),
  );

  readonly inputClassFinal = computed(() =>
    this.cx(
      'h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted',
      this.slotClass('input'),
    ),
  );

  readonly prefixClassFinal = computed(() =>
    this.cx(
      this.prefixClickable() ? '' : 'pointer-events-none',
      this.slotClass('prefix'),
    ),
  );

  readonly suffixClassFinal = computed(() =>
    this.cx(
      this.slotClass('suffix'),
    ),
  );

  /* ─────────────────────────
   * Helpers
   * ───────────────────────── */
  private slotClass(key: TngNumberInputSlot): TngSlotValue {
    return this.slot()?.[key];
  }

  private cx(...parts: Array<TngSlotValue>): string {
    return parts
      .flatMap((p) => (Array.isArray(p) ? p : [p]))
      .map((p) => (p ?? '').toString().trim())
      .filter(Boolean)
      .join(' ');
  }
  

  onInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;

    // empty means null
    if (raw === '') {
      this._value.set(null);
      this.onChange(null);
      return;
    }

    const next = Number(raw);

    // protect forms from NaN
    if (Number.isNaN(next)) {
      this._value.set(null);
      this.onChange(null);
      return;
    }

    this._value.set(next);
    this.onChange(next);
  }

  onBlur(): void {
    // optional clamp on blur (Material doesn't clamp automatically, but it's often nice)
    const v = this._value();
    if (v !== null) {
      const min = this.min();
      const max = this.max();

      let clamped = v;
      if (min !== null) clamped = Math.max(min, clamped);
      if (max !== null) clamped = Math.min(max, clamped);

      if (clamped !== v) {
        this._value.set(clamped);
        this.onChange(clamped);
      }
    }

    this.onTouched();
  }
}
