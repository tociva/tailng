// radio-button.component.spec.ts
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TngRadioButton } from './radio-button.component';

/* ─────────────────────────
 * Helpers
 * ───────────────────────── */
const getAllRadioInputs = (fix: ComponentFixture<any>): HTMLInputElement[] =>
  fix.debugElement
    .queryAll(By.css('tng-radio-button input[type="radio"]'))
    .map((de) => de.nativeElement as HTMLInputElement);

const getFirstRadioInput = (fix: ComponentFixture<any>): HTMLInputElement =>
  fix.debugElement.query(By.css('tng-radio-button input[type="radio"]'))
    .nativeElement as HTMLInputElement;

const getLabelEl = (fix: ComponentFixture<any>): HTMLLabelElement =>
  fix.debugElement.query(By.css('tng-radio-button label'))
    .nativeElement as HTMLLabelElement;

const getLabelSpan = (fix: ComponentFixture<any>): HTMLSpanElement | null => {
  const de = fix.debugElement.query(By.css('tng-radio-button label span'));
  return de ? (de.nativeElement as HTMLSpanElement) : null;
};

/* ─────────────────────────
 * Reactive Forms Hosts
 * ───────────────────────── */
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TngRadioButton],
  template: `
    <form [formGroup]="form">
      <tng-radio-button
        formControlName="choice"
        name="choice"
        value="option1"
        label="Option 1"
      />
      <tng-radio-button
        formControlName="choice"
        name="choice"
        value="option2"
        label="Option 2"
      />
    </form>
  `,
})
class RfBasicHost {
  form = new FormGroup({
    choice: new FormControl<string | null>(null),
  });

  get ctrl() {
    return this.form.controls.choice;
  }
}

/**
 * IMPORTANT:
 * Reactive forms should own disabled state.
 * So we DO NOT bind [disabled] here (avoids Angular warning + changed-after-checked risks).
 */
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TngRadioButton],
  template: `
    <form [formGroup]="form">
      <tng-radio-button
        formControlName="choice"
        [value]="value"
        [label]="label"
        [id]="id"
        [name]="name"
        [required]="required"
        [slot]="slot"
      />
    </form>
  `,
})
class RfInputsHost {
  value = 'test-value';
  label = 'Test Label';
  id = 'test-id';
  name = 'test-name';
  required = false;

  // slot-based API
  slot: any = {};

  form = new FormGroup({
    choice: new FormControl<string | null>(null),
  });
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TngRadioButton],
  template: `
    <form [formGroup]="form">
      <tng-radio-button
        formControlName="choice"
        name="choice"
        value="option1"
        label="Option 1"
      />
    </form>
  `,
})
class RfDisabledViaControlHost {
  form = new FormGroup({
    choice: new FormControl<string | null>({ value: null, disabled: true }),
  });

  get ctrl() {
    return this.form.controls.choice;
  }
}

/* ─────────────────────────
 * Standalone Host
 * ───────────────────────── */
@Component({
  standalone: true,
  imports: [TngRadioButton],
  template: `
    <tng-radio-button
      [value]="value"
      [label]="label"
      [id]="id"
      [name]="name"
      [disabled]="disabled"
      [required]="required"
      [slot]="slot"
    />
  `,
})
class StandaloneHost {
  value = 'standalone-value';
  label = 'Standalone Label';
  id = '';
  name = 'standalone-group';
  disabled = false;
  required = false;

  slot: any = {};
}

