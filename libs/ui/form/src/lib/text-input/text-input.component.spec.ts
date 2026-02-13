// text-input.component.spec.ts
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TngTextInput } from './text-input.component';

// If you moved slot types to separate files, you can import them here.
// Otherwise keep it loose in the demo host.
// import type { TngSlotMap, TngTextInputSlot } from './text-input.slots';

@Component({
  selector: 'tng-text-input-host',
  standalone: true,
  imports: [ReactiveFormsModule, TngTextInput],
  template: `
    <form [formGroup]="form">
      <tng-text-input
        formControlName="text"
        [placeholder]="placeholder"
        [slot]="slot"
        [prefixClickable]="prefixClickable"
        [readonly]="readonlyInput"
      >
        <span tngPrefix>prefix</span>
        <span tngSuffix>suffix</span>
      </tng-text-input>
    </form>
  `,
})
class HostComponent {
  placeholder = 'Enter text...';

  // Keep it typed if you export slot types publicly; left as any for copy/paste ease.
  slot: any = {};

  prefixClickable = false;

  readonlyInput = false;

  form = new FormGroup({
    text: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  get ctrl() {
    return this.form.controls.text;
  }
}

describe('TngTextInput (CVA + slot styling)', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  const getTngInstance = (): TngTextInput => {
    const de = fixture.debugElement.query(By.directive(TngTextInput));
    return de.componentInstance as TngTextInput;
  };

  const getFrameEl = (): HTMLDivElement => {
    // Root frame in your template is the first <div>
    return fixture.debugElement.query(By.css('tng-text-input > div'))
      .nativeElement as HTMLDivElement;
  };

  const getPrefixEl = (): HTMLSpanElement => {
    return fixture.debugElement.query(By.css('tng-text-input > div > span'))
      .nativeElement as HTMLSpanElement;
  };

  const getInputEl = (): HTMLInputElement => {
    return fixture.debugElement.query(By.css('tng-text-input input'))
      .nativeElement as HTMLInputElement;
  };

  const getSuffixEl = (): HTMLSpanElement => {
    // second span inside the frame
    return fixture.debugElement.queryAll(By.css('tng-text-input > div > span'))[1]
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

    const input = fix.debugElement.query(By.css('tng-text-input input'))
      .nativeElement as HTMLInputElement;
    expect(input.placeholder).toBe('New placeholder');
  });

  it('writeValue from form control updates the native input value', () => {
    host.ctrl.setValue('hello');
    fixture.detectChanges();

    const input = getInputEl();
    expect(input.value).toBe('hello');
  });

  it('typing into input updates the form control value (CVA onChange)', () => {
    const input = getInputEl();

    input.value = 'abc';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(host.ctrl.value).toBe('abc');
  });

  it('blur marks control as touched (CVA onTouched)', () => {
    const input = getInputEl();

    expect(host.ctrl.touched).toBe(false);

    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(host.ctrl.touched).toBe(true);
  });

  it('does not emit value changes during IME composition until compositionend', () => {
    const input = getInputEl();
    const changes: string[] = [];
    const sub = host.ctrl.valueChanges.subscribe((v) => changes.push(v ?? ''));

    // start composition
    input.dispatchEvent(new Event('compositionstart'));
    fixture.detectChanges();

    // input during composition should be ignored
    input.value = 'にほん';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(host.ctrl.value).toBe(''); // still the previous value (initial '')
    expect(changes.length).toBe(0);

    // composition end should commit
    input.dispatchEvent(new Event('compositionend'));
    fixture.detectChanges();

    expect(host.ctrl.value).toBe('にほん');
    expect(changes).toEqual(['にほん']);

    sub.unsubscribe();
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

    const input = fix.debugElement.query(By.css('tng-text-input input'))
      .nativeElement as HTMLInputElement;
    const frame = fix.debugElement.query(By.css('tng-text-input > div'))
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
  
    const prefix = fix.debugElement.queryAll(By.css('tng-text-input > div > span'))[0]
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

    const frame = fix.debugElement.query(By.css('tng-text-input > div'))
      .nativeElement as HTMLDivElement;
    const input = fix.debugElement.query(By.css('tng-text-input input'))
      .nativeElement as HTMLInputElement;
    const prefix = fix.debugElement.query(By.css('tng-text-input > div > span'))
      .nativeElement as HTMLSpanElement;
    const suffix = fix.debugElement.queryAll(By.css('tng-text-input > div > span'))[1]
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

    const input = fix.debugElement.query(By.css('tng-text-input input'))
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

    const comp = fix.debugElement.query(By.directive(TngTextInput))
      .componentInstance as TngTextInput;

    // Access finals (should be safe and consistent)
    expect(typeof comp.frameClassFinal()).toBe('string');
    expect(typeof comp.inputClassFinal()).toBe('string');
    expect(typeof comp.prefixClassFinal()).toBe('string');
    expect(typeof comp.suffixClassFinal()).toBe('string');
  });

});