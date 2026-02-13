import {
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { TngSlotMap, TngSlotValue } from '@tailng-ui/ui';
import { TngTextareaSlot } from './textarea.slots';

@Component({
  selector: 'tng-textarea',
  standalone: true,
  templateUrl: './textarea.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TngTextarea),
      multi: true,
    },
  ],
})
export class TngTextarea implements ControlValueAccessor {
  placeholder = input<string>('');
  disabled = input(false);
  rows = input<number>(4);

  /* ─────────────────────────
   * Slot hooks (micro styling)
   * ───────────────────────── */
  slot = input<TngSlotMap<TngTextareaSlot>>({});

  private readonly _value = signal<string>('');
  readonly value = computed(() => this._value());

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this._value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

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

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  readonly textareaClassFinal = computed(() =>
    this.cx(
      'w-full rounded-md border border-gray-300 px-3 py-2 text-sm',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
      'disabled:opacity-50 disabled:pointer-events-none',
      this.slotClass('textarea'),
    ),
  );

  /* ─────────────────────────
   * Helpers
   * ───────────────────────── */
  private slotClass(key: TngTextareaSlot): TngSlotValue {
    return this.slot()?.[key];
  }

  private cx(...parts: Array<TngSlotValue>): string {
    return parts
      .flatMap((p) => (Array.isArray(p) ? p : [p]))
      .map((p) => (p ?? '').toString().trim())
      .filter(Boolean)
      .join(' ');
  }

  onInput(event: Event) {
    const next = (event.target as HTMLTextAreaElement).value;
    this._value.set(next);
    this.onChange(next);
  }

  onBlur() {
    this.onTouched();
  }
}

