import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  TngConnectedOverlay,
  TngOverlayPanel,
  TngOverlayRef,
  type TngOverlayCloseReason,
} from '@tailng-ui/ui/overlay';

import { TngSlotMap, TngSlotValue } from '@tailng-ui/ui';

import { TngNativeDateAdapter } from './adapters/native-date.adapter';
import { TNG_DATE_ADAPTER, TngDateAdapter } from './adapters/tng-date-adapter';
import {
  computeNextCaretPos,
  parseSmartDate
} from './utils/datepicker-input.util';
import { TngDatepickerSlot } from './datepicker.slots';

const MONTHS = [
  { index: 0, label: 'Jan' },
  { index: 1, label: 'Feb' },
  { index: 2, label: 'Mar' },
  { index: 3, label: 'Apr' },
  { index: 4, label: 'May' },
  { index: 5, label: 'Jun' },
  { index: 6, label: 'Jul' },
  { index: 7, label: 'Aug' },
  { index: 8, label: 'Sep' },
  { index: 9, label: 'Oct' },
  { index: 10, label: 'Nov' },
  { index: 11, label: 'Dec' },
] as const;

const YEAR_WINDOW_SIZE = 10;
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

type CalendarCell = {
  date: Date;
  label: string;
  isOutsideMonth: boolean;
};

@Component({
  selector: 'tng-datepicker',
  standalone: true,
  imports: [
    TngOverlayRef,
    TngConnectedOverlay,
    TngOverlayPanel,
  ],
  templateUrl: './datepicker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TngDatepicker),
      multi: true,
    },
  ],
})
export class TngDatepicker implements ControlValueAccessor {
  /* =====================
   * Inputs
   * ===================== */
  readonly min = input<Date | null>(null);
  readonly max = input<Date | null>(null);
  readonly disabled = input<boolean>(false);

  readonly displayFormat = input<string>('DD/MM/YYYY');
  readonly previewFormat = input<string>('DD MMM YYYY');

  /** Optional locale for month names (e.g. 'en', 'fr', 'de', 'ml') */
  readonly locale = input<string | null>(null);

  readonly dateAdapter = input<TngDateAdapter | null>(null);

  /* ─────────────────────────
   * Slot hooks (micro styling)
   * ───────────────────────── */
  slot = input<TngSlotMap<TngDatepickerSlot>>({});

  @ViewChild('inputEl', { static: true })
  inputEl!: ElementRef<HTMLInputElement>;

  /* =====================
   * Overlay state
   * ===================== */
  readonly isOpen = signal(false);
  readonly isDisabled = signal(false);

  private readonly injectedAdapter = inject(TNG_DATE_ADAPTER, { optional: true });
  private readonly nativeAdapter = inject(TngNativeDateAdapter);

  readonly adapter = computed(
    () => this.dateAdapter() ?? this.injectedAdapter ?? this.nativeAdapter,
  );

  /* ─────────────────────────
   * Slot finals (defaults + overrides)
   * ───────────────────────── */
  readonly containerClassFinal = computed(() =>
    this.cx('relative', this.slotClass('container')),
  );

  readonly disabledClassFinal = computed(() =>
    this.cx(this.slotClass('disabled')),
  );

  readonly fieldClassFinal = computed(() =>
    this.cx('relative', this.slotClass('field')),
  );

  readonly inputClassFinal = computed(() =>
    this.cx(
      'w-full rounded-md border border-border bg-bg px-3 py-2 pr-10 text-sm',
      'focus:outline-none focus:ring-2 focus:ring-primary',
      this.slotClass('input'),
    ),
  );

  readonly toggleClassFinal = computed(() =>
    this.cx(
      'absolute inset-y-0 right-0 flex w-10 items-center justify-center',
      'rounded-r-md text-fg hover:bg-alternate-background',
      this.slotClass('toggle'),
    ),
  );

  readonly toggleIconClassFinal = computed(() =>
    this.cx('h-5 w-5', this.slotClass('toggleIcon')),
  );

  readonly overlayPanelSlot = computed(() => {
    const panelSlot = this.slotClass('overlayPanel');
    return panelSlot ? { panel: panelSlot } : {};
  });

  readonly panelFrameClassFinal = computed(() =>
    this.cx(
      'w-[370px] h-[320px] overflow-hidden rounded-lg',
      'border border-border bg-bg shadow-lg',
      this.slotClass('panelFrame'),
    ),
  );

  readonly panelLayoutClassFinal = computed(() =>
    this.cx('grid h-full grid-cols-[64px_1fr_64px]', this.slotClass('panelLayout')),
  );

  readonly monthRailClassFinal = computed(() =>
    this.cx('bg-bg p-1 text-fg', this.slotClass('monthRail')),
  );

  readonly monthListClassFinal = computed(() =>
    this.cx('space-y-0.5', this.slotClass('monthList')),
  );

  readonly monthItemClassFinal = computed(() =>
    this.cx(
      'w-full rounded px-1 py-0.5 text-[11px] font-semibold transition',
      this.slotClass('monthItem'),
    ),
  );

  readonly calendarClassFinal = computed(() =>
    this.cx(
      'flex h-full flex-col p-2 border-r border-l border-border',
      this.slotClass('calendar'),
    ),
  );

  readonly titleClassFinal = computed(() =>
    this.cx(
      'mb-1 text-center text-sm font-semibold',
      this.slotClass('title'),
    ),
  );

  readonly weekdayRowClassFinal = computed(() =>
    this.cx(
      'grid grid-cols-7 gap-0.5 text-[10px] font-semibold text-disable',
      this.slotClass('weekdayRow'),
    ),
  );

  readonly weekdayCellClassFinal = computed(() =>
    this.cx('text-center', this.slotClass('weekdayCell')),
  );

  readonly dayGridClassFinal = computed(() =>
    this.cx('mt-1 grid grid-cols-7 gap-0.5', this.slotClass('dayGrid')),
  );

  readonly dayCellClassFinal = computed(() =>
    this.cx(
      'h-7 rounded text-[11px] transition',
      this.slotClass('dayCell'),
    ),
  );

  readonly previewTextClassFinal = computed(() =>
    this.cx(
      'pt-2 text-center text-[11px] text-disable',
      this.slotClass('previewText'),
    ),
  );

  readonly actionBarClassFinal = computed(() =>
    this.cx(
      'mt-auto flex items-center justify-end gap-2 pt-4',
      this.slotClass('actionBar'),
    ),
  );

  readonly cancelClassFinal = computed(() =>
    this.cx(
      'rounded-md border border-border bg-bg',
      'px-3 py-1.5 text-[11px] font-semibold text-fg',
      'shadow-sm hover:bg-alternate-background active:translate-y-[1px]',
      this.slotClass('cancel'),
    ),
  );

  readonly confirmClassFinal = computed(() =>
    this.cx(
      'rounded-md bg-fg',
      'px-3 py-1.5 text-[11px] font-semibold text-bg',
      'shadow-sm hover:opacity-95 active:translate-y-[1px]',
      this.slotClass('confirm'),
    ),
  );

  readonly yearRailClassFinal = computed(() =>
    this.cx(
      'bg-bg p-1 text-fg flex flex-col',
      this.slotClass('yearRail'),
    ),
  );

  readonly yearNavPrevClassFinal = computed(() =>
    this.cx(
      'mx-auto mb-1 flex h-6 w-6 items-center justify-center',
      'rounded bg-bg/10 text-[12px] hover:bg-bg/15 disabled:opacity-40',
      this.slotClass('yearNavPrev'),
    ),
  );

  readonly yearListClassFinal = computed(() =>
    this.cx('space-y-0.5', this.slotClass('yearList')),
  );

  readonly yearItemClassFinal = computed(() =>
    this.cx(
      'w-full rounded px-1 py-0.5 text-[11px] font-semibold transition',
      this.slotClass('yearItem'),
    ),
  );

  readonly yearNavNextClassFinal = computed(() =>
    this.cx(
      'mx-auto mt-1 flex h-6 w-6 items-center justify-center',
      'rounded bg-bg/10 text-[12px] hover:bg-bg/15 disabled:opacity-40',
      this.slotClass('yearNavNext'),
    ),
  );

  /* ─────────────────────────
   * Helpers
   * ───────────────────────── */
  private slotClass(key: TngDatepickerSlot): TngSlotValue {
    return this.slot()?.[key];
  }

  private cx(...parts: Array<TngSlotValue>): string {
    return parts
      .flatMap((p) => (Array.isArray(p) ? p : [p]))
      .map((p) => (p ?? '').toString().trim())
      .filter(Boolean)
      .join(' ');
  }

  /* =====================
   * Form values
   * ===================== */
  private value: Date | null = null;
  readonly draft = signal<Date | null>(null);
  readonly inputValue = signal('');

  private onChange: (value: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  /* =====================
   * UI constants
   * ===================== */
  readonly months = MONTHS;
  readonly weekdays = WEEKDAYS;
  

  readonly focusedDate = signal<Date | null>(null);

  /* =====================
   * Derived bounds
   * ===================== */
  private readonly minD = computed(() =>
    this.min() ? this.adapter().startOfDay(this.min()!) : null
  );
  private readonly maxD = computed(() =>
    this.max() ? this.adapter().startOfDay(this.max()!) : null
  );

  /* =====================
   * View base
   * ===================== */
  readonly view = computed(() =>
    (this.draft() ?? this.value ?? this.adapter().startOfDay(new Date()))
  );

  readonly selectedYear = computed(() => this.adapter().year(this.view()!));
  readonly selectedMonth = computed(() => this.adapter().month(this.view()!));

  readonly yearBase = signal<number>(
    Math.floor(this.adapter().year(new Date()) / YEAR_WINDOW_SIZE) * YEAR_WINDOW_SIZE
  );

  readonly years = computed(() => {
    const base = this.yearBase();
    return Array.from({ length: YEAR_WINDOW_SIZE }, (_, i) => base + i);
  });

  readonly previewLabel = computed(() => {
    const d = this.draft() ?? this.value;
    if (!d) return '—';
    const loc = this.locale();
    return loc ? this.adapter().format(d, this.previewFormat(), loc) : this.adapter().format(d, this.previewFormat());
  });

  readonly calendarCells = computed<CalendarCell[]>(() => {
    const v = this.adapter().startOfMonth(this.view()!);
    const startDow = this.adapter().day(v);
    const gridStart = this.adapter().addDays(v, -startDow);

    const cells: CalendarCell[] = [];
    for (let i = 0; i < 42; i++) {
      const d = this.adapter().addDays(gridStart, i);
      cells.push({
        date: d,
        label: String(this.adapter().date(d)),
        isOutsideMonth: this.adapter().month(d) !== this.adapter().month(v),
      });
    }
    return cells;
  });

  canPrevYearWindow = computed(() => !this.isYearWindowBlocked(this.yearBase() - YEAR_WINDOW_SIZE));
  canNextYearWindow = computed(() => !this.isYearWindowBlocked(this.yearBase() + YEAR_WINDOW_SIZE));

  private isYearWindowBlocked(nextBase: number): boolean {
    const min = this.minD();
    const max = this.maxD();
    if (!min && !max) return false;

    const years = Array.from({ length: YEAR_WINDOW_SIZE }, (_, i) => nextBase + i);
    return years.every((y) => this.isYearDisabled(y));
  }

  constructor() {
    effect(() => {
      this.isDisabled.set(this.disabled());
      if (this.isDisabled()) this.close('programmatic');
    });
  }

  prevYearWindow(): void {
    if (this.isDisabled()) return;
    const next = this.yearBase() - YEAR_WINDOW_SIZE;
    if (this.isYearWindowBlocked(next)) return;
    this.yearBase.set(next);
  }

  nextYearWindow(): void {
    if (this.isDisabled()) return;
    const next = this.yearBase() + YEAR_WINDOW_SIZE;
    if (this.isYearWindowBlocked(next)) return;
    this.yearBase.set(next);
  }

  /* =====================
   * CVA
   * ===================== */
  writeValue(value: Date | string | number | null): void {
    if (value == null) {
      this.value = null;
      this.draft.set(null);
      this.inputValue.set('');
      return;
    }

    const d = this.adapter().startOfDay(new Date(value));
    if (!this.adapter().isValid(d)) return;

    const clamped = this.clampToBounds(d);
    this.value = clamped;
    this.draft.set(clamped);

    this.yearBase.set(Math.floor(this.adapter().year(clamped) / YEAR_WINDOW_SIZE) * YEAR_WINDOW_SIZE);

    const formatted = this.adapter().format(clamped, this.displayFormat(), this.locale() ?? undefined);
    this.inputValue.set(formatted);
  }

  registerOnChange(fn: (value: Date | null) => void): void {
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
   * Overlay control
   * ===================== */
  open(_reason: TngOverlayCloseReason) {
    if (this.isDisabled()) return;
    this.isOpen.set(true);
  
    if (this.draft() == null) this.draft.set(this.value ?? this.adapter().startOfDay(new Date()));
    const current = (this.draft() ?? this.value ?? this.adapter().startOfDay(new Date()));
  
    // year window sync (existing)
    const y = this.adapter().year(current);
    this.yearBase.set(Math.floor(y / YEAR_WINDOW_SIZE) * YEAR_WINDOW_SIZE);
  
    // keyboard focus starts from current draft/value
    this.focusedDate.set(current);
  }
  

  close(_reason: TngOverlayCloseReason) {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
  }

  onOverlayOpenChange(open: boolean) {
    if (this.isDisabled()) {
      this.isOpen.set(false);
      return;
    }
    open ? this.open('programmatic') : this.close('programmatic');
  }

  onOverlayClosed(reason: TngOverlayCloseReason) {
    this.close(reason);
  }

  toggleOverlay() {
    if (this.isDisabled()) return;
    this.isOpen.update((v) => !v);
    if (this.isOpen()) this.open('programmatic');
    queueMicrotask(() => this.inputEl.nativeElement.focus());
  }

  /* =====================
   * Input handling (smart)
   * ===================== */
  onInput(ev: Event) {
    if (this.isDisabled()) return;

    const input = ev.target as HTMLInputElement;
    const raw = input.value ?? '';

    const before = raw;
    const beforeCaret = input.selectionStart ?? before.length;

    const res = parseSmartDate(raw, this.displayFormat(), this.adapter(), this.locale() ?? undefined);

    // Keep what user typed while partial/invalid; don't hard-clear.
    if (res.kind === 'empty') {
      this.inputValue.set('');
      this.draft.set(null);
      this.onChange(null);
      this.onTouched();
      return;
    }

    if (res.kind === 'partial') {
      this.inputValue.set(raw);
      // do not emit null onChange while user is mid-typing
      this.onTouched();
      return;
    }

    if (res.kind === 'invalid') {
      this.inputValue.set(raw);
      this.onChange(null);
      this.onTouched();
      return;
    }

    // valid
    const clamped = this.clampToBounds(res.date);
    this.draft.set(clamped);

    const formatted = this.adapter().format(clamped, this.displayFormat(), this.locale() ?? undefined);
    this.inputValue.set(formatted);

    // Apply formatting back to input while preserving caret
    if (formatted !== raw) {
      input.value = formatted;
      const nextCaret = computeNextCaretPos(before, beforeCaret, formatted);
      queueMicrotask(() => input.setSelectionRange(nextCaret, nextCaret));
    }

    // don’t commit until day click/confirm (your current UX), but
    // we can still emit null/valid? You already treat typing as draft.
    // Keep existing behavior: do NOT call onChange here.
    this.onTouched();
  }

  onBlur() {
    this.onTouched();
  }

  private setFocusedDate(next: Date) {
    const d = this.adapter().startOfDay(next);
  
    // clamp to bounds
    const clamped = this.clampToBounds(d);
  
    this.focusedDate.set(clamped);
  
    // If user navigates to another month/year, update draft to keep calendar view in sync
    this.draft.set(clamped);
  
    // Keep year window aligned
    this.yearBase.set(Math.floor(this.adapter().year(clamped) / YEAR_WINDOW_SIZE) * YEAR_WINDOW_SIZE);
  }
  
  private moveFocusedByDays(delta: number) {
    const base = (this.focusedDate() ?? this.draft() ?? this.value ?? this.adapter().startOfDay(new Date()));
    this.setFocusedDate(this.adapter().addDays(base, delta));
  }
  
  private moveFocusedByMonths(delta: number) {
    const base = (this.focusedDate() ?? this.draft() ?? this.value ?? this.adapter().startOfDay(new Date()));
    this.setFocusedDate(this.adapter().addMonths(base, delta));
  }
  
  private moveFocusedToStartOfMonth() {
    const base = (this.focusedDate() ?? this.draft() ?? this.value ?? this.adapter().startOfDay(new Date()));
    this.setFocusedDate(this.adapter().startOfMonth(base));
  }
  
  private moveFocusedToEndOfMonth() {
    const base = (this.focusedDate() ?? this.draft() ?? this.value ?? this.adapter().startOfDay(new Date()));
    this.setFocusedDate(this.adapter().endOfMonth(base));
  }
  
  isCellFocused(cell: CalendarCell): boolean {
    const f = this.focusedDate();
    if (!f) return false;
    return this.adapter().isSameDay(cell.date, f);
  }  
  
  onKeydown(ev: KeyboardEvent) {
    if (this.isDisabled()) return;
  
    // ---- TAB / SHIFT+TAB -> close popup ----
    if (ev.key === 'Tab' && this.isOpen()) {
      // Do NOT preventDefault -> allow normal focus navigation
      this.close('blur');
      return;
    }
  
    // Escape closes without commit
    if (ev.key === 'Escape' && this.isOpen()) {
      ev.preventDefault();
      this.close('escape');
      return;
    }
  
    // Open when closed
    if (!this.isOpen() && (ev.key === 'ArrowDown' || ev.key === 'Enter')) {
      ev.preventDefault();
      this.open('programmatic');
      return;
    }
  
    // Keyboard navigation only when open
    if (!this.isOpen()) return;
  
    switch (ev.key) {
      case 'ArrowLeft':
        ev.preventDefault();
        this.moveFocusedByDays(-1);
        return;
  
      case 'ArrowRight':
        ev.preventDefault();
        this.moveFocusedByDays(1);
        return;
  
      case 'ArrowUp':
        ev.preventDefault();
        this.moveFocusedByDays(-7);
        return;
  
      case 'ArrowDown':
        ev.preventDefault();
        this.moveFocusedByDays(7);
        return;
  
      case 'PageUp':
        ev.preventDefault();
        this.moveFocusedByMonths(-1);
        return;
  
      case 'PageDown':
        ev.preventDefault();
        this.moveFocusedByMonths(1);
        return;
  
      case 'Home':
        ev.preventDefault();
        this.moveFocusedToStartOfMonth();
        return;
  
      case 'End':
        ev.preventDefault();
        this.moveFocusedToEndOfMonth();
        return;
  
      case 'Enter': {
        ev.preventDefault();
        const f = this.focusedDate();
        if (!f) return;
  
        const clamped = this.clampToBounds(f);
        this.draft.set(clamped);
  
        this.value = clamped;
        this.inputValue.set(this.adapter().format(clamped, this.displayFormat(), this.locale() ?? undefined));
        this.onChange(clamped);
        this.onTouched();
  
        this.close('selection');
        return;
      }
    }
  }  

  /* =====================
   * Calendar actions
   * ===================== */
  selectMonth(monthIndex0: number): void {
    if (this.isDisabled()) return;

    const base = this.draft() ?? this.value ?? this.adapter().startOfDay(new Date());
    const day = this.adapter().date(base);

    const m = this.adapter().setMonth(base, monthIndex0);
    const nextDay = Math.min(day, this.adapter().daysInMonth(m));

    this.draft.set(this.clampToBounds(this.adapter().setDate(m, nextDay)));
  }

  selectYear(year: number): void {
    if (this.isDisabled()) return;

    const base = this.draft() ?? this.value ?? this.adapter().startOfDay(new Date());
    const day = this.adapter().date(base);

    const y = this.adapter().setYear(base, year);
    const nextDay = Math.min(day, this.adapter().daysInMonth(y));

    this.draft.set(this.clampToBounds(this.adapter().setDate(y, nextDay)));
  }

  // day click commits + closes (as you requested)
  selectDay(cell: { date: Date }) {
    if (this.isDisabled()) return;

    const d = this.adapter().startOfDay(cell.date);
    if (!this.isWithinBounds(d)) return;

    const clamped = this.clampToBounds(d);
    this.draft.set(clamped);

    this.value = clamped;

    const formatted = this.adapter().format(clamped, this.displayFormat(), this.locale() ?? undefined);
    this.inputValue.set(formatted);

    this.onChange(clamped);
    this.onTouched();

    this.close('selection');
  }

  cancel(): void {
    if (this.isDisabled()) return;

    this.draft.set(this.value);

    const formatted = this.value
      ? this.adapter().format(this.value, this.displayFormat(), this.locale() ?? undefined)
      : '';

    this.inputValue.set(formatted);
    this.close('blur');
    this.onTouched();
  }

  confirm(): void {
    if (this.isDisabled()) return;

    const d = this.draft();
    if (!d) {
      this.value = null;
      this.inputValue.set('');
      this.onChange(null);
      this.onTouched();
      this.close('selection');
      return;
    }

    const clamped = this.clampToBounds(d);
    this.value = clamped;

    const formatted = this.adapter().format(clamped, this.displayFormat(), this.locale() ?? undefined);
    this.inputValue.set(formatted);

    this.onChange(clamped);
    this.onTouched();
    this.close('selection');
  }

  /* =====================
   * Selection helpers
   * ===================== */
  isMonthSelected(monthIndex0: number): boolean {
    return this.selectedMonth() === monthIndex0;
  }

  isYearSelected(year: number): boolean {
    return this.selectedYear() === year;
  }

  isCellSelected(cell: CalendarCell): boolean {
    const d = this.draft() ?? this.value;
    return !!d && this.adapter().isSameDay(cell.date, d);
  }

  isCellDisabled(cell: CalendarCell): boolean {
    return !this.isWithinBounds(cell.date);
  }

  isMonthDisabled(monthIndex0: number): boolean {
    const min = this.minD();
    const max = this.maxD();
    if (!min && !max) return false;

    const y = this.selectedYear();
    const start = this.adapter().startOfDay(this.adapter().setYear(this.adapter().setMonth(new Date(), monthIndex0), y));
    const end = this.adapter().endOfMonth(start);

    if (min && this.adapter().isBeforeDay(end, min)) return true;
    if (max && this.adapter().isAfterDay(start, max)) return true;
    return false;
  }

  isYearDisabled(year: number): boolean {
    const min = this.minD();
    const max = this.maxD();
    if (!min && !max) return false;

    const start = this.adapter().startOfDay(this.adapter().setYear(this.adapter().setMonth(new Date(), 0), year));
    const end = this.adapter().endOfYear(start);

    if (min && this.adapter().isBeforeDay(end, min)) return true;
    if (max && this.adapter().isAfterDay(start, max)) return true;
    return false;
  }

  /* =====================
   * Internals
   * ===================== */
  private clampToBounds(d: Date): Date {
    const min = this.minD();
    const max = this.maxD();
    if (min && this.adapter().isBeforeDay(d, min)) return min;
    if (max && this.adapter().isAfterDay(d, max)) return max;
    return d;
  }

  private isWithinBounds(d: Date): boolean {
    const min = this.minD();
    const max = this.maxD();
    if (min && this.adapter().isBeforeDay(d, min)) return false;
    if (max && this.adapter().isAfterDay(d, max)) return false;
    return true;
  }
}
