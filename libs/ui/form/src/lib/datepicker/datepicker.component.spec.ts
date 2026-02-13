import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TngDatepicker } from './datepicker.component';

/* ─────────────────────────
 * Host: Reactive Forms usage
 * ───────────────────────── */
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TngDatepicker],
  template: `
    <form [formGroup]="form">
      <tng-datepicker
        formControlName="date"
        [min]="min"
        [max]="max"
        [displayFormat]="displayFormat"
        [previewFormat]="previewFormat"
        [slot]="slot"
      />
    </form>
  `,
})
class FormHostComponent {
  min: Date | null = null;
  max: Date | null = null;
  displayFormat = 'DD/MM/YYYY';
  previewFormat = 'DD MMM YYYY';

  // Keep it typed if you export slot types publicly; left as any for copy/paste ease.
  slot: any = {};

  form = new FormGroup({
    date: new FormControl<Date | null>(null, { nonNullable: false }),
  });

  get ctrl() {
    return this.form.controls.date;
  }
}

/* ─────────────────────────
 * Host: Standalone usage
 * ───────────────────────── */
@Component({
  standalone: true,
  imports: [TngDatepicker],
  template: `
    <tng-datepicker
      [disabled]="disabled"
      [min]="min"
      [max]="max"
      [slot]="slot"
    />
  `,
})
class StandaloneHostComponent {
  disabled = false;
  min: Date | null = null;
  max: Date | null = null;

  // Keep it typed if you export slot types publicly; left as any for copy/paste ease.
  slot: any = {};
}

