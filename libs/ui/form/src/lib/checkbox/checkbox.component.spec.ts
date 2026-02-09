// checkbox.component.spec.ts
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TngCheckbox } from './checkbox.component';

/* ─────────────────────────
 * Host: Reactive Forms usage
 * ───────────────────────── */
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TngCheckbox],
  template: `
    <form [formGroup]="form">
      <tng-checkbox
        formControlName="checked"
        [label]="label"
        [id]="id"
        [name]="name"
        [required]="required"
        [slot]="slot"
      />
    </form>
  `,
})
class FormHostComponent {
  label = 'I agree to the terms';
  id = '';
  name = '';
  required = false;

  // Keep it typed if you export slot types publicly; left as any for copy/paste ease.
  slot: any = {};

  form = new FormGroup({
    checked: new FormControl<boolean>(false, {
      nonNullable: true,
    }),
  });

  get ctrl() {
    return this.form.controls.checked;
  }
}

/* ─────────────────────────
 * Host: Standalone usage
 * ───────────────────────── */
@Component({
  standalone: true,
  imports: [TngCheckbox],
  template: `
    <tng-checkbox
      [label]="label"
      [disabled]="disabled"
      [tristate]="tristate"
      [cycle]="cycle"
    />
  `,
})
class StandaloneHostComponent {
  label = 'Standalone checkbox';
  disabled = false;
  tristate = false;
  cycle: 'mixed-first' | 'unchecked-first' = 'mixed-first';
}

/* ─────────────────────────
 * Host: Tri-state usage
 * ───────────────────────── */
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TngCheckbox],
  template: `
    <form [formGroup]="form">
      <tng-checkbox
        formControlName="value"
        [label]="label"
        [tristate]="true"
        [cycle]="cycle"
      />
    </form>
  `,
})
class TriStateHostComponent {
  label = 'Tri-state checkbox';
  cycle: 'mixed-first' | 'unchecked-first' = 'mixed-first';

  form = new FormGroup({
    value: new FormControl<boolean | null>(null, {
      nonNullable: false,
    }),
  });

  get ctrl() {
    return this.form.controls.value;
  }
}

