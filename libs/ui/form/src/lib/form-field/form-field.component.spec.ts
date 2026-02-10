// form-field.component.spec.ts
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TngFormField } from './form-field.component';
import { TngTextInput } from '../text-input/text-input.component';

/* ─────────────────────────
 * Host: Reactive Forms usage
 * ───────────────────────── */
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TngFormField, TngTextInput],
  template: `
    <form [formGroup]="form">
      <tng-form-field
        [label]="label"
        [hint]="hint"
        [error]="error"
        [invalid]="invalid"
        [disabled]="disabled"
        [required]="required"
        [size]="size"
        [appearance]="appearance"
        [slot]="slot"
      >
        <tng-text-input formControlName="text" [placeholder]="placeholder" />
      </tng-form-field>
    </form>
  `,
})
class FormHostComponent {
  label = 'Email';
  hint = '';
  error = '';
  invalid: boolean | null = null;
  disabled: boolean | null = null;
  required = false;
  size: 'sm' | 'md' | 'lg' = 'md';
  appearance: 'outline' | 'filled' = 'outline';
  placeholder = 'Enter email';

  // Keep it typed if you export slot types publicly; left as any for copy/paste ease.
  slot: any = {};

  form = new FormGroup({
    text: new FormControl('', {
      nonNullable: true,
    }),
  });

  get ctrl() {
    return this.form.controls.text;
  }
}

/* ─────────────────────────
 * Host: Standalone usage (no form control)
 * ───────────────────────── */
@Component({
  standalone: true,
  imports: [TngFormField, TngTextInput],
  template: `
    <tng-form-field
      [label]="label"
      [hint]="hint"
      [error]="error"
      [invalid]="invalid"
      [disabled]="disabled"
      [required]="required"
      [size]="size"
      [appearance]="appearance"
    >
      <tng-text-input [placeholder]="placeholder" />
    </tng-form-field>
  `,
})
class StandaloneHostComponent {
  label = 'Standalone field';
  hint = '';
  error = '';
  invalid: boolean | null = null;
  disabled: boolean | null = null;
  required = false;
  size: 'sm' | 'md' | 'lg' = 'md';
  appearance: 'outline' | 'filled' = 'outline';
  placeholder = 'Enter value';
}

