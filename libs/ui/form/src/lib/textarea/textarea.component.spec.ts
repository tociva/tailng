// textarea.component.spec.ts
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TngTextarea } from './textarea.component';

/* ─────────────────────────
 * Host: Reactive Forms usage
 * ───────────────────────── */
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TngTextarea],
  template: `
    <form [formGroup]="form">
      <tng-textarea
        formControlName="message"
        [placeholder]="placeholder"
        [rows]="rows"
        [slot]="slot"
      />
    </form>
  `,
})
class FormHostComponent {
  placeholder = 'Enter message';
  rows = 4;

  // Keep it typed if you export slot types publicly; left as any for copy/paste ease.
  slot: any = {};

  form = new FormGroup({
    message: new FormControl<string>('', { nonNullable: true }),
  });

  get ctrl() {
    return this.form.controls.message;
  }
}

/* ─────────────────────────
 * Host: Standalone usage
 * ───────────────────────── */
@Component({
  standalone: true,
  imports: [TngTextarea],
  template: `
    <tng-textarea
      [placeholder]="placeholder"
      [disabled]="disabled"
      [rows]="rows"
      [slot]="slot"
    />
  `,
})
class StandaloneHostComponent {
  placeholder = 'Standalone textarea';
  disabled = false;
  rows = 4;
  slot: any = {};
}