describe('TngCheckbox (CVA + slot styling)', () => {
  describe('Reactive Forms integration (CVA)', () => {
    let fixture: ComponentFixture<FormHostComponent>;
    let host: FormHostComponent;

    const getTngInstance = (): TngCheckbox => {
      const de = fixture.debugElement.query(By.directive(TngCheckbox));
      return de.componentInstance as TngCheckbox;
    };

    const getRootEl = (): HTMLLabelElement => {
      return fixture.debugElement.query(By.css('tng-checkbox > label'))
        .nativeElement as HTMLLabelElement;
    };

    const getInputEl = (): HTMLInputElement => {
      return fixture.debugElement.query(By.css('tng-checkbox input'))
        .nativeElement as HTMLInputElement;
    };

    const getLabelEl = (): HTMLSpanElement | null => {
      const span = fixture.debugElement.query(By.css('tng-checkbox label span'));
      return span ? (span.nativeElement as HTMLSpanElement) : null;
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FormHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(FormHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('writes value from form control into checkbox', () => {
      host.ctrl.setValue(true);
      fixture.detectChanges();

      const input = getInputEl();
      expect(input.checked).toBe(true);
    });

    it('toggling checkbox updates the form control value (CVA onChange)', () => {
      const input = getInputEl();

      expect(host.ctrl.value).toBe(false);

      // Simulate checkbox toggle
      input.checked = true;
      input.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(host.ctrl.value).toBe(true);
    });

    it('blur marks control as touched (CVA onTouched)', () => {
      const input = getInputEl();

      expect(host.ctrl.touched).toBe(false);

      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(host.ctrl.touched).toBe(true);
    });

    it('disables checkbox when form control is disabled (forms → component)', () => {
      const input = getInputEl();

      host.ctrl.disable();
      fixture.detectChanges();

      expect(input.disabled).toBe(true);
      // Check disabled styling classes (Tailwind pseudo-classes applied when disabled)
      expect(input.className).toContain('disabled:opacity-50');
      expect(input.className).toContain('disabled:pointer-events-none');
    });

    it('renders label when provided', () => {
      const label = getLabelEl();
      expect(label).not.toBeNull();
      expect(label?.textContent?.trim()).toBe('I agree to the terms');
    });

    it('does not render label span when label is empty', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.label = '';

      fix.detectChanges();

      const label = fix.debugElement.query(By.css('tng-checkbox label span'));
      expect(label).toBeNull();
    });

    it('binds id to the native input', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.id = 'checkbox-id';

      fix.detectChanges();

      const input = fix.debugElement.query(By.css('tng-checkbox input'))
        .nativeElement as HTMLInputElement;
      expect(input.id).toBe('checkbox-id');
    });

    it('binds name to the native input', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.name = 'checkbox-name';

      fix.detectChanges();

      const input = fix.debugElement.query(By.css('tng-checkbox input'))
        .nativeElement as HTMLInputElement;
      expect(input.name).toBe('checkbox-name');
    });

    it('binds required to the native input', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.required = true;

      fix.detectChanges();

      const input = fix.debugElement.query(By.css('tng-checkbox input'))
        .nativeElement as HTMLInputElement;
      expect(input.required).toBe(true);
    });

    it('works with Validators.requiredTrue', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      h.form = new FormGroup({
        checked: new FormControl(false, {
          nonNullable: true,
          validators: [Validators.requiredTrue],
        }),
      });

      fix.detectChanges();

      expect(h.ctrl.invalid).toBe(true);

      h.ctrl.setValue(true);
      fix.detectChanges();

      expect(h.ctrl.valid).toBe(true);
    });

    it('applies slot classes to root, input, and label', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.slot = {
        root: 'border-2 border-blue-500 p-2',
        input: 'h-5 w-5 accent-green-600',
        label: 'text-lg font-bold text-purple-600',
      };

      fix.detectChanges();

      const root = fix.debugElement.query(By.css('tng-checkbox > label'))
        .nativeElement as HTMLLabelElement;
      const input = fix.debugElement.query(By.css('tng-checkbox input'))
        .nativeElement as HTMLInputElement;
      const label = fix.debugElement.query(By.css('tng-checkbox label span'))
        .nativeElement as HTMLSpanElement;

      expect(root.classList.contains('border-2')).toBe(true);
      expect(root.classList.contains('border-blue-500')).toBe(true);

      expect(input.classList.contains('h-5')).toBe(true);
      expect(input.classList.contains('w-5')).toBe(true);
      expect(input.classList.contains('accent-green-600')).toBe(true);

      expect(label.classList.contains('text-lg')).toBe(true);
      expect(label.classList.contains('font-bold')).toBe(true);
      expect(label.classList.contains('text-purple-600')).toBe(true);
    });

    it('applies slot array values (Tailwind-friendly)', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.slot = {
        input: ['h-5', 'w-5', 'rounded-full'],
      };

      fix.detectChanges();

      const input = fix.debugElement.query(By.css('tng-checkbox input'))
        .nativeElement as HTMLInputElement;
      expect(input.classList.contains('h-5')).toBe(true);
      expect(input.classList.contains('w-5')).toBe(true);
      expect(input.classList.contains('rounded-full')).toBe(true);
    });

    it('recomputes class finals without throwing (sanity for computed)', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set inputs BEFORE initial CD
      h.slot = { root: 'border-2', input: 'h-5', label: 'text-lg' };

      fix.detectChanges();

      const comp = fix.debugElement.query(By.directive(TngCheckbox))
        .componentInstance as TngCheckbox;

      // Access finals (should be safe and consistent)
      expect(typeof comp.rootClassFinal()).toBe('string');
      expect(typeof comp.inputClassFinal()).toBe('string');
      expect(typeof comp.labelClassFinal()).toBe('string');
    });
  });

  describe('Standalone disabled input', () => {
    let fixture: ComponentFixture<StandaloneHostComponent>;
    let host: StandaloneHostComponent;

    const getInput = (): HTMLInputElement =>
      fixture.debugElement.query(By.css('input')).nativeElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StandaloneHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(StandaloneHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('respects [disabled] input when not using forms', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(StandaloneHostComponent);
      const h = fix.componentInstance;

      // Set disabled BEFORE initial CD
      h.disabled = true;

      fix.detectChanges();

      const input = fix.debugElement.query(By.css('input'))
        .nativeElement as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it('prevents toggling when disabled', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(StandaloneHostComponent);
      const h = fix.componentInstance;

      // Set disabled BEFORE initial CD
      h.disabled = true;

      fix.detectChanges();

      const input = fix.debugElement.query(By.css('input'))
        .nativeElement as HTMLInputElement;
      const initialChecked = input.checked;

      // Try to toggle
      input.checked = !initialChecked;
      input.dispatchEvent(new Event('change'));
      fix.detectChanges();

      // Should not change (component's onToggle checks isDisabled)
      const comp = fix.debugElement.query(By.directive(TngCheckbox))
        .componentInstance as TngCheckbox;
      expect(comp.value()).toBe(false); // Initial value
    });
  });

  describe('Tri-state functionality', () => {
    let fixture: ComponentFixture<TriStateHostComponent>;
    let host: TriStateHostComponent;

    const getInput = (): HTMLInputElement =>
      fixture.debugElement.query(By.css('input')).nativeElement;

    const getComponent = (): TngCheckbox =>
      fixture.debugElement.query(By.directive(TngCheckbox))
        .componentInstance;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TriStateHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TriStateHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('sets indeterminate when value is null', () => {
      host.ctrl.setValue(null);
      fixture.detectChanges();

      const input = getInput();
      expect(input.indeterminate).toBe(true);
      expect(input.checked).toBe(false); // Native convention
    });

    it('cycles through states with mixed-first mode (null → true → false → null)', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(TriStateHostComponent);
      const h = fix.componentInstance;

      // Set cycle BEFORE initial CD
      h.cycle = 'mixed-first';

      fix.detectChanges();

      const comp = fix.debugElement.query(By.directive(TngCheckbox))
        .componentInstance as TngCheckbox;
      const input = fix.debugElement.query(By.css('input'))
        .nativeElement as HTMLInputElement;

      // Start with null
      h.ctrl.setValue(null);
      fix.detectChanges();
      expect(comp.value()).toBe(null);
      expect(input.indeterminate).toBe(true);

      // Toggle: null → true
      input.checked = true;
      input.dispatchEvent(new Event('change'));
      fix.detectChanges();
      expect(h.ctrl.value).toBe(true);
      expect(input.indeterminate).toBe(false);
      expect(input.checked).toBe(true);

      // Toggle: true → false
      input.checked = false;
      input.dispatchEvent(new Event('change'));
      fix.detectChanges();
      expect(h.ctrl.value).toBe(false);
      expect(input.indeterminate).toBe(false);
      expect(input.checked).toBe(false);

      // Toggle: false → null
      input.checked = true; // Native checkbox becomes checked
      input.dispatchEvent(new Event('change'));
      fix.detectChanges();
      expect(h.ctrl.value).toBe(null);
      expect(input.indeterminate).toBe(true);
    });

    it('cycles through states with unchecked-first mode (false → null → true → false)', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(TriStateHostComponent);
      const h = fix.componentInstance;

      // Set cycle BEFORE initial CD
      h.cycle = 'unchecked-first';

      fix.detectChanges();

      const comp = fix.debugElement.query(By.directive(TngCheckbox))
        .componentInstance as TngCheckbox;
      const input = fix.debugElement.query(By.css('input'))
        .nativeElement as HTMLInputElement;

      // Start with false
      h.ctrl.setValue(false);
      fix.detectChanges();
      expect(comp.value()).toBe(false);
      expect(input.indeterminate).toBe(false);
      expect(input.checked).toBe(false);

      // Toggle: false → null
      input.checked = true; // Native checkbox becomes checked
      input.dispatchEvent(new Event('change'));
      fix.detectChanges();
      expect(h.ctrl.value).toBe(null);
      expect(input.indeterminate).toBe(true);

      // Toggle: null → true
      input.checked = true;
      input.dispatchEvent(new Event('change'));
      fix.detectChanges();
      expect(h.ctrl.value).toBe(true);
      expect(input.indeterminate).toBe(false);
      expect(input.checked).toBe(true);

      // Toggle: true → false
      input.checked = false;
      input.dispatchEvent(new Event('change'));
      fix.detectChanges();
      expect(h.ctrl.value).toBe(false);
      expect(input.indeterminate).toBe(false);
      expect(input.checked).toBe(false);
    });

    it('handles boolean values when tristate is false', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(StandaloneHostComponent);
      const h = fix.componentInstance;

      h.tristate = false;
      h.label = 'Regular checkbox';

      fix.detectChanges();

      const comp = fix.debugElement.query(By.directive(TngCheckbox))
        .componentInstance as TngCheckbox;
      const input = fix.debugElement.query(By.css('input'))
        .nativeElement as HTMLInputElement;

      // Toggle should work normally (true/false only)
      input.checked = true;
      input.dispatchEvent(new Event('change'));
      fix.detectChanges();

      expect(comp.value()).toBe(true);
      expect(input.indeterminate).toBe(false);

      input.checked = false;
      input.dispatchEvent(new Event('change'));
      fix.detectChanges();

      expect(comp.value()).toBe(false);
      expect(input.indeterminate).toBe(false);
    });
  });
});
