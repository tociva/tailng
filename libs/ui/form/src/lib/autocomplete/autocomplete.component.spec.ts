import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TngAutocomplete } from './autocomplete.component';

/* ─────────────────────────
 * Host: Reactive Forms usage
 * ───────────────────────── */
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TngAutocomplete],
  template: `
    <form [formGroup]="form">
      <tng-autocomplete
        formControlName="value"
        [options]="options"
        [placeholder]="placeholder"
        (search)="onSearch($event)"
        (selected)="onSelected($event)"
        (closed)="onClosed($event)"
      />
    </form>
  `,
})
class FormHostComponent {
  options = ['Apple', 'Banana', 'Cherry'];
  placeholder = 'Search…';

  searchValue: string | null = null;
  selectedValue: string | null = null;
  closedReason: string | null = null;

  form = new FormGroup({
    value: new FormControl<string | null>(null),
  });

  onSearch(v: string) {
    this.searchValue = v;
  }

  onSelected(v: string) {
    this.selectedValue = v;
  }

  onClosed(reason: string) {
    this.closedReason = reason;
  }

  get ctrl() {
    return this.form.controls.value;
  }
}

/* ─────────────────────────
 * Host: Standalone usage
 * ───────────────────────── */
@Component({
  standalone: true,
  imports: [TngAutocomplete],
  template: `
    <tng-autocomplete
      [options]="options"
      [disabled]="disabled"
    />
  `,
})
class StandaloneHostComponent {
  options = ['A', 'B'];
  disabled = false;
}

describe('TngAutocomplete', () => {
  describe('Reactive Forms integration (CVA)', () => {
    let fixture: ComponentFixture<FormHostComponent>;
    let host: FormHostComponent;

    const getInput = (): HTMLInputElement =>
      fixture.debugElement.query(By.css('input')).nativeElement;

    const getComponent = (): TngAutocomplete<string> =>
      fixture.debugElement.query(By.directive(TngAutocomplete))
        .componentInstance;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FormHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(FormHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('writes value from form control into input', () => {
      host.ctrl.setValue('Apple');
      fixture.detectChanges();

      const input = getInput();
      expect(input.value).toBe('Apple');
    });

    it('typing clears selected value and emits search', () => {
      const input = getInput();

      input.value = 'Ap';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(host.ctrl.value).toBeNull();
      expect(host.searchValue).toBe('Ap');
    });

    it('disables input when form control is disabled', () => {
      host.ctrl.disable();
      fixture.detectChanges();

      const input = getInput();
      expect(input.disabled).toBe(true);
    });

    it('ignores input events when disabled via form', () => {
      host.ctrl.disable();
      fixture.detectChanges();

      const input = getInput();
      input.value = 'Test';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(host.searchValue).toBeNull();
      expect(host.ctrl.value).toBeNull();
    });

    it('marks control as touched on blur', () => {
      const input = getInput();

      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(host.ctrl.touched).toBe(true);
    });

    it('opens overlay on input when enabled', () => {
      const comp = getComponent();

      expect(comp.isOpen()).toBe(false);

      const input = getInput();
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(comp.isOpen()).toBe(true);
    });

    it('closes overlay on Escape key', () => {
      const comp = getComponent();

      comp.open('programmatic');
      fixture.detectChanges();
      expect(comp.isOpen()).toBe(true);

      const input = getInput();
      input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape' })
      );
      fixture.detectChanges();

      expect(comp.isOpen()).toBe(false);
      expect(host.closedReason).toBe('escape');
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

    it('respects [disabled] input when not using forms', async () => {
      const fix = TestBed.createComponent(StandaloneHostComponent);
      const h = fix.componentInstance;
    
      // Set BEFORE first CD to avoid NG0100
      h.disabled = true;
    
      fix.detectChanges();
    
      const input = fix.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it('prevents opening overlay when disabled', () => {
      const fix = TestBed.createComponent(StandaloneHostComponent);
      const h = fix.componentInstance;
    
      // set BEFORE first CD
      h.disabled = true;
      fix.detectChanges();
    
      const input = fix.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
      input.dispatchEvent(new Event('focus'));
      fix.detectChanges();
    
      const comp = fix.debugElement.query(By.directive(TngAutocomplete)).componentInstance as TngAutocomplete<string>;
      expect(comp.isOpen()).toBe(false);
    });
  });
});