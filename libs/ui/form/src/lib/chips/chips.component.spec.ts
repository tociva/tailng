// chips.component.spec.ts
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TngChips } from './chips.component';

/* ─────────────────────────
 * Host: Reactive Forms usage
 * ───────────────────────── */
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TngChips],
  template: `
    <form [formGroup]="form">
      <tng-chips
        formControlName="chips"
        [options]="options"
        [placeholder]="placeholder"
        [displayWith]="displayWith"
        [allowFreeText]="allowFreeText"
        [preventDuplicates]="preventDuplicates"
        [slot]="slot"
        (search)="onSearch($event)"
        (chipAdded)="onChipAdded($event)"
        (chipRemoved)="onChipRemoved($event)"
        (closed)="onClosed($event)"
      />
    </form>
  `,
})
class FormHostComponent {
  options = ['Apple', 'Banana', 'Cherry'];
  placeholder = 'Add items…';
  allowFreeText = true;
  preventDuplicates = true;

  // Keep it typed if you export slot types publicly; left as any for copy/paste ease.
  slot: any = {};

  searchValue: string | null = null;
  addedChip: string | null = null;
  removedChip: string | null = null;
  closedReason: string | null = null;

  form = new FormGroup({
    chips: new FormControl<string[]>([], { nonNullable: true }),
  });

  displayWith = (item: string) => item;

  onSearch(v: string) {
    this.searchValue = v;
  }

  onChipAdded(chip: string) {
    this.addedChip = chip;
  }

  onChipRemoved(chip: string) {
    this.removedChip = chip;
  }

  onClosed(reason: string) {
    this.closedReason = reason;
  }

  get ctrl() {
    return this.form.controls.chips;
  }
}

/* ─────────────────────────
 * Host: Standalone usage
 * ───────────────────────── */
@Component({
  standalone: true,
  imports: [TngChips],
  template: `
    <tng-chips
      [value]="value"
      [options]="options"
      [disabled]="disabled"
      [slot]="slot"
    />
  `,
})
class StandaloneHostComponent {
  value: string[] = [];
  options = ['A', 'B'];
  disabled = false;

  // Keep it typed if you export slot types publicly; left as any for copy/paste ease.
  slot: any = {};
}

