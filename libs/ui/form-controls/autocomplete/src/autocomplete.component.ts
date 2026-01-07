import {
  Component,
  ElementRef,
  ViewChild,
  forwardRef,
  input,
  output,
  signal,
  effect,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { TailngConnectedOverlayComponent } from '../../../popups-overlays/connected-overlay/src/public-api';
import { TailngOverlayPanelComponent } from '../../../popups-overlays/overlay-panel/src/public-api';
import { TailngOptionListComponent } from '../../../popups-overlays/option-list/src/public-api';
import {
  TailngOverlayRefComponent,
  TailngOverlayCloseReason,
} from '../../../popups-overlays/overlay-ref/src/public-api';

import { handleListKeyboardEvent } from 'libs/cdk/keyboard/keyboard-navigation';

export type AutocompleteCloseReason = TailngOverlayCloseReason;

@Component({
  selector: 'tng-autocomplete',
  standalone: true,
  imports: [
    TailngConnectedOverlayComponent,
    TailngOverlayPanelComponent,
    TailngOptionListComponent,
    TailngOverlayRefComponent,
  ],
  templateUrl: './autocomplete.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TailngAutocompleteComponent),
      multi: true,
    },
  ],
})
export class TailngAutocompleteComponent<T> implements ControlValueAccessor {
  @ViewChild('inputEl', { static: true })
  inputEl!: ElementRef<HTMLInputElement>;

  /* =====================
   * Inputs / Outputs
   * ===================== */
  readonly options = input<T[]>([]);
  readonly placeholder = input<string>('Start typing…');

  /** External disabled input (read-only InputSignal) */
  readonly disabled = input<boolean>(false);

  readonly displayWith = input<(item: T) => string>((v) => String(v));

  /** Raw text for filtering / API search (not the form value) */
  readonly search = output<string>();

  /** Optional: non-form usage hook */
  readonly selected = output<T>();

  /** Emits whenever overlay closes (selection/escape/outside-click/blur/programmatic) */
  readonly closed = output<AutocompleteCloseReason>();

  /* =====================
   * Internal State
   * ===================== */
  readonly inputValue = signal('');
  readonly isOpen = signal(false);
  readonly focusedIndex = signal(-1);

  /** eslint-safe + template-safe internal disabled state */
  protected readonly isDisabled = signal(false);

  /** Form value (selected item) */
  private value: T | null = null;

  /* =====================
   * ControlValueAccessor
   * ===================== */
  private onChange: (value: T | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    // Sync external [disabled] -> internal state
    effect(() => {
      this.isDisabled.set(this.disabled());
      if (this.isDisabled()) this.close('programmatic');
    });
  }

  /* =====================
   * ControlValueAccessor API
   * ===================== */
  writeValue(value: T | null): void {
    this.value = value;

    if (value == null) {
      this.inputValue.set('');
      this.focusedIndex.set(-1);
      return;
    }

    this.inputValue.set(this.displayWith()(value));
    this.focusedIndex.set(-1);
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
    if (isDisabled) this.close('programmatic');
  }

  /* =====================
   * Display helper
   * ===================== */
  display(item: T): string {
    return this.displayWith()(item);
  }

  /* =====================
   * State Transitions (single source of truth: isOpen)
   * ===================== */
  open(reason: AutocompleteCloseReason) {
    if (this.isDisabled()) return;

    this.isOpen.set(true);

    if (this.options().length) {
      const current = this.focusedIndex();
      if (current < 0) this.focusedIndex.set(0);
    } else {
      this.focusedIndex.set(-1);
    }

    // reason currently unused, but kept for symmetry/future telemetry
    void reason;
  }

  close(reason: AutocompleteCloseReason) {
    if (!this.isOpen()) return;

    this.isOpen.set(false);
    this.focusedIndex.set(-1);
    this.closed.emit(reason);
  }

  /** Used by <tng-connected-overlay (closed)="..."> and <tng-overlay-ref (closed)="..."> */
  onOverlayClosed(reason: AutocompleteCloseReason) {
    this.close(reason);
  }

  /** Used by <tng-overlay-ref (openChange)="..."> */
  onOverlayOpenChange(open: boolean) {
    if (this.isDisabled()) {
      this.isOpen.set(false);
      return;
    }

    if (open) {
      this.open('programmatic');
    } else {
      this.close('programmatic');
    }
  }

  /* =====================
   * UI Events
   * ===================== */
  onInput(ev: Event) {
    if (this.isDisabled()) return;

    const text = (ev.target as HTMLInputElement).value ?? '';
    this.inputValue.set(text);

    // typing clears selection
    this.value = null;
    this.onChange(null);

    this.search.emit(text);
    this.open('programmatic');
  }

  onFocus() {
    this.open('programmatic');
  }

  onBlur() {
    this.onTouched();
    this.close('blur');
  }

  onKeydown(ev: KeyboardEvent) {
    if (this.isDisabled()) return;

    // open on arrow
    if (!this.isOpen() && (ev.key === 'ArrowDown' || ev.key === 'ArrowUp')) {
      this.open('programmatic');
      return;
    }

    const action = handleListKeyboardEvent(ev, {
      activeIndex: this.focusedIndex(),
      itemCount: this.options().length,
      loop: false,
    });

    switch (action.type) {
      case 'move':
        this.focusedIndex.set(action.index);
        break;

      case 'select': {
        const item = this.options()[action.index];
        if (item !== undefined) this.select(item);
        break;
      }

      case 'close':
        this.close('escape');
        break;

      case 'noop':
      default:
        break;
    }
  }

  /* =====================
   * Selection
   * ===================== */
  select(item: T) {
    if (this.isDisabled()) return;

    this.value = item;
    this.inputValue.set(this.displayWith()(item));

    this.onChange(item);
    this.onTouched();

    this.selected.emit(item);

    this.close('selection');

    queueMicrotask(() => {
      this.inputEl.nativeElement.focus();
    });
  }
}
