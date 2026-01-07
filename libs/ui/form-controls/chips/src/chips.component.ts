import {
  Component,
  ElementRef,
  ViewChild,
  computed,
  effect,
  forwardRef,
  input,
  output,
  signal,
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

export type ChipsCloseReason = TailngOverlayCloseReason;

@Component({
  selector: 'tng-chips',
  standalone: true,
  imports: [
    TailngConnectedOverlayComponent,
    TailngOverlayPanelComponent,
    TailngOptionListComponent,
    TailngOverlayRefComponent,
  ],
  templateUrl: './chips.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TailngChipsComponent),
      multi: true,
    },
  ],
})
export class TailngChipsComponent<T> implements ControlValueAccessor {
  @ViewChild('inputEl', { static: true })
  inputEl!: ElementRef<HTMLInputElement>;

  /* =====================
   * Inputs / Outputs
   * ===================== */

  /**
   * Optional: non-forms controlled usage (two-way binding style).
   * If used with forms, DO NOT bind [value]/(valueChange).
   */
  readonly value = input<T[]>([]);

  // suggestions
  readonly options = input<T[]>([]);

  readonly placeholder = input<string>('Add…');

  /**
   * External disabled input (read-only).
   * Internal isDisabled is writable for CVA too.
   */
  readonly disabled = input<boolean>(false);

  readonly displayWith = input<(item: T) => string>((v) => String(v));

  readonly allowFreeText = input<boolean>(true);
  readonly parse = input<(raw: string) => T>((raw) => raw as unknown as T);
  readonly normalize = input<(raw: string) => string>((raw) => raw.trim());
  readonly preventDuplicates = input<boolean>(true);

  readonly search = output<string>();
  readonly valueChange = output<T[]>();
  readonly chipAdded = output<T>();
  readonly chipRemoved = output<T>();
  readonly closed = output<ChipsCloseReason>();

  /* =====================
   * Theming (section-wise klass inputs)
   * ===================== */

  /** Root wrapper */
  readonly rootKlass = input<string>('relative');

  /** Chips row container */
  readonly containerKlass = input<string>(
    [
      'w-full min-h-[42px] px-2 py-1 text-sm',
      'flex flex-wrap items-center gap-2',
      'border border-border rounded-md',
      'bg-background text-text',
      'focus-within:ring-2 focus-within:ring-primary',
    ].join(' ')
  );

  /** Individual chip */
  readonly chipKlass = input<string>(
    [
      'inline-flex items-center gap-1 px-2 py-1 rounded-md',
      'bg-alternate-background border border-border',
      'text-sm',
    ].join(' ')
  );

  /** Chip label text */
  readonly chipLabelKlass = input<string>('truncate max-w-[200px]');

  /** Remove button */
  readonly removeButtonKlass = input<string>(
    'ml-1 text-disable hover:text-text'
  );

  /** Input inside chips row */
  readonly inputKlass = input<string>(
    'flex-1 min-w-[140px] px-2 py-2 outline-none bg-transparent'
  );

  /* =====================
   * Internal State
   * ===================== */
  readonly inputValue = signal('');
  readonly isOpen = signal(false);
  readonly focusedIndex = signal(-1);

  protected readonly isDisabled = signal(false);

  /** Authoritative chips list inside component */
  private readonly chipsValue = signal<T[]>([]);

  /** When true, CVA owns the value (forms mode) */
  private usingCva = false;

  /* =====================
   * ControlValueAccessor
   * ===================== */
  private onChange: (value: T[]) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    // Sync external [disabled] -> internal
    effect(() => {
      this.isDisabled.set(this.disabled());
      if (this.isDisabled()) this.close('programmatic');
    });