describe('TngRadioButton', () => {
  describe('CVA (ControlValueAccessor)', () => {
    describe('Reactive Forms', () => {
      it('writes value from form control into checked state', async () => {
        await TestBed.configureTestingModule({ imports: [RfBasicHost] }).compileComponents();
        const fix = TestBed.createComponent(RfBasicHost);
        fix.detectChanges();

        const host = fix.componentInstance as RfBasicHost;
        const instances = fix.debugElement.queryAll(By.directive(TngRadioButton));
        const instance1 = instances[0].componentInstance as TngRadioButton;
        const instance2 = instances[1].componentInstance as TngRadioButton;

        host.ctrl.setValue('option1');
        fix.detectChanges();

        expect(instance1.isChecked()).toBe(true);
        expect(instance2.isChecked()).toBe(false);

        const inputs = getAllRadioInputs(fix);
        expect(inputs[0].checked).toBe(true);
        expect(inputs[1].checked).toBe(false);
      });

      it('updates form control value when radio is selected', async () => {
        await TestBed.configureTestingModule({ imports: [RfBasicHost] }).compileComponents();
        const fix = TestBed.createComponent(RfBasicHost);
        fix.detectChanges();

        const host = fix.componentInstance as RfBasicHost;
        const inputs = getAllRadioInputs(fix);

        inputs[0].click();
        fix.detectChanges();
        expect(host.ctrl.value).toBe('option1');

        inputs[1].click();
        fix.detectChanges();
        expect(host.ctrl.value).toBe('option2');
      });

      it('marks control as touched on blur', async () => {
        await TestBed.configureTestingModule({ imports: [RfBasicHost] }).compileComponents();
        const fix = TestBed.createComponent(RfBasicHost);
        fix.detectChanges();

        const host = fix.componentInstance as RfBasicHost;
        const input = getFirstRadioInput(fix);

        expect(host.ctrl.touched).toBe(false);

        input.dispatchEvent(new Event('blur'));
        fix.detectChanges();

        expect(host.ctrl.touched).toBe(true);
      });

      it('disables native input when form control is disabled', async () => {
        await TestBed.configureTestingModule({ imports: [RfDisabledViaControlHost] }).compileComponents();
        const fix = TestBed.createComponent(RfDisabledViaControlHost);
        fix.detectChanges();

        expect(getFirstRadioInput(fix).disabled).toBe(true);
      });

      it('does not update form control when disabled', async () => {
        await TestBed.configureTestingModule({ imports: [RfDisabledViaControlHost] }).compileComponents();
        const fix = TestBed.createComponent(RfDisabledViaControlHost);
        fix.detectChanges();

        const host = fix.componentInstance as RfDisabledViaControlHost;
        const input = getFirstRadioInput(fix);

        input.click();
        fix.detectChanges();

        expect(host.ctrl.value).toBeNull();
      });

      it('re-enables native input when form control is enabled', async () => {
        await TestBed.configureTestingModule({ imports: [RfDisabledViaControlHost] }).compileComponents();
        const fix = TestBed.createComponent(RfDisabledViaControlHost);
        fix.detectChanges();

        const host = fix.componentInstance as RfDisabledViaControlHost;
        expect(getFirstRadioInput(fix).disabled).toBe(true);

        host.ctrl.enable();
        fix.detectChanges();

        expect(getFirstRadioInput(fix).disabled).toBe(false);
      });
    });
  });

  describe('Standalone usage', () => {
    it('renders with default values', async () => {
      await TestBed.configureTestingModule({ imports: [StandaloneHost] }).compileComponents();
      const fix = TestBed.createComponent(StandaloneHost);
      fix.detectChanges();

      const input = getFirstRadioInput(fix);
      expect(input.value).toBe('standalone-value');
      expect(input.checked).toBe(false);
    });

    it('respects [disabled] input', async () => {
      await TestBed.configureTestingModule({ imports: [StandaloneHost] }).compileComponents();
      const fix = TestBed.createComponent(StandaloneHost);

      // set before first CD to avoid NG0100
      fix.componentInstance.disabled = true;
      fix.detectChanges();

      expect(getFirstRadioInput(fix).disabled).toBe(true);
    });

    it('native radio can be checked on click (standalone)', async () => {
      await TestBed.configureTestingModule({ imports: [StandaloneHost] }).compileComponents();
      const fix = TestBed.createComponent(StandaloneHost);
      fix.detectChanges();

      const input = getFirstRadioInput(fix);
      expect(input.checked).toBe(false);

      input.click();
      fix.detectChanges();

      expect(input.checked).toBe(true);
    });
  });

  /**
   * NOTE:
   * These tests verify that input bindings are applied.
   * To avoid NG0100 in dev-mode tests, we keep them "static":
   * set the host inputs BEFORE the first detectChanges, and don't mutate after.
   */
  describe('Input properties (static)', () => {
    it('sets id attribute on input', async () => {
      await TestBed.configureTestingModule({ imports: [RfInputsHost] }).compileComponents();
      const fix = TestBed.createComponent(RfInputsHost);
      fix.componentInstance.id = 'test-id';
      fix.detectChanges();

      expect(getFirstRadioInput(fix).id).toBe('test-id');
    });

    it('sets name attribute on input', async () => {
      await TestBed.configureTestingModule({ imports: [RfInputsHost] }).compileComponents();
      const fix = TestBed.createComponent(RfInputsHost);
      fix.componentInstance.name = 'test-name';
      fix.detectChanges();

      expect(getFirstRadioInput(fix).name).toBe('test-name');
    });

    it('sets value attribute on input', async () => {
      await TestBed.configureTestingModule({ imports: [RfInputsHost] }).compileComponents();
      const fix = TestBed.createComponent(RfInputsHost);
      fix.componentInstance.value = 'test-value';
      fix.detectChanges();

      expect(getFirstRadioInput(fix).value).toBe('test-value');
    });

    it('displays label text when provided', async () => {
      await TestBed.configureTestingModule({ imports: [RfInputsHost] }).compileComponents();
      const fix = TestBed.createComponent(RfInputsHost);
      fix.componentInstance.label = 'Test Label';
      fix.detectChanges();

      expect(getLabelSpan(fix)?.textContent?.trim()).toBe('Test Label');
    });

    it('does not render label span when label is empty', async () => {
      await TestBed.configureTestingModule({ imports: [StandaloneHost] }).compileComponents();
      const fix = TestBed.createComponent(StandaloneHost);
      fix.componentInstance.label = '';
      fix.detectChanges();

      expect(getLabelSpan(fix)).toBeNull();
    });

    it('sets required attribute on input', async () => {
      await TestBed.configureTestingModule({ imports: [RfInputsHost] }).compileComponents();
      const fix = TestBed.createComponent(RfInputsHost);
      fix.componentInstance.required = true;
      fix.detectChanges();

      expect(getFirstRadioInput(fix).required).toBe(true);
    });
  });

  describe('Slot hooks (container/input/label)', () => {
    it('applies container slot classes (keeps default)', async () => {
      await TestBed.configureTestingModule({ imports: [RfInputsHost] }).compileComponents();
      const fix = TestBed.createComponent(RfInputsHost);

      fix.componentInstance.slot = { container: 'custom-container' };
      fix.detectChanges();

      const label = getLabelEl(fix);
      expect(label.className).toContain('custom-container');
      expect(label.className).toContain('inline-flex');
    });

    it('applies input slot classes (keeps default)', async () => {
      await TestBed.configureTestingModule({ imports: [RfInputsHost] }).compileComponents();
      const fix = TestBed.createComponent(RfInputsHost);

      fix.componentInstance.slot = { input: 'custom-input' };
      fix.detectChanges();

      const input = getFirstRadioInput(fix);
      expect(input.className).toContain('custom-input');
      expect(input.className).toContain('h-4');
    });

    it('applies label slot classes (keeps default)', async () => {
      await TestBed.configureTestingModule({ imports: [RfInputsHost] }).compileComponents();
      const fix = TestBed.createComponent(RfInputsHost);

      fix.componentInstance.slot = { label: 'custom-label' };
      fix.detectChanges();

      const span = getLabelSpan(fix);
      expect(span?.className).toContain('custom-label');
      expect(span?.className).toContain('text-sm');
      expect(span?.className).toContain('text-fg');
    });

    it('supports array slot values', async () => {
      await TestBed.configureTestingModule({ imports: [RfInputsHost] }).compileComponents();
      const fix = TestBed.createComponent(RfInputsHost);

      fix.componentInstance.slot = { label: ['c1', 'c2'] };
      fix.detectChanges();

      const span = getLabelSpan(fix);
      expect(span?.className).toContain('c1');
      expect(span?.className).toContain('c2');
    });

    it('applies multiple slots simultaneously', async () => {
      await TestBed.configureTestingModule({ imports: [RfInputsHost] }).compileComponents();
      const fix = TestBed.createComponent(RfInputsHost);

      fix.componentInstance.slot = {
        container: 'c-container',
        input: 'c-input',
        label: 'c-label',
      };
      fix.detectChanges();

      const label = getLabelEl(fix);
      const input = getFirstRadioInput(fix);
      const span = getLabelSpan(fix);

      expect(label.className).toContain('c-container');
      expect(input.className).toContain('c-input');
      expect(span?.className).toContain('c-label');
    });
  });

  describe('User interactions', () => {
    it('calls onChange when radio is selected (reactive forms)', async () => {
      await TestBed.configureTestingModule({ imports: [RfBasicHost] }).compileComponents();
      const fix = TestBed.createComponent(RfBasicHost);
      fix.detectChanges();

      const instances = fix.debugElement.queryAll(By.directive(TngRadioButton));
      const instance1 = instances[0].componentInstance as TngRadioButton;

      const onChangeSpy = jest.spyOn(instance1 as any, 'onChange');

      const inputs = getAllRadioInputs(fix);
      inputs[0].checked = true;
      inputs[0].dispatchEvent(new Event('change'));
      fix.detectChanges();

      expect(onChangeSpy).toHaveBeenCalledWith('option1');
    });

    it('calls onTouched on blur', async () => {
      await TestBed.configureTestingModule({ imports: [RfBasicHost] }).compileComponents();
      const fix = TestBed.createComponent(RfBasicHost);
      fix.detectChanges();

      const instances = fix.debugElement.queryAll(By.directive(TngRadioButton));
      const instance1 = instances[0].componentInstance as TngRadioButton;

      const onTouchedSpy = jest.spyOn(instance1 as any, 'onTouched');

      const inputs = getAllRadioInputs(fix);
      inputs[0].dispatchEvent(new Event('blur'));
      fix.detectChanges();

      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('does not call onChange when disabled via form control', async () => {
      await TestBed.configureTestingModule({ imports: [RfDisabledViaControlHost] }).compileComponents();
      const fix = TestBed.createComponent(RfDisabledViaControlHost);
      fix.detectChanges();

      const instance = fix.debugElement.query(By.directive(TngRadioButton)).componentInstance as TngRadioButton;
      const onChangeSpy = jest.spyOn(instance as any, 'onChange');

      const input = getFirstRadioInput(fix);
      input.checked = true;
      input.dispatchEvent(new Event('change'));
      fix.detectChanges();

      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('does not update checked state when disabled via form control', async () => {
      await TestBed.configureTestingModule({ imports: [RfDisabledViaControlHost] }).compileComponents();
      const fix = TestBed.createComponent(RfDisabledViaControlHost);
      fix.detectChanges();

      const instance = fix.debugElement.query(By.directive(TngRadioButton)).componentInstance as TngRadioButton;
      const input = getFirstRadioInput(fix);

      input.checked = true;
      input.dispatchEvent(new Event('change'));
      fix.detectChanges();

      expect(instance.isChecked()).toBe(false);
    });
  });

  describe('isChecked computed', () => {
    it('true when form value matches component value', async () => {
      await TestBed.configureTestingModule({ imports: [RfBasicHost] }).compileComponents();
      const fix = TestBed.createComponent(RfBasicHost);
      fix.detectChanges();

      const host = fix.componentInstance as RfBasicHost;
      const instances = fix.debugElement.queryAll(By.directive(TngRadioButton));
      const instance1 = instances[0].componentInstance as TngRadioButton;
      const instance2 = instances[1].componentInstance as TngRadioButton;

      host.ctrl.setValue('option1');
      fix.detectChanges();

      expect(instance1.isChecked()).toBe(true);
      expect(instance2.isChecked()).toBe(false);
    });

    it('false when form value does not match', async () => {
      await TestBed.configureTestingModule({ imports: [RfBasicHost] }).compileComponents();
      const fix = TestBed.createComponent(RfBasicHost);
      fix.detectChanges();

      const host = fix.componentInstance as RfBasicHost;
      const instances = fix.debugElement.queryAll(By.directive(TngRadioButton));
      const instance1 = instances[0].componentInstance as TngRadioButton;

      host.ctrl.setValue('option2');
      fix.detectChanges();

      expect(instance1.isChecked()).toBe(false);
    });

    it('false when form value is null', async () => {
      await TestBed.configureTestingModule({ imports: [RfBasicHost] }).compileComponents();
      const fix = TestBed.createComponent(RfBasicHost);
      fix.detectChanges();

      const instances = fix.debugElement.queryAll(By.directive(TngRadioButton));
      const instance1 = instances[0].componentInstance as TngRadioButton;

      expect(instance1.isChecked()).toBe(false);
    });
  });

  describe('isDisabled computed', () => {
    it('true when disabled input is true (standalone)', async () => {
      await TestBed.configureTestingModule({ imports: [StandaloneHost] }).compileComponents();
      const fix = TestBed.createComponent(StandaloneHost);
      fix.componentInstance.disabled = true;
      fix.detectChanges();

      const instance = fix.debugElement.query(By.directive(TngRadioButton)).componentInstance as TngRadioButton;
      expect(instance.isDisabled()).toBe(true);
    });

    it('true when form control is disabled', async () => {
      await TestBed.configureTestingModule({ imports: [RfDisabledViaControlHost] }).compileComponents();
      const fix = TestBed.createComponent(RfDisabledViaControlHost);
      fix.detectChanges();

      const instance = fix.debugElement.query(By.directive(TngRadioButton)).componentInstance as TngRadioButton;
      expect(instance.isDisabled()).toBe(true);
    });

    it('false when neither disabled input nor form control is disabled', async () => {
      await TestBed.configureTestingModule({ imports: [StandaloneHost] }).compileComponents();
      const fix = TestBed.createComponent(StandaloneHost);
      fix.detectChanges();

      const instance = fix.debugElement.query(By.directive(TngRadioButton)).componentInstance as TngRadioButton;
      expect(instance.isDisabled()).toBe(false);
    });
  });
});