describe('TngTextarea (CVA + slot styling)', () => {
  describe('Reactive Forms integration (CVA)', () => {
    let fixture: ComponentFixture<FormHostComponent>;
    let host: FormHostComponent;

    const getTextareaEl = (): HTMLTextAreaElement =>
      fixture.debugElement.query(By.css('tng-textarea textarea'))
        .nativeElement as HTMLTextAreaElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FormHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(FormHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('writes value from form control into textarea', () => {
      host.ctrl.setValue('Test message');
      fixture.detectChanges();

      expect(getTextareaEl().value).toBe('Test message');
    });

    it('typing in textarea updates the form control value (CVA onChange)', () => {
      const textarea = getTextareaEl();
      expect(host.ctrl.value).toBe('');

      textarea.value = 'New message';
      textarea.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(host.ctrl.value).toBe('New message');
    });

    it('blur marks control as touched (CVA onTouched)', () => {
      const textarea = getTextareaEl();
      expect(host.ctrl.touched).toBe(false);

      textarea.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(host.ctrl.touched).toBe(true);
    });

    it('disables textarea when form control is disabled (forms → component)', () => {
      host.ctrl.disable();
      fixture.detectChanges();

      expect(getTextareaEl().disabled).toBe(true);
    });

    it('enables textarea when form control is enabled', () => {
      host.ctrl.disable();
      fixture.detectChanges();
      expect(getTextareaEl().disabled).toBe(true);

      host.ctrl.enable();
      fixture.detectChanges();
      expect(getTextareaEl().disabled).toBe(false);
    });

    it('binds placeholder to the native textarea', () => {
      expect(getTextareaEl().placeholder).toBe('Enter message');
    });

    it('updates placeholder when input changes', () => {
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      h.placeholder = 'New placeholder';
      fix.detectChanges();

      const textarea = fix.debugElement.query(By.css('tng-textarea textarea'))
        .nativeElement as HTMLTextAreaElement;
      expect(textarea.placeholder).toBe('New placeholder');
    });

    it('binds rows to the native textarea', () => {
      expect(getTextareaEl().rows).toBe(4);
    });

    it('updates rows when input changes', () => {
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      h.rows = 8;
      fix.detectChanges();

      const textarea = fix.debugElement.query(By.css('tng-textarea textarea'))
        .nativeElement as HTMLTextAreaElement;
      expect(textarea.rows).toBe(8);
    });

    it('applies slot styling to textarea', () => {
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      h.slot = {
        textarea: 'border-2 border-blue-500 rounded-lg shadow-md min-h-[100px]',
      };
      fix.detectChanges();

      const textarea = fix.debugElement.query(By.css('tng-textarea textarea'))
        .nativeElement as HTMLTextAreaElement;

      expect(textarea.className).toContain('border-2');
      expect(textarea.className).toContain('border-blue-500');
      expect(textarea.className).toContain('rounded-lg');
      expect(textarea.className).toContain('shadow-md');
      expect(textarea.className).toContain('min-h-[100px]');
    });

    it('merges slot classes with default classes', () => {
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      h.slot = { textarea: 'border-2 border-blue-500' };
      fix.detectChanges();

      const textarea = fix.debugElement.query(By.css('tng-textarea textarea'))
        .nativeElement as HTMLTextAreaElement;

      expect(textarea.className).toContain('w-full');
      expect(textarea.className).toContain('rounded-md');
      expect(textarea.className).toContain('border-2');
      expect(textarea.className).toContain('border-blue-500');
    });

    it('works with Validators.required', () => {
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      h.form = new FormGroup({
        message: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      });
      fix.detectChanges();

      expect(h.ctrl.invalid).toBe(true);

      h.ctrl.setValue('Some text');
      fix.detectChanges();

      expect(h.ctrl.valid).toBe(true);
    });

    it('works with Validators.minLength', () => {
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      h.form = new FormGroup({
        message: new FormControl('', {
          nonNullable: true,
          validators: [Validators.minLength(10)],
        }),
      });
      fix.detectChanges();

      h.ctrl.setValue('Short');
      fix.detectChanges();
      expect(h.ctrl.invalid).toBe(true);

      h.ctrl.setValue('This is long enough');
      fix.detectChanges();
      expect(h.ctrl.valid).toBe(true);
    });

    it('works with Validators.maxLength', () => {
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      h.form = new FormGroup({
        message: new FormControl('', {
          nonNullable: true,
          validators: [Validators.maxLength(5)],
        }),
      });
      fix.detectChanges();

      h.ctrl.setValue('Short');
      fix.detectChanges();
      expect(h.ctrl.valid).toBe(true);

      h.ctrl.setValue('This is too long');
      fix.detectChanges();
      expect(h.ctrl.invalid).toBe(true);
    });

    it('handles null value from form control', () => {
      @Component({
        standalone: true,
        imports: [ReactiveFormsModule, TngTextarea],
        template: `
          <form [formGroup]="form">
            <tng-textarea formControlName="message" />
          </form>
        `,
      })
      class NullValueHostComponent {
        form = new FormGroup({
          message: new FormControl<string | null>(null),
        });
      }

      const fix = TestBed.createComponent(NullValueHostComponent);
      fix.detectChanges();

      const textarea = fix.debugElement.query(By.css('tng-textarea textarea'))
        .nativeElement as HTMLTextAreaElement;
      expect(textarea.value).toBe('');
    });
  });

  describe('Standalone usage (no form control)', () => {
    let fixture: ComponentFixture<StandaloneHostComponent>;
    let host: StandaloneHostComponent;

    const getTngInstance = (): TngTextarea =>
      fixture.debugElement.query(By.directive(TngTextarea))
        .componentInstance as TngTextarea;

    const getTextareaEl = (): HTMLTextAreaElement =>
      fixture.debugElement.query(By.css('tng-textarea textarea'))
        .nativeElement as HTMLTextAreaElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StandaloneHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(StandaloneHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('works without form control', () => {
      const textarea = getTextareaEl();

      expect(textarea).not.toBeNull();
      expect(textarea.placeholder).toBe('Standalone textarea');
      expect(textarea.rows).toBe(4);
    });

    it('updates value when typing (standalone)', () => {
      const comp = getTngInstance();
      const textarea = getTextareaEl();

      textarea.value = 'Standalone value';
      textarea.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(comp.value()).toBe('Standalone value');
    });

    it('disables textarea when disabled input is true', () => {
      const fix = TestBed.createComponent(StandaloneHostComponent);
      const h = fix.componentInstance;

      h.disabled = true;
      fix.detectChanges();

      const textarea = fix.debugElement.query(By.css('tng-textarea textarea'))
        .nativeElement as HTMLTextAreaElement;
      expect(textarea.disabled).toBe(true);
    });

    it('applies slot styling in standalone mode', () => {
      const fix = TestBed.createComponent(StandaloneHostComponent);
      const h = fix.componentInstance;

      h.slot = { textarea: 'border-2 border-green-500' };
      fix.detectChanges();

      const textarea = fix.debugElement.query(By.css('tng-textarea textarea'))
        .nativeElement as HTMLTextAreaElement;
      expect(textarea.className).toContain('border-2');
      expect(textarea.className).toContain('border-green-500');
    });
  });
});