    /**
     * Sync external [value] -> internal ONLY when NOT in CVA mode.
     * Prevents overwriting initial form value.
     */
    effect(() => {
      const v = this.value();
      if (this.usingCva) return;
      this.chipsValue.set(v);
    });
  }

  writeValue(value: T[] | null): void {
    this.usingCva = true;
    this.chipsValue.set(value ?? []);
  }

  registerOnChange(fn: (value: T[]) => void): void {
    this.usingCva = true;
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
   * Template getters
   * ===================== */
  chips(): T[] {
    return this.chipsValue();
  }

  readonly placeholderText = computed(() =>
    this.chipsValue().length ? '' : this.placeholder()
  );

  readonly containerClasses = computed(() =>
    (
      this.containerKlass() +
      (this.isDisabled() ? ' opacity-60 pointer-events-none' : '')
    ).trim()
  );

  /* =====================
   * Helpers
   * ===================== */
  display(item: T): string {
    return this.displayWith()(item);
  }

  private existsAlready(next: T): boolean {
    if (!this.preventDuplicates()) return false;

    const nextKey = this.display(next).toLowerCase();
    return this.chipsValue().some(
      (v) => this.display(v).toLowerCase() === nextKey
    );
  }

  private emitValue(next: T[]) {
    // internal
    this.chipsValue.set(next);

    // CVA
    this.onChange(next);

    // optional non-form output
    this.valueChange.emit(next);
  }

  /* =====================
   * Overlay open/close (single source of truth: isOpen)
   * ===================== */
  open(_reason: ChipsCloseReason) {
    if (this.isDisabled()) return;

    this.isOpen.set(true);

    if (this.options().length) {
      const current = this.focusedIndex();
      if (current < 0) this.focusedIndex.set(0);
    } else {
      this.focusedIndex.set(-1);
    }
  }

  close(reason: ChipsCloseReason) {
    if (!this.isOpen()) return;

    this.isOpen.set(false);
    this.focusedIndex.set(-1);
    this.closed.emit(reason);
  }

  /** OverlayRef openChange -> internal isOpen */
  onOverlayOpenChange(open: boolean) {
    if (this.isDisabled()) {
      this.isOpen.set(false);
      return;
    }

    if (open) this.open('programmatic');
    else this.close('programmatic');
  }

  /** ConnectedOverlay/OverlayRef close -> internal close */
  onOverlayClosed(reason: ChipsCloseReason) {
    this.close(reason);
  }

  /* =====================
   * UI events
   * ===================== */
  onInput(ev: Event) {
    if (this.isDisabled()) return;

    const raw = (ev.target as HTMLInputElement).value ?? '';
    this.inputValue.set(raw);
    this.search.emit(raw);
    this.open('programmatic');
  }

  onBlur() {
    this.onTouched();
    this.close('blur');
  }

  onKeydown(ev: KeyboardEvent) {
    if (this.isDisabled()) return;

    // Backspace removes last chip when input empty
    if (ev.key === 'Backspace' && !this.inputValue()) {
      const current = this.chipsValue();
      if (current.length) {
        ev.preventDefault();
        this.removeAt(current.length - 1);
      }
      return;
    }

    // Enter adds a chip
    if (ev.key === 'Enter') {
      ev.preventDefault();

      // If open and focused -> select option
      if (this.isOpen() && this.focusedIndex() >= 0) {
        const item = this.options()[this.focusedIndex()];
        if (item !== undefined) this.selectOption(item);
        return;
      }

      // Otherwise free text
      this.addFromInput();
      return;
    }

    // open on arrow
    if (!this.isOpen() && (ev.key === 'ArrowDown' || ev.key === 'ArrowUp')) {
      this.open('programmatic');
      return;
    }

    if (this.isOpen()) {
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
          if (item !== undefined) this.selectOption(item);
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
  }

  /* =====================
   * Chip actions
   * ===================== */
  addFromInput() {
    if (this.isDisabled()) return;
    if (!this.allowFreeText()) return;

    const normalized = this.normalize()(this.inputValue());
    if (!normalized) return;

    const nextChip = this.parse()(normalized);
    if (this.existsAlready(nextChip)) {
      this.inputValue.set('');
      this.close('programmatic');
      return;
    }

    const next = [...this.chipsValue(), nextChip];
    this.emitValue(next);
    this.chipAdded.emit(nextChip);

    this.inputValue.set('');
    this.close('programmatic');

    queueMicrotask(() => this.inputEl.nativeElement.focus());
  }

  selectOption(item: T) {
    if (this.isDisabled()) return;

    if (this.existsAlready(item)) {
      this.inputValue.set('');
      this.close('selection');
      queueMicrotask(() => this.inputEl.nativeElement.focus());
      return;
    }

    const next = [...this.chipsValue(), item];
    this.emitValue(next);
    this.chipAdded.emit(item);

    this.inputValue.set('');
    this.close('selection');

    queueMicrotask(() => this.inputEl.nativeElement.focus());
  }

  removeAt(index: number) {
    if (this.isDisabled()) return;

    const current = this.chipsValue();
    if (index < 0 || index >= current.length) return;

    const removed = current[index];
    const next = current.filter((_, i) => i !== index);

    this.emitValue(next);
    this.chipRemoved.emit(removed);
  }

  clearAll() {
    if (this.isDisabled()) return;

    const current = this.chipsValue();
    if (!current.length) return;

    for (const item of current) this.chipRemoved.emit(item);

    this.emitValue([]);
  }
}
