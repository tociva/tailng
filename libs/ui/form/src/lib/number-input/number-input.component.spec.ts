// number-input.component.spec.ts
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TngNumberInput } from './number-input.component';

@Component({
  selector: 'tng-number-input-host',
  standalone: true,
  imports: [ReactiveFormsModule, TngNumberInput],
  template: `
    <form [formGroup]="form">
      <tng-number-input
        formControlName="number"
        [placeholder]="placeholder"
        [slot]="slot"
        [prefixClickable]="prefixClickable"
        [readonly]="readonlyInput"
        [min]="minValue"
        [max]="maxValue"
        [step]="stepValue"
      >
        <span tngPrefix>prefix</span>
        <span tngSuffix>suffix</span>
      </tng-number-input>
    </form>
  `,
})
class HostComponent {
  placeholder = 'Enter number...';

  // Keep it typed if you export slot types publicly; left as any for copy/paste ease.
  slot: any = {};

  prefixClickable = false;

  readonlyInput = false;

  minValue: number | null = null;
  maxValue: number | null = null;
  stepValue: number | 'any' | null = null;

  form = new FormGroup({
    number: new FormControl<number | null>(null, {
      nonNullable: false,
    }),
  });

  get ctrl() {
    return this.form.controls.number;
  }
}

describe('TngNumberInput (CVA + slot styling)', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  const getTngInstance = (): TngNumberInput => {
    const de = fixture.debugElement.query(By.directive(TngNumberInput));
    return de.componentInstance as TngNumberInput;
  };

  const getFrameEl = (): HTMLDivElement => {
    // Root frame in your template is the first <div>
    return fixture.debugElement.query(By.css('tng-number-input > div'))
      .nativeElement as HTMLDivElement;
  };

  const getPrefixEl = (): HTMLSpanElement => {
    return fixture.debugElement.query(By.css('tng-number-input > div > span'))
      .nativeElement as HTMLSpanElement;
  };

  const getInputEl = (): HTMLInputElement => {
    return fixture.debugElement.query(By.css('tng-number-input input'))
      .nativeElement as HTMLInputElement;
  };

  const getSuffixEl = (): HTMLSpanElement => {
    // second span inside the frame
    return fixture.debugElement.queryAll(By.css('tng-number-input > div > span'))[1]
      .nativeElement as HTMLSpanElement;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('binds placeholder to the native input', () => {
    // Create a fresh fixture for this test
    const fix = TestBed.createComponent(HostComponent);
    const h = fix.componentInstance;

    // Set input BEFORE initial CD
    h.placeholder = 'New placeholder';

    fix.detectChanges();

    const input = fix.debugElement.query(By.css('tng-number-input input'))
      .nativeElement as HTMLInputElement;
    expect(input.placeholder).toBe('New placeholder');
  });

  it('writeValue from form control updates the native input value', () => {
    host.ctrl.setValue(42);
    fixture.detectChanges();

    const input = getInputEl();
    expect(input.value).toBe('42');
  });

  it('typing into input updates the form control value (CVA onChange)', () => {
    const input = getInputEl();

    input.value = '123';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(host.ctrl.value).toBe(123);
  });

  it('empty input sets form control to null', () => {
    const input = getInputEl();

    // Set a value first
    input.value = '42';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(host.ctrl.value).toBe(42);

    // Clear it
    input.value = '';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(host.ctrl.value).toBe(null);
  });

  it('invalid input (NaN) sets form control to null', () => {
    const input = getInputEl();

    // Try to set an invalid value (this shouldn't happen with type="number", but test the protection)
    input.value = 'abc';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(host.ctrl.value).toBe(null);
  });

  it('blur marks control as touched (CVA onTouched)', () => {
    const input = getInputEl();

    expect(host.ctrl.touched).toBe(false);

    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(host.ctrl.touched).toBe(true);
  });

  it('clamps value to min/max on blur', () => {
    // Create a fresh fixture for this test
    const fix = TestBed.createComponent(HostComponent);
    const h = fix.componentInstance;

    // Set min/max BEFORE initial CD
    h.minValue = 0;
    h.maxValue = 100;

    fix.detectChanges();

    const input = fix.debugElement.query(By.css('tng-number-input input'))
      .nativeElement as HTMLInputElement;

    // Set value below min
    input.value = '-10';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(h.ctrl.value).toBe(-10);

    // Blur should clamp it
    input.dispatchEvent(new Event('blur'));
    fix.detectChanges();
    expect(h.ctrl.value).toBe(0); // clamped to min

    // Set value above max
    input.value = '150';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(h.ctrl.value).toBe(150);

    // Blur should clamp it
    input.dispatchEvent(new Event('blur'));
    fix.detectChanges();
    expect(h.ctrl.value).toBe(100); // clamped to max
  });

  it('disables input when form control is disabled (forms → component)', () => {
    const input = getInputEl();
    const frame = getFrameEl();

    host.ctrl.disable();
    fixture.detectChanges();

    expect(input.disabled).toBe(true);
    // Your frameClassFinal adds these when disabled
    expect(frame.className).toContain('pointer-events-none');
    expect(frame.className).toContain('opacity-50');
  });

  it('sets readonly and applies readonly frame styles', () => {
    // Create a fresh fixture for this test
    const fix = TestBed.createComponent(HostComponent);
    const h = fix.componentInstance;

    // Set input BEFORE initial CD
    h.readonlyInput = true;

    fix.detectChanges();

    const input = fix.debugElement.query(By.css('tng-number-input input'))
      .nativeElement as HTMLInputElement;
    const frame = fix.debugElement.query(By.css('tng-number-input > div'))
      .nativeElement as HTMLDivElement;
    expect(input.readOnly).toBe(true);
    expect(frame.className).toContain('bg-muted/30');
    expect(frame.className).toContain('text-muted');
  });

  it('prefix is non-clickable by default (pointer-events-none)', () => {
    const prefix = getPrefixEl();
    expect(prefix.className).toContain('pointer-events-none');
  });

  it('prefix becomes clickable when prefixClickable=true', () => {
    // Create a fresh fixture for this test
    const fix = TestBed.createComponent(HostComponent);
    const h = fix.componentInstance;

    // Set input BEFORE initial CD
    h.prefixClickable = true;

    fix.detectChanges();

    const prefix = fix.debugElement.queryAll(By.css('tng-number-input > div > span'))[0]
      .nativeElement as HTMLSpanElement;

    expect(prefix.className).not.toContain('pointer-events-none');
  });

  it('applies slot classes to frame, input, prefix, and suffix', () => {
    // Create a fresh fixture for this test
    const fix = TestBed.createComponent(HostComponent);
    const h = fix.componentInstance;

    // Set input BEFORE initial CD
    h.slot = {
      frame: 'ring-1 ring-red-500',
      input: 'text-red-600',
      prefix: 'pl-2',
      suffix: 'pr-2',
    };

    fix.detectChanges();

    const frame = fix.debugElement.query(By.css('tng-number-input > div'))
      .nativeElement as HTMLDivElement;
    const input = fix.debugElement.query(By.css('tng-number-input input'))
      .nativeElement as HTMLInputElement;
    const prefix = fix.debugElement.query(By.css('tng-number-input > div > span'))
      .nativeElement as HTMLSpanElement;
    const suffix = fix.debugElement.queryAll(By.css('tng-number-input > div > span'))[1]
      .nativeElement as HTMLSpanElement;

    expect(frame.classList.contains('ring-1')).toBe(true);
    expect(frame.classList.contains('ring-red-500')).toBe(true);

    expect(input.classList.contains('text-red-600')).toBe(true);

    expect(prefix.classList.contains('pl-2')).toBe(true);
    expect(suffix.classList.contains('pr-2')).toBe(true);
  });

  it('applies slot array values (Tailwind-friendly)', () => {
    // Create a fresh fixture for this test
    const fix = TestBed.createComponent(HostComponent);
    const h = fix.componentInstance;

    // Set input BEFORE initial CD
    h.slot = {
      input: ['text-sm', 'font-semibold'],
    };

    fix.detectChanges();

    const input = fix.debugElement.query(By.css('tng-number-input input'))
      .nativeElement as HTMLInputElement;
    expect(input.classList.contains('text-sm')).toBe(true);
    expect(input.classList.contains('font-semibold')).toBe(true);
  });

  it('recomputes class finals without throwing (sanity for computed)', () => {
    // Create a fresh fixture for this test
    const fix = TestBed.createComponent(HostComponent);
    const h = fix.componentInstance;

    // Set inputs BEFORE initial CD
    h.slot = { input: 'text-blue-600' };
    h.readonlyInput = true;

    fix.detectChanges();

    const comp = fix.debugElement.query(By.directive(TngNumberInput))
      .componentInstance as TngNumberInput;

    // Access finals (should be safe and consistent)
    expect(typeof comp.frameClassFinal()).toBe('string');
    expect(typeof comp.inputClassFinal()).toBe('string');
    expect(typeof comp.prefixClassFinal()).toBe('string');
    expect(typeof comp.suffixClassFinal()).toBe('string');
  });
});