describe('TngChips (CVA + slot styling)', () => {
  describe('Reactive Forms integration (CVA)', () => {
    let fixture: ComponentFixture<FormHostComponent>;
    let host: FormHostComponent;

    const getTngInstance = (): TngChips<string> => {
      const de = fixture.debugElement.query(By.directive(TngChips));
      return de.componentInstance as TngChips<string>;
    };

    const getInput = (): HTMLInputElement =>
      fixture.debugElement.query(By.css('tng-chips input')).nativeElement;

    // Scope chip queries to the wrapper (more stable than class substring)
    const getWrapper = (): HTMLDivElement =>
      fixture.debugElement.query(By.css('tng-chips > div > div'))
        .nativeElement as HTMLDivElement;

    const getChips = (): HTMLElement[] =>
      fixture.debugElement
        .queryAll(By.css('tng-chips > div > div span'))
        .map((de) => de.nativeElement as HTMLElement)
        // filter to only chip "pills" (they contain remove button)
        .filter((el) => el.querySelector('button[aria-label="Remove chip"]') != null);

    const getRemoveButtons = (): HTMLButtonElement[] =>
      fixture.debugElement
        .queryAll(By.css('tng-chips button[aria-label="Remove chip"]'))
        .map((de) => de.nativeElement as HTMLButtonElement);

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FormHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(FormHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('writes value from form control into chips', () => {
      host.ctrl.setValue(['Apple', 'Banana']);
      fixture.detectChanges();

      const chips = getChips();
      expect(chips.length).toBe(2);
      expect(chips[0].textContent ?? '').toContain('Apple');
      expect(chips[1].textContent ?? '').toContain('Banana');
    });

    it('typing into input emits search event', () => {
      const input = getInput();

      input.value = 'Ap';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(host.searchValue).toBe('Ap');
    });

    it('adding chip via Enter key (overlay closed) updates form control value', () => {
      const input = getInput();
      const comp = getTngInstance();

      // Type text (opens overlay)
      input.value = 'Orange';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      // Ensure overlay is closed so Enter calls addFromInput
      comp.close('programmatic');
      fixture.detectChanges();

      input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
      );
      fixture.detectChanges();

      expect(host.ctrl.value).toContain('Orange');
      expect(host.addedChip).toBe('Orange');
    });

    it('removing chip updates form control value', () => {
      host.ctrl.setValue(['Apple', 'Banana']);
      fixture.detectChanges();

      const removeButtons = getRemoveButtons();
      expect(removeButtons.length).toBe(2);

      removeButtons[0].click();
      fixture.detectChanges();

      expect(host.ctrl.value).toEqual(['Banana']);
      expect(host.removedChip).toBe('Apple');
    });

    it('removes last chip on Backspace when input is empty', () => {
      host.ctrl.setValue(['Apple', 'Banana']);
      fixture.detectChanges();

      const input = getInput();
      expect(input.value).toBe('');

      input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true }),
      );
      fixture.detectChanges();

      expect(host.ctrl.value).toEqual(['Apple']);
      expect(host.removedChip).toBe('Banana');
    });

    it('disables chips when form control is disabled', () => {
      const input = getInput();
      const wrapper = getWrapper();

      host.ctrl.disable();
      fixture.detectChanges();

      expect(input.disabled).toBe(true);
      expect(wrapper.className).toContain('opacity-60');
      expect(wrapper.className).toContain('pointer-events-none');
    });

    it('marks control as touched on blur', () => {
      const input = getInput();

      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(host.ctrl.touched).toBe(true);
    });

    it('opens overlay on input focus when enabled', () => {
      const comp = getTngInstance();
      expect(comp.isOpen()).toBe(false);

      const input = getInput();
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
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
      );
      fixture.detectChanges();

      expect(comp.isOpen()).toBe(false);
      expect(host.closedReason).toBe('escape');
    });

    it('prevents duplicate chips when preventDuplicates is true', () => {
      host.ctrl.setValue(['Apple']);
      fixture.detectChanges();

      const input = getInput();
      const comp = getTngInstance();

      input.value = 'Apple';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      // Force overlay closed so Enter adds from input (not optionList)
      comp.close('programmatic');
      fixture.detectChanges();

      input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
      );
      fixture.detectChanges();

      expect(host.ctrl.value.filter((v) => v === 'Apple').length).toBe(1);
    });

    it('allows duplicate chips when preventDuplicates is false', () => {
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      h.preventDuplicates = false;
      h.ctrl.setValue(['Apple']);
      fix.detectChanges();

      const input = fix.debugElement.query(By.css('tng-chips input')).nativeElement as HTMLInputElement;
      const comp = fix.debugElement.query(By.directive(TngChips)).componentInstance as TngChips<string>;

      input.value = 'Apple';
      input.dispatchEvent(new Event('input'));
      fix.detectChanges();

      comp.close('programmatic');
      fix.detectChanges();

      input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
      );
      fix.detectChanges();

      expect(h.ctrl.value.filter((v) => v === 'Apple').length).toBe(2);
    });

    it('does not add chip when allowFreeText is false and Enter pressed', () => {
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      h.allowFreeText = false;
      fix.detectChanges();

      const input = fix.debugElement.query(By.css('tng-chips input')).nativeElement as HTMLInputElement;
      const comp = fix.debugElement.query(By.directive(TngChips)).componentInstance as TngChips<string>;

      input.value = 'Orange';
      input.dispatchEvent(new Event('input'));
      fix.detectChanges();

      comp.close('programmatic');
      fix.detectChanges();

      input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
      );
      fix.detectChanges();

      expect(h.ctrl.value).not.toContain('Orange');
    });

    it('applies slot classes to container, chipsWrapper, chip, chipLabel, removeButton, and input', () => {
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      h.slot = {
        container: 'border-2 border-blue-200 p-2',
        chipsWrapper: 'border-2 border-blue-500 rounded-lg',
        chip: 'bg-blue-100 rounded-full',
        chipLabel: 'font-semibold text-blue-900',
        removeButton: 'text-red-600',
        input: 'border-2 border-green-500',
      };
      h.ctrl.setValue(['Apple']);
      fix.detectChanges();

      const container = fix.debugElement.query(By.css('tng-chips > div')).nativeElement as HTMLDivElement;
      const wrapper = fix.debugElement.query(By.css('tng-chips > div > div')).nativeElement as HTMLDivElement;

      const chip = fix.debugElement.queryAll(By.css('tng-chips > div > div span'))
        .map((de) => de.nativeElement as HTMLElement)
        .find((el) => el.querySelector('button[aria-label="Remove chip"]') != null) as HTMLElement;

      const chipLabel = chip.querySelector('span') as HTMLSpanElement;
      const removeButton = chip.querySelector('button') as HTMLButtonElement;

      const input = fix.debugElement.query(By.css('tng-chips input')).nativeElement as HTMLInputElement;

      expect(container.className).toContain('border-2');
      expect(container.className).toContain('border-blue-200');

      expect(wrapper.className).toContain('border-2');
      expect(wrapper.className).toContain('border-blue-500');

      expect(chip.className).toContain('bg-blue-100');
      expect(chip.className).toContain('rounded-full');

      expect(chipLabel.className).toContain('font-semibold');
      expect(chipLabel.className).toContain('text-blue-900');

      expect(removeButton.className).toContain('text-red-600');

      expect(input.className).toContain('border-2');
      expect(input.className).toContain('border-green-500');
    });

    it('applies slot array values (Tailwind-friendly)', () => {
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      h.slot = {
        chip: ['bg-blue-100', 'rounded-full', 'border-2'],
      };
      h.ctrl.setValue(['Apple']);
      fix.detectChanges();

      const chip = fix.debugElement.queryAll(By.css('tng-chips > div > div span'))
        .map((de) => de.nativeElement as HTMLElement)
        .find((el) => el.querySelector('button[aria-label="Remove chip"]') != null) as HTMLElement;

      expect(chip.className).toContain('bg-blue-100');
      expect(chip.className).toContain('rounded-full');
      expect(chip.className).toContain('border-2');
    });

    it('recomputes class finals without throwing (sanity for computed)', () => {
      const fix = TestBed.createComponent(FormHostComponent);
      const h = fix.componentInstance;

      h.slot = {
        container: 'border-2',
        chipsWrapper: 'border-2',
        chip: 'bg-blue-100',
        chipLabel: 'font-semibold',
        removeButton: 'text-red-600',
        input: 'border-2',
      };
      fix.detectChanges();

      const comp = fix.debugElement.query(By.directive(TngChips))
        .componentInstance as TngChips<string>;

      expect(typeof comp.containerClassFinal()).toBe('string');
      expect(typeof comp.chipsWrapperClassFinal()).toBe('string');
      expect(typeof comp.chipClassFinal()).toBe('string');
      expect(typeof comp.chipLabelClassFinal()).toBe('string');
      expect(typeof comp.removeButtonClassFinal()).toBe('string');
      expect(typeof comp.inputClassFinal()).toBe('string');
    });
  });

  describe('Standalone disabled input', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StandaloneHostComponent],
      }).compileComponents();
    });

    it('respects [disabled] input when not using forms', () => {
      const fix = TestBed.createComponent(StandaloneHostComponent);
      const h = fix.componentInstance;

      h.disabled = true;
      fix.detectChanges();

      const input = fix.debugElement.query(By.css('tng-chips input')).nativeElement as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it('prevents adding chips when disabled (component state stays unchanged)', () => {
      const fix = TestBed.createComponent(StandaloneHostComponent);
      const h = fix.componentInstance;

      h.disabled = true;
      fix.detectChanges();

      const input = fix.debugElement.query(By.css('tng-chips input')).nativeElement as HTMLInputElement;
      const comp = fix.debugElement.query(By.directive(TngChips)).componentInstance as TngChips<string>;

      input.value = 'Test';
      input.dispatchEvent(new Event('input'));
      fix.detectChanges();

      // Close overlay so Enter would go to addFromInput (even though disabled should short-circuit)
      comp.close('programmatic');
      fix.detectChanges();

      input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
      );
      fix.detectChanges();

      // Standalone host doesn't auto-wire valueChange; validate component didn't add
      expect(comp.chips()).not.toContain('Test');
      expect(comp.chips().length).toBe(0);
      expect(h.value.length).toBe(0);
    });
  });
});