describe('TngDatepicker (CVA + slot styling)', () => {
  describe('Reactive Forms integration (CVA)', () => {
    let fixture: ComponentFixture<FormHostComponent>;
    let host: FormHostComponent;

    const getTngInstance = (): TngDatepicker => {
      const de = fixture.debugElement.query(By.directive(TngDatepicker));
      return de.componentInstance as TngDatepicker;
    };

    const getInput = (): HTMLInputElement =>
      fixture.debugElement.query(By.css('tng-datepicker input')).nativeElement;

    const getToggleButton = (): HTMLButtonElement =>
      fixture.debugElement.query(By.css('tng-datepicker button[aria-label="Open calendar"]'))
        .nativeElement as HTMLButtonElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FormHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(FormHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('writes value from form control into input', () => {
      const testDate = new Date(2024, 0, 15); // Jan 15, 2024
      host.ctrl.setValue(testDate);
      fixture.detectChanges();

      const input = getInput();
      expect(input.value).toBe('15/01/2024');
    });

    it('clears input when form control is set to null', () => {
      const testDate = new Date(2024, 0, 15);
      host.ctrl.setValue(testDate);
      fixture.detectChanges();

      host.ctrl.setValue(null);
      fixture.detectChanges();

      const input = getInput();
      expect(input.value).toBe('');
    });

    it('disables input when form control is disabled', () => {
      host.ctrl.disable();
      fixture.detectChanges();

      const input = getInput();
      expect(input.disabled).toBe(true);
    });

    it('marks control as touched on blur', () => {
      const input = getInput();

      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(host.ctrl.touched).toBe(true);
    });

    it('opens overlay when toggle button is clicked', () => {
      const comp = getTngInstance();
      const toggle = getToggleButton();

      expect(comp.isOpen()).toBe(false);

      toggle.click();
      fixture.detectChanges();

      expect(comp.isOpen()).toBe(true);
    });

    it('opens overlay on input focus', () => {
      const comp = getTngInstance();
      const input = getInput();

      expect(comp.isOpen()).toBe(false);

      input.dispatchEvent(new Event('focus'));
      fixture.detectChanges();

      expect(comp.isOpen()).toBe(true);
    });

    it('closes overlay on Escape key', () => {
      const comp = getTngInstance();

      comp.open('programmatic');
      fixture.detectChanges();
      expect(comp.isOpen()).toBe(true);

      const input = getInput();
      input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape' })
      );
      fixture.detectChanges();

      expect(comp.isOpen()).toBe(false);
    });

    it('prevents opening overlay when disabled via form', () => {
      host.ctrl.disable();
      fixture.detectChanges();

      const comp = getTngInstance();
      const toggle = getToggleButton();

      toggle.click();
      fixture.detectChanges();

      expect(comp.isOpen()).toBe(false);
    });

    it('ignores input events when disabled via form', () => {
      host.ctrl.disable();
      fixture.detectChanges();

      const comp = getTngInstance();
      const input = getInput();

      input.value = '15/01/2024';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(comp.isOpen()).toBe(false);
    });

    it('clamps date to min when value is below min', () => {
      const minDate = new Date(2024, 0, 10); // Jan 10, 2024
      const belowMinDate = new Date(2024, 0, 5); // Jan 5, 2024

      // Create fresh fixture and set min before first detectChanges to avoid NG0100
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;
      h.min = minDate;
      fix.detectChanges();

      h.ctrl.setValue(belowMinDate);
      fix.detectChanges();

      const comp = fix.debugElement.query(By.directive(TngDatepicker)).componentInstance as TngDatepicker;
      // Check that the value was clamped by reading the internal value
      expect(comp['value']).toEqual(minDate);
    });

    it('clamps date to max when value is above max', () => {
      const maxDate = new Date(2024, 0, 20); // Jan 20, 2024
      const aboveMaxDate = new Date(2024, 0, 25); // Jan 25, 2024

      // Create fresh fixture and set max before first detectChanges to avoid NG0100
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;
      h.max = maxDate;
      fix.detectChanges();

      h.ctrl.setValue(aboveMaxDate);
      fix.detectChanges();

      const comp = fix.debugElement.query(By.directive(TngDatepicker)).componentInstance as TngDatepicker;
      // Check that the value was clamped by reading the internal value
      expect(comp['value']).toEqual(maxDate);
    });

    it('selects day and updates form control value', () => {
      const comp = getTngInstance();
      const testDate = new Date(2024, 0, 15);

      comp.open('programmatic');
      fixture.detectChanges();

      const cell = { date: testDate };
      comp.selectDay(cell);
      fixture.detectChanges();

      expect(host.ctrl.value).toEqual(testDate);
      expect(comp.isOpen()).toBe(false);
    });

    it('cancels selection and restores original value', () => {
      const originalDate = new Date(2024, 0, 10);
      host.ctrl.setValue(originalDate);
      fixture.detectChanges();

      const comp = getTngInstance();
      comp.open('programmatic');
      fixture.detectChanges();

      // Change draft
      const newDate = new Date(2024, 0, 20);
      comp['draft'].set(newDate);
      fixture.detectChanges();

      comp.cancel();
      fixture.detectChanges();

      expect(host.ctrl.value).toEqual(originalDate);
      expect(comp.isOpen()).toBe(false);
    });

    it('confirms draft and updates form control value', () => {
      const comp = getTngInstance();
      const testDate = new Date(2024, 0, 15);

      comp.open('programmatic');
      fixture.detectChanges();

      comp['draft'].set(testDate);
      fixture.detectChanges();

      comp.confirm();
      fixture.detectChanges();

      expect(host.ctrl.value).toEqual(testDate);
      expect(comp.isOpen()).toBe(false);
    });

    it('confirms null draft and clears form control value', () => {
      const originalDate = new Date(2024, 0, 10);
      host.ctrl.setValue(originalDate);
      fixture.detectChanges();

      const comp = getTngInstance();
      comp.open('programmatic');
      fixture.detectChanges();

      comp['draft'].set(null);
      fixture.detectChanges();

      comp.confirm();
      fixture.detectChanges();

      expect(host.ctrl.value).toBeNull();
      expect(comp.isOpen()).toBe(false);
    });

    it('applies slot styling to container', () => {
      // Set slot before first detectChanges
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;
      h.slot = { container: 'border-2 border-blue-500' };
      fix.detectChanges();

      const container = fix.debugElement.query(By.css('tng-datepicker > div'))
        .nativeElement as HTMLDivElement;
      expect(container.className).toContain('border-2');
      expect(container.className).toContain('border-blue-500');
    });

    it('applies slot styling to input', () => {
      // Set slot before first detectChanges
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;
      h.slot = { input: 'border-2 border-green-500' };
      fix.detectChanges();

      const input = fix.debugElement.query(By.css('tng-datepicker input')).nativeElement as HTMLInputElement;
      expect(input.className).toContain('border-2');
      expect(input.className).toContain('border-green-500');
    });
  });

  describe('Standalone disabled input', () => {
    let fixture: ComponentFixture<StandaloneHostComponent>;
    let host: StandaloneHostComponent;

    const getInput = (): HTMLInputElement =>
      fixture.debugElement.query(By.css('tng-datepicker input')).nativeElement;

    const getTngInstance = (): TngDatepicker => {
      const de = fixture.debugElement.query(By.directive(TngDatepicker));
      return de.componentInstance as TngDatepicker;
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StandaloneHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(StandaloneHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('respects [disabled] input when not using forms', () => {
      const fix = TestBed.createComponent(StandaloneHostComponent);
      const h = fix.componentInstance;

      // Set BEFORE first CD to avoid NG0100
      h.disabled = true;

      fix.detectChanges();

      const input = fix.debugElement.query(By.css('tng-datepicker input')).nativeElement as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it('prevents opening overlay when disabled', () => {
      const fix = TestBed.createComponent(StandaloneHostComponent);
      const h = fix.componentInstance;

      // set BEFORE first CD
      h.disabled = true;
      fix.detectChanges();

      const input = fix.debugElement.query(By.css('tng-datepicker input')).nativeElement as HTMLInputElement;
      input.dispatchEvent(new Event('focus'));
      fix.detectChanges();

      const comp = fix.debugElement.query(By.directive(TngDatepicker)).componentInstance as TngDatepicker;
      expect(comp.isOpen()).toBe(false);
    });

    it('prevents toggle overlay when disabled', () => {
      const fix = TestBed.createComponent(StandaloneHostComponent);
      const h = fix.componentInstance;

      h.disabled = true;
      fix.detectChanges();

      const toggle = fix.debugElement.query(By.css('tng-datepicker button[aria-label="Open calendar"]'))
        .nativeElement as HTMLButtonElement;
      toggle.click();
      fix.detectChanges();

      const comp = fix.debugElement.query(By.directive(TngDatepicker)).componentInstance as TngDatepicker;
      expect(comp.isOpen()).toBe(false);
    });
  });

  describe('Keyboard navigation', () => {
    let fixture: ComponentFixture<FormHostComponent>;
    let host: FormHostComponent;

    const getTngInstance = (): TngDatepicker => {
      const de = fixture.debugElement.query(By.directive(TngDatepicker));
      return de.componentInstance as TngDatepicker;
    };

    const getInput = (): HTMLInputElement =>
      fixture.debugElement.query(By.css('tng-datepicker input')).nativeElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FormHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(FormHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('opens overlay on ArrowDown when closed', () => {
      const comp = getTngInstance();
      const input = getInput();

      expect(comp.isOpen()).toBe(false);

      input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown' })
      );
      fixture.detectChanges();

      expect(comp.isOpen()).toBe(true);
    });

    it('opens overlay on Enter when closed', () => {
      const comp = getTngInstance();
      const input = getInput();

      expect(comp.isOpen()).toBe(false);

      input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' })
      );
      fixture.detectChanges();

      expect(comp.isOpen()).toBe(true);
    });

    it('navigates days with arrow keys when overlay is open', () => {
      const comp = getTngInstance();
      const input = getInput();
      const testDate = new Date(2024, 0, 15);

      comp.open('programmatic');
      comp['focusedDate'].set(testDate);
      fixture.detectChanges();

      input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight' })
      );
      fixture.detectChanges();

      const focused = comp['focusedDate']();
      expect(focused).not.toEqual(testDate);
    });

    it('selects focused date on Enter when overlay is open', () => {
      const comp = getTngInstance();
      const input = getInput();
      const testDate = new Date(2024, 0, 15);

      comp.open('programmatic');
      comp['focusedDate'].set(testDate);
      fixture.detectChanges();

      input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' })
      );
      fixture.detectChanges();

      expect(host.ctrl.value).toEqual(testDate);
      expect(comp.isOpen()).toBe(false);
    });

    it('navigates months with PageUp/PageDown', () => {
      const comp = getTngInstance();
      const input = getInput();
      const testDate = new Date(2024, 0, 15); // January

      comp.open('programmatic');
      comp['focusedDate'].set(testDate);
      fixture.detectChanges();

      input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'PageDown' })
      );
      fixture.detectChanges();

      const focused = comp['focusedDate']();
      expect(focused).not.toBeNull();
      expect(comp['adapter']().month(focused!)).toBe(1); // February
    });
  });

  describe('Month and Year selection', () => {
    let fixture: ComponentFixture<FormHostComponent>;
    let host: FormHostComponent;

    const getTngInstance = (): TngDatepicker => {
      const de = fixture.debugElement.query(By.directive(TngDatepicker));
      return de.componentInstance as TngDatepicker;
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FormHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(FormHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('selects month and updates draft', () => {
      const comp = getTngInstance();
      const testDate = new Date(2024, 0, 15); // January 15

      comp.open('programmatic');
      comp['draft'].set(testDate);
      fixture.detectChanges();

      comp.selectMonth(2); // March (0-indexed)
      fixture.detectChanges();

      const draft = comp['draft']();
      expect(draft).not.toBeNull();
      expect(comp['adapter']().month(draft!)).toBe(2);
    });

    it('selects year and updates draft', () => {
      const comp = getTngInstance();
      const testDate = new Date(2024, 0, 15);

      comp.open('programmatic');
      comp['draft'].set(testDate);
      fixture.detectChanges();

      comp.selectYear(2025);
      fixture.detectChanges();

      const draft = comp['draft']();
      expect(draft).not.toBeNull();
      expect(comp['adapter']().year(draft!)).toBe(2025);
    });

    it('prevents selecting disabled month', () => {
      const minDate = new Date(2024, 2, 1); // March 1, 2024
      const testDate = new Date(2024, 0, 15); // January 15, 2024

      // Set min before first detectChanges to avoid NG0100
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;
      h.min = minDate;
      fix.detectChanges();

      const comp = fix.debugElement.query(By.directive(TngDatepicker)).componentInstance as TngDatepicker;
      comp.open('programmatic');
      comp['draft'].set(testDate);
      fix.detectChanges();

      const isDisabled = comp.isMonthDisabled(0); // January should be disabled
      expect(isDisabled).toBe(true);
    });

    it('prevents selecting disabled year', () => {
      const minDate = new Date(2024, 0, 1);
      const testYear = 2023;

      // Set min before first detectChanges to avoid NG0100
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;
      h.min = minDate;
      fix.detectChanges();

      const comp = fix.debugElement.query(By.directive(TngDatepicker)).componentInstance as TngDatepicker;
      comp.open('programmatic');
      fix.detectChanges();

      const isDisabled = comp.isYearDisabled(testYear);
      expect(isDisabled).toBe(true);
    });
  });
});