describe('TngFormField', () => {
  describe('Reactive Forms integration', () => {
    let fixture: ComponentFixture<FormHostComponent>;
    let host: FormHostComponent;

    const getTngInstance = (): TngFormField => {
      const de = fixture.debugElement.query(By.directive(TngFormField));
      return de.componentInstance as TngFormField;
    };

    const getFormFieldEl = (): HTMLDivElement => {
      return fixture.debugElement.query(By.css('tng-form-field > div'))
        .nativeElement as HTMLDivElement;
    };

    const getLabelEl = (): HTMLLabelElement | null => {
      const label = fixture.debugElement.query(By.css('tng-form-field label'));
      return label ? (label.nativeElement as HTMLLabelElement) : null;
    };

    const getRequiredIndicatorEl = (): HTMLSpanElement | null => {
      const span = fixture.debugElement.query(
        By.css('tng-form-field label span'),
      );
      return span ? (span.nativeElement as HTMLSpanElement) : null;
    };

    const getControlWrapperEl = (): HTMLDivElement => {
      return fixture.debugElement.query(
        By.css('tng-form-field > div > div'),
      ).nativeElement as HTMLDivElement;
    };

    const getMessagesEl = (): HTMLDivElement | null => {
      // Messages container is only rendered when showHint() || showError() is true
      // It's a div that contains helper/error text and is not the controlWrapper
      // The controlWrapper contains tng-text-input, messages container doesn't
      const allDivs = fixture.debugElement.queryAll(
        By.css('tng-form-field > div > div'),
      );
      
      for (const divDebugEl of allDivs) {
        const div = divDebugEl.nativeElement as HTMLDivElement;
        // Skip controlWrapper (contains tng-text-input)
        if (div.querySelector('tng-text-input')) continue;
        
        // Messages container contains a div with text content
        const textDiv = div.querySelector('div');
        if (textDiv && textDiv.textContent?.trim()) {
          return div;
        }
      }
      return null;
    };

    const getHelperTextEl = (): HTMLDivElement | null => {
      const div = fixture.debugElement.query(
        By.css('tng-form-field > div > div:last-child > div'),
      );
      if (!div) return null;
      const text = div.nativeElement.textContent?.trim() ?? '';
      return text === host.hint ? (div.nativeElement as HTMLDivElement) : null;
    };

    const getErrorTextEl = (): HTMLDivElement | null => {
      const div = fixture.debugElement.query(
        By.css('tng-form-field > div > div:last-child > div'),
      );
      if (!div) return null;
      const text = div.nativeElement.textContent?.trim() ?? '';
      return text && text !== host.hint
        ? (div.nativeElement as HTMLDivElement)
        : null;
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FormHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(FormHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('detects NgControl from projected content', () => {
      const comp = getTngInstance();
      expect(comp['ctrl']()).not.toBeNull();
      expect(comp['ctrl']()).toBe(host.ctrl);
    });

    it('renders label when provided', () => {
      const label = getLabelEl();
      expect(label).not.toBeNull();
      expect(label?.textContent?.trim()).toBe('Email');
    });

    it('does not render label when empty', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.label = '';

      fix.detectChanges();

      const label = fix.debugElement.query(By.css('tng-form-field label'));
      expect(label).toBeNull();
    });

    it('shows required indicator when required is true', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.required = true;

      fix.detectChanges();

      const indicator = fix.debugElement.query(
        By.css('tng-form-field label span'),
      );
      expect(indicator).not.toBeNull();
      expect(indicator.nativeElement.textContent).toContain('*');
    });

    it('does not show required indicator when required is false', () => {
      host.required = false;
      fixture.detectChanges();

      const indicator = getRequiredIndicatorEl();
      expect(indicator).toBeNull();
    });

    it('shows hint text when provided and no error', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.hint = 'This is a hint';

      fix.detectChanges();

      const helperText = fix.debugElement.query(
        By.css('tng-form-field > div > div:last-child > div'),
      );
      expect(helperText).not.toBeNull();
      expect(helperText.nativeElement.textContent?.trim()).toBe(
        'This is a hint',
      );
    });

    it('hides hint text when error is shown', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set inputs BEFORE initial CD
      h.hint = 'This is a hint';
      h.error = 'This is an error';

      fix.detectChanges();

      const helperText = fix.debugElement.query(
        By.css('tng-form-field > div > div:last-child > div'),
      );
      expect(helperText).not.toBeNull();
      expect(helperText.nativeElement.textContent?.trim()).toBe(
        'This is an error',
      );
    });

    it('shows manual error text when provided', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.error = 'Custom error message';

      fix.detectChanges();

      const errorText = fix.debugElement.query(
        By.css('tng-form-field > div > div:last-child > div'),
      );
      expect(errorText).not.toBeNull();
      expect(errorText.nativeElement.textContent?.trim()).toBe(
        'Custom error message',
      );
    });

    it('shows auto error text from control errors when touched', () => {
      host.ctrl.setValue('');
      host.ctrl.setValidators([Validators.required]);
      host.ctrl.updateValueAndValidity();
      host.ctrl.markAsTouched();
      fixture.detectChanges();

      const errorText = getErrorTextEl();
      expect(errorText).not.toBeNull();
      expect(errorText?.textContent?.trim()).toBe('This field is required');
    });

    it('does not show auto error text when control is not touched', () => {
      host.ctrl.setValue('');
      host.ctrl.setValidators([Validators.required]);
      host.ctrl.updateValueAndValidity();
      // Not touched and not dirty
      fixture.detectChanges();

      const messages = getMessagesEl();
      // Messages container should not exist when control is not touched/dirty
      expect(messages).toBeNull();
    });

    it('shows auto error text when control is dirty', () => {
      host.ctrl.setValue('');
      host.ctrl.setValidators([Validators.required]);
      host.ctrl.updateValueAndValidity();
      host.ctrl.markAsDirty();
      fixture.detectChanges();

      const errorText = getErrorTextEl();
      expect(errorText).not.toBeNull();
      expect(errorText?.textContent?.trim()).toBe('This field is required');
    });

    it('shows email validation error', () => {
      host.ctrl.setValue('invalid-email');
      host.ctrl.setValidators([Validators.email]);
      host.ctrl.updateValueAndValidity();
      host.ctrl.markAsTouched();
      fixture.detectChanges();

      const errorText = getErrorTextEl();
      expect(errorText).not.toBeNull();
      expect(errorText?.textContent?.trim()).toBe(
        'Please enter a valid email',
      );
    });

    it('shows minlength validation error', () => {
      host.ctrl.setValue('ab');
      host.ctrl.setValidators([Validators.minLength(5)]);
      host.ctrl.updateValueAndValidity();
      host.ctrl.markAsTouched();
      fixture.detectChanges();

      const errorText = getErrorTextEl();
      expect(errorText).not.toBeNull();
      expect(errorText?.textContent?.trim()).toBe('Minimum 5 characters');
    });

    it('shows maxlength validation error', () => {
      host.ctrl.setValue('abcdefghij');
      host.ctrl.setValidators([Validators.maxLength(5)]);
      host.ctrl.updateValueAndValidity();
      host.ctrl.markAsTouched();
      fixture.detectChanges();

      const errorText = getErrorTextEl();
      expect(errorText).not.toBeNull();
      expect(errorText?.textContent?.trim()).toBe('Maximum 5 characters');
    });

    it('uses manual invalid override when provided', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.invalid = true;
      h.error = 'Manual invalid';

      fix.detectChanges();

      const comp = fix.debugElement.query(By.directive(TngFormField))
        .componentInstance as TngFormField;
      expect(comp.isInvalid()).toBe(true);

      const errorText = fix.debugElement.query(
        By.css('tng-form-field > div > div:last-child > div'),
      );
      expect(errorText).not.toBeNull();
      expect(errorText.nativeElement.textContent?.trim()).toBe('Manual invalid');
    });

    it('uses manual disabled override when provided', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.disabled = true;

      fix.detectChanges();

      const comp = fix.debugElement.query(By.directive(TngFormField))
        .componentInstance as TngFormField;
      expect(comp.isDisabled()).toBe(true);

      const wrapper = fix.debugElement.query(
        By.css('tng-form-field > div > div'),
      ).nativeElement as HTMLDivElement;
      expect(wrapper.className).toContain('opacity-60');
      expect(wrapper.className).toContain('pointer-events-none');
    });

    it('uses form control disabled state when manual override is null', () => {
      host.ctrl.disable();
      fixture.detectChanges();

      const comp = getTngInstance();
      expect(comp.isDisabled()).toBe(true);

      const wrapper = getControlWrapperEl();
      expect(wrapper.className).toContain('opacity-60');
      expect(wrapper.className).toContain('pointer-events-none');
    });

    it('applies invalid styling to control wrapper when invalid', () => {
      host.ctrl.setValue('');
      host.ctrl.setValidators([Validators.required]);
      host.ctrl.updateValueAndValidity();
      host.ctrl.markAsTouched();
      fixture.detectChanges();

      const wrapper = getControlWrapperEl();
      expect(wrapper.className).toContain('border-danger');
      expect(wrapper.className).toContain('focus-within:ring-danger');
    });

    it('applies size classes to control wrapper', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.size = 'sm';

      fix.detectChanges();

      const wrapper = fix.debugElement.query(
        By.css('tng-form-field > div > div'),
      ).nativeElement as HTMLDivElement;
      expect(wrapper.className).toContain('px-2');
      expect(wrapper.className).toContain('py-1');
      expect(wrapper.className).toContain('text-sm');
    });

    it('applies appearance classes to control wrapper', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.appearance = 'filled';

      fix.detectChanges();

      const wrapper = fix.debugElement.query(
        By.css('tng-form-field > div > div'),
      ).nativeElement as HTMLDivElement;
      expect(wrapper.className).toContain('bg-alternate-background');
    });

    it('applies slot styling to formField', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.slot = {
        formField: 'border-2 border-blue-200 p-2',
      };

      fix.detectChanges();

      const formField = fix.debugElement.query(
        By.css('tng-form-field > div'),
      ).nativeElement as HTMLDivElement;
      expect(formField.className).toContain('border-2');
      expect(formField.className).toContain('border-blue-200');
      expect(formField.className).toContain('p-2');
    });

    it('applies slot styling to label', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.slot = {
        label: 'text-lg font-bold text-purple-600',
      };

      fix.detectChanges();

      const label = fix.debugElement.query(
        By.css('tng-form-field label'),
      ).nativeElement as HTMLLabelElement;
      expect(label.className).toContain('text-lg');
      expect(label.className).toContain('font-bold');
      expect(label.className).toContain('text-purple-600');
    });

    it('applies slot styling to requiredIndicator', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set inputs BEFORE initial CD
      h.required = true;
      h.slot = {
        requiredIndicator: 'text-red-600 font-bold',
      };

      fix.detectChanges();

      const indicator = fix.debugElement.query(
        By.css('tng-form-field label span'),
      ).nativeElement as HTMLSpanElement;
      expect(indicator.className).toContain('text-red-600');
      expect(indicator.className).toContain('font-bold');
    });

    it('applies slot styling to controlWrapper', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.slot = {
        controlWrapper: 'border-2 border-green-500 rounded-lg',
      };

      fix.detectChanges();

      const wrapper = fix.debugElement.query(
        By.css('tng-form-field > div > div'),
      ).nativeElement as HTMLDivElement;
      expect(wrapper.className).toContain('border-2');
      expect(wrapper.className).toContain('border-green-500');
      expect(wrapper.className).toContain('rounded-lg');
    });

    it('applies slot styling to helperText', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set inputs BEFORE initial CD
      h.hint = 'Helper text';
      h.slot = {
        helperText: 'text-xs text-primary/80',
      };

      fix.detectChanges();

      const helperText = fix.debugElement.query(
        By.css('tng-form-field > div > div:last-child > div'),
      ).nativeElement as HTMLDivElement;
      expect(helperText.className).toContain('text-xs');
      expect(helperText.className).toContain('text-primary/80');
    });

    it('applies slot styling to errorText', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set inputs BEFORE initial CD
      h.error = 'Error text';
      h.slot = {
        errorText: 'text-sm font-semibold text-red-600',
      };

      fix.detectChanges();

      const errorText = fix.debugElement.query(
        By.css('tng-form-field > div > div:last-child > div'),
      ).nativeElement as HTMLDivElement;
      expect(errorText.className).toContain('text-sm');
      expect(errorText.className).toContain('font-semibold');
      expect(errorText.className).toContain('text-red-600');
    });

    it('applies slot styling to messages', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      // Set inputs BEFORE initial CD
      h.hint = 'Helper text';
      h.slot = {
        messages: 'mt-2 gap-4',
      };

      fix.detectChanges();

      const messages = fix.debugElement.query(
        By.css('tng-form-field > div > div:last-child'),
      ).nativeElement as HTMLDivElement;
      expect(messages.className).toContain('mt-2');
      expect(messages.className).toContain('gap-4');
    });
  });

  describe('Standalone usage (no form control)', () => {
    let fixture: ComponentFixture<StandaloneHostComponent>;
    let host: StandaloneHostComponent;

    const getTngInstance = (): TngFormField => {
      const de = fixture.debugElement.query(By.directive(TngFormField));
      return de.componentInstance as TngFormField;
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StandaloneHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(StandaloneHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('works without NgControl', () => {
      const comp = getTngInstance();
      expect(comp['ctrl']()).toBeNull();
    });

    it('uses manual invalid override when no control', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(StandaloneHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.invalid = true;
      h.error = 'Manual error';

      fix.detectChanges();

      const comp = fix.debugElement.query(By.directive(TngFormField))
        .componentInstance as TngFormField;
      expect(comp.isInvalid()).toBe(true);

      const errorText = fix.debugElement.query(
        By.css('tng-form-field > div > div:last-child > div'),
      );
      expect(errorText).not.toBeNull();
      expect(errorText.nativeElement.textContent?.trim()).toBe('Manual error');
    });

    it('uses manual disabled override when no control', () => {
      // Create a fresh fixture for this test
      const fix = TestBed.createComponent(StandaloneHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.disabled = true;

      fix.detectChanges();

      const comp = fix.debugElement.query(By.directive(TngFormField))
        .componentInstance as TngFormField;
      expect(comp.isDisabled()).toBe(true);

      const wrapper = fix.debugElement.query(
        By.css('tng-form-field > div > div'),
      ).nativeElement as HTMLDivElement;
      expect(wrapper.className).toContain('opacity-60');
      expect(wrapper.className).toContain('pointer-events-none');
    });
  });

  describe('Prefix and suffix projection', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, TngFormField, TngTextInput],
      template: `
        <form [formGroup]="form">
          <tng-form-field label="Email" [slot]="slot">
            <span tngPrefix>@</span>
            <tng-text-input formControlName="text" placeholder="Email" />
            <span tngSuffix>✓</span>
          </tng-form-field>
        </form>
      `,
    })
    class PrefixSuffixHostComponent {
      slot: any = {};

      form = new FormGroup({
        text: new FormControl('', {
          nonNullable: true,
        }),
      });
    }

    it('projects prefix content', () => {
      const fix = TestBed.createComponent(PrefixSuffixHostComponent);
      fix.detectChanges();

      const prefix = fix.debugElement.query(
        By.css('tng-form-field > div > div > span:first-child'),
      );
      expect(prefix).not.toBeNull();
      expect(prefix.nativeElement.textContent?.trim()).toBe('@');
    });

    it('projects suffix content', () => {
      const fix = TestBed.createComponent(PrefixSuffixHostComponent);
      fix.detectChanges();

      const suffix = fix.debugElement.query(
        By.css('tng-form-field > div > div > span:last-child'),
      );
      expect(suffix).not.toBeNull();
      expect(suffix.nativeElement.textContent?.trim()).toBe('✓');
    });

    it('applies slot styling to prefix', () => {
      const fix = TestBed.createComponent(PrefixSuffixHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.slot = {
        prefix: 'text-blue-600 font-semibold',
      };

      fix.detectChanges();

      const prefix = fix.debugElement.query(
        By.css('tng-form-field > div > div > span:first-child'),
      ).nativeElement as HTMLSpanElement;
      expect(prefix.className).toContain('text-blue-600');
      expect(prefix.className).toContain('font-semibold');
    });

    it('applies slot styling to suffix', () => {
      const fix = TestBed.createComponent(PrefixSuffixHostComponent);
      const h = fix.componentInstance;

      // Set input BEFORE initial CD
      h.slot = {
        suffix: 'text-purple-600 font-semibold',
      };

      fix.detectChanges();

      const suffix = fix.debugElement.query(
        By.css('tng-form-field > div > div > span:last-child'),
      ).nativeElement as HTMLSpanElement;
      expect(suffix.className).toContain('text-purple-600');
      expect(suffix.className).toContain('font-semibold');
    });
  });
});
