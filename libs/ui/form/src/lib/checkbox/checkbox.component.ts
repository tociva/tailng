import {
  Component,
  ElementRef,
  ViewChild,
  computed,
  effect,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { TngSlotMap, TngSlotValue } from '@tailng-ui/ui';
import { TngCheckboxSlot } from './checkbox.slots';

type TriState = boolean | null;

@Component({
  selector: 'tng-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TngCheckbox),
      multi: true,
    },
  ],
})
export class TngCheckbox implements ControlValueAccessor {
  readonly id = input<string>('');
  readonly name = input<string>('');

  readonly label = input<string>('');

  /** External disabled input */
  readonly disabled = input(false);

  /** When true, cycle through indeterminate/null as well */
  readonly tristate = input(false);

  /**
   * Toggle cycle behavior:
   * - 'mixed-first': null -> true -> false -> null ...
   * - 'unchecked-first': false -> null -> true -> false ...
   */
  readonly cycle = input<'mixed-first' | 'unchecked-first'>('mixed-first');

  readonly required = input(false);

  /* ─────────────────────────
   * Slot hooks (micro styling)
   * ───────────────────────── */
  slot = input<TngSlotMap<TngCheckboxSlot>>({});

  @ViewChild('inputEl', { static: true })
  private readonly inputEl!: ElementRef<HTMLInputElement>;

  private readonly _value = signal<TriState>(false);
  readonly value = computed(() => this._value());

  private onChange: (value: TriState) => void = () => {};
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

  constructor() {
    // Keep native indeterminate in sync with our value()
    effect(() => {
      const el = this.inputEl?.nativeElement;
      if (!el) return;

      const v = this.value();
      el.indeterminate = v === null;

      // When indeterminate, checked should be false (native convention)
      // (visually it will show as mixed)
      if (v === null) el.checked = false;
    });
  }

  writeValue(value: TriState): void {
    // Accept undefined as null-ish safety if ever passed
    // Preserve null for tri-state mode, only convert undefined to false
    this._value.set(value === undefined ? false : value);
  }

  registerOnChange(fn: (value: TriState) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  /* ─────────────────────────
   * Slot finals (defaults + overrides)
   * ───────────────────────── */
  readonly rootClassFinal = computed(() =>
    this.cx(
      'inline-flex items-center gap-2 cursor-pointer select-none',
      this.slotClass('root'),
    ),
  );

  readonly inputClassFinal = computed(() =>
    this.cx(
      'h-4 w-4 rounded',
      'border border-border bg-bg',
      'accent-primary',
      'focus-visible:outline-none',
      'focus-visible:ring-2 focus-visible:ring-primary',
      'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:opacity-50 disabled:pointer-events-none',
      this.slotClass('input'),
    ),
  );

  readonly labelClassFinal = computed(() =>
    this.cx(
      'text-sm text-fg',
      this.slotClass('label'),
    ),
  );

  /* ─────────────────────────
   * Helpers
   * ───────────────────────── */
  private slotClass(key: TngCheckboxSlot): TngSlotValue {
    return this.slot()?.[key];
  }

  private cx(...parts: Array<TngSlotValue>): string {
    return parts
      .flatMap((p) => (Array.isArray(p) ? p : [p]))
      .map((p) => (p ?? '').toString().trim())
      .filter(Boolean)
      .join(' ');
  }

  onToggle(event: Event): void {
    if (this.isDisabled()) return;

    const el = event.target as HTMLInputElement;

    const next = this.tristate()
      ? this.nextTriState(this.value(), el.checked)
      : el.checked;

    this._value.set(next);
    this.onChange(next);
    this.onTouched();
  }

  onBlur(): void {
    this.onTouched();
  }

  private nextTriState(current: TriState, nativeChecked: boolean): TriState {
    // We ignore nativeChecked for the mixed step and drive state ourselves.
    // (Native checkbox cannot represent mixed by checked/unchecked alone.)
    const mode = this.cycle();

    if (mode === 'mixed-first') {
      // null -> true -> false -> null
      if (current === null) return true;
      if (current === true) return false;
      return null;
    }

    // 'unchecked-first': false -> null -> true -> false
    if (current === false) return null;
    if (current === null) return true;
    return false;
  }
}