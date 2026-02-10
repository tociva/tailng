// file-upload.component.spec.ts
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TngFileUpload } from './file-upload.component';

/* ─────────────────────────
 * Helpers
 * ───────────────────────── */
const queryFileInput = (fix: ComponentFixture<any>): HTMLInputElement =>
  fix.debugElement.query(By.css('tng-file-upload input[type="file"]'))
    .nativeElement as HTMLInputElement;

const queryDropzone = (fix: ComponentFixture<any>): HTMLDivElement =>
  fix.debugElement.query(By.css('tng-file-upload [role="button"]'))
    .nativeElement as HTMLDivElement;

const queryClearButton = (fix: ComponentFixture<any>): HTMLButtonElement | null => {
  const de = fix.debugElement.query(By.css('tng-file-upload button[type="button"]'));
  return de ? (de.nativeElement as HTMLButtonElement) : null;
};

const queryTitleEl = (fix: ComponentFixture<any>): HTMLDivElement =>
  fix.debugElement.query(By.css('tng-file-upload [role="button"] .space-y-1 > div:nth-child(1)'))
    .nativeElement as HTMLDivElement;

const querySubtitleEl = (fix: ComponentFixture<any>): HTMLDivElement =>
  fix.debugElement.query(By.css('tng-file-upload [role="button"] .space-y-1 > div:nth-child(2)'))
    .nativeElement as HTMLDivElement;

/* ─────────────────────────
 * Reactive Forms Hosts (STATIC inputs)
 * NOTE: NEVER bind [disabled] alongside formControlName (Angular Forms warning).
 * ───────────────────────── */

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TngFileUpload],
  template: `
    <form [formGroup]="form">
      <tng-file-upload formControlName="files" />
    </form>
  `,
})
class RfBasicHost {
  form = new FormGroup({
    files: new FormControl<File[] | null>(null),
  });
  get ctrl() { return this.form.controls.files; }
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TngFileUpload],
  template: `
    <form [formGroup]="form">
      <tng-file-upload formControlName="files" [accept]="'image/*'" />
    </form>
  `,
})
class RfAcceptHost {
  form = new FormGroup({
    files: new FormControl<File[] | null>(null),
  });
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TngFileUpload],
  template: `
    <form [formGroup]="form">
      <tng-file-upload formControlName="files" [multiple]="true" />
    </form>
  `,
})
class RfMultipleHost {
  form = new FormGroup({
    files: new FormControl<File[] | null>(null),
  });
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TngFileUpload],
  template: `
    <form [formGroup]="form">
      <tng-file-upload
        formControlName="files"
        [titleText]="'Custom title'"
        [subtitleText]="'Custom subtitle'"
      />
    </form>
  `,
})
class RfTitleSubtitleHost {
  form = new FormGroup({
    files: new FormControl<File[] | null>(null),
  });
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TngFileUpload],
  template: `
    <form [formGroup]="form">
      <tng-file-upload formControlName="files" />
    </form>
  `,
})
class RfDisabledViaControlHost {
  // Disable via FormControl creation (no template [disabled])
  form = new FormGroup({
    files: new FormControl<File[] | null>({ value: null, disabled: true }),
  });
  get ctrl() { return this.form.controls.files; }
}

/* ─────────────────────────
 * Standalone Host (bind inputs!)
 * ───────────────────────── */
@Component({
  standalone: true,
  imports: [TngFileUpload],
  template: `
    <tng-file-upload
      [disabled]="disabled"
      [accept]="accept"
      [multiple]="multiple"
      [titleText]="title"
      [subtitleText]="subtitle"
      (valueChange)="onValueChange($event)"
    />
  `,
})
class StandaloneHost {
  disabled = false;
  accept = '';
  multiple = false;
  title = 'Upload files';
  subtitle = 'Drag & drop here or click to browse';

  valueChangeValue: File[] | null = null;
  onValueChange(v: File[] | null) { this.valueChangeValue = v; }
}

describe('TngFileUpload (CVA)', () => {
  describe('Reactive Forms', () => {
    it('writes value from form control into component signal', async () => {
      await TestBed.configureTestingModule({ imports: [RfBasicHost] }).compileComponents();
      const fix = TestBed.createComponent(RfBasicHost);
      fix.detectChanges();

      const host = fix.componentInstance as RfBasicHost;
      const comp = fix.debugElement.query(By.directive(TngFileUpload)).componentInstance as TngFileUpload;

      const file1 = new File(['a'], 'a.txt', { type: 'text/plain' });
      const file2 = new File(['b'], 'b.txt', { type: 'text/plain' });

      host.ctrl.setValue([file1, file2]);
      fix.detectChanges();

      expect(comp.value()).toEqual([file1, file2]);
    });

    it('writing null clears component value', async () => {
      await TestBed.configureTestingModule({ imports: [RfBasicHost] }).compileComponents();
      const fix = TestBed.createComponent(RfBasicHost);
      fix.detectChanges();

      const host = fix.componentInstance as RfBasicHost;
      const comp = fix.debugElement.query(By.directive(TngFileUpload)).componentInstance as TngFileUpload;

      const file = new File(['x'], 'x.txt', { type: 'text/plain' });

      host.ctrl.setValue([file]);
      fix.detectChanges();
      expect(comp.value()).toEqual([file]);

      host.ctrl.setValue(null);
      fix.detectChanges();
      expect(comp.value()).toBeNull();
    });

    it('selecting files updates the form control value (CVA onChange)', async () => {
      await TestBed.configureTestingModule({ imports: [RfBasicHost] }).compileComponents();
      const fix = TestBed.createComponent(RfBasicHost);
      fix.detectChanges();

      const host = fix.componentInstance as RfBasicHost;
      const input = queryFileInput(fix);

      const file = new File(['content'], 'file.txt', { type: 'text/plain' });

      Object.defineProperty(input, 'files', { value: [file] });
      input.dispatchEvent(new Event('change'));
      fix.detectChanges();

      expect(host.ctrl.value).toEqual([file]);
    });

    it('does not trigger native input click when form control is disabled', async () => {
      await TestBed.configureTestingModule({ imports: [RfBasicHost] }).compileComponents();
      const fix = TestBed.createComponent(RfBasicHost);
      fix.detectChanges();

      const host = fix.componentInstance as RfBasicHost;
      const comp = fix.debugElement.query(By.directive(TngFileUpload)).componentInstance as TngFileUpload;

      host.ctrl.disable();
      fix.detectChanges();

      const nativeClickSpy = jest.spyOn(comp.fileInput.nativeElement, 'click');

      queryDropzone(fix).click();
      fix.detectChanges();

      expect(nativeClickSpy).not.toHaveBeenCalled();
    });

    it('re-enables native input when form control is enabled', async () => {
      await TestBed.configureTestingModule({ imports: [RfBasicHost] }).compileComponents();
      const fix = TestBed.createComponent(RfBasicHost);
      fix.detectChanges();

      const host = fix.componentInstance as RfBasicHost;
      host.ctrl.disable();
      fix.detectChanges();
      expect(queryFileInput(fix).disabled).toBe(true);

      host.ctrl.enable();
      fix.detectChanges();
      expect(queryFileInput(fix).disabled).toBe(false);
    });

    it('sets accept attribute on file input (static host)', async () => {
      await TestBed.configureTestingModule({ imports: [RfAcceptHost] }).compileComponents();
      const fix = TestBed.createComponent(RfAcceptHost);
      fix.detectChanges();

      expect(queryFileInput(fix).accept).toBe('image/*');
    });

    it('sets multiple attribute on file input (static host)', async () => {
      await TestBed.configureTestingModule({ imports: [RfMultipleHost] }).compileComponents();
      const fix = TestBed.createComponent(RfMultipleHost);
      fix.detectChanges();

      expect(queryFileInput(fix).multiple).toBe(true);
    });

    it('disabled via FormControl creation disables native input (no warning)', async () => {
      await TestBed.configureTestingModule({ imports: [RfDisabledViaControlHost] }).compileComponents();
      const fix = TestBed.createComponent(RfDisabledViaControlHost);
      fix.detectChanges();

      expect(queryFileInput(fix).disabled).toBe(true);
    });

    it('shows title/subtitle (static host)', async () => {
      await TestBed.configureTestingModule({ imports: [RfTitleSubtitleHost] }).compileComponents();
      const fix = TestBed.createComponent(RfTitleSubtitleHost);
      fix.detectChanges();

      expect(queryTitleEl(fix).textContent?.trim()).toBe('Custom title');
      expect(querySubtitleEl(fix).textContent?.trim()).toBe('Custom subtitle');
    });

    it('shows Clear button when value exists and clears on click', async () => {
      await TestBed.configureTestingModule({ imports: [RfBasicHost] }).compileComponents();
      const fix = TestBed.createComponent(RfBasicHost);
      fix.detectChanges();

      const host = fix.componentInstance as RfBasicHost;

      const file = new File(['c'], 'c.txt', { type: 'text/plain' });
      host.ctrl.setValue([file]);
      fix.detectChanges();

      const btn = queryClearButton(fix);
      expect(btn?.textContent?.trim()).toBe('Clear');

      btn!.click();
      fix.detectChanges();

      expect(host.ctrl.value).toBeNull();
    });

    it('clicking dropzone triggers openPicker (spy on click handler)', async () => {
      await TestBed.configureTestingModule({ imports: [RfBasicHost] }).compileComponents();
      const fix = TestBed.createComponent(RfBasicHost);
      fix.detectChanges();

      const comp = fix.debugElement.query(By.directive(TngFileUpload)).componentInstance as TngFileUpload;
      const spy = jest.spyOn(comp, 'openPicker');

      queryDropzone(fix).click();
      fix.detectChanges();

      expect(spy).toHaveBeenCalled();
    });

    it('does not openPicker when form control is disabled', async () => {
      await TestBed.configureTestingModule({ imports: [RfBasicHost] }).compileComponents();
      const fix = TestBed.createComponent(RfBasicHost);
      fix.detectChanges();

      const host = fix.componentInstance as RfBasicHost;
      const comp = fix.debugElement.query(By.directive(TngFileUpload)).componentInstance as TngFileUpload;

      host.ctrl.disable();
      fix.detectChanges();

      const nativeClickSpy = jest.spyOn(comp.fileInput.nativeElement, 'click');

      queryDropzone(fix).click();
      fix.detectChanges();

      expect(nativeClickSpy).not.toHaveBeenCalled();
    });
  });

  describe('Standalone', () => {
    it('emits valueChange when files selected', async () => {
      await TestBed.configureTestingModule({ imports: [StandaloneHost] }).compileComponents();
      const fix = TestBed.createComponent(StandaloneHost);
      fix.detectChanges();

      const host = fix.componentInstance as StandaloneHost;
      const input = queryFileInput(fix);

      const file = new File(['x'], 'x.txt', { type: 'text/plain' });
      Object.defineProperty(input, 'files', { value: [file] });

      input.dispatchEvent(new Event('change'));
      fix.detectChanges();

      expect(host.valueChangeValue).toEqual([file]);
    });

    it('respects [disabled] input', async () => {
      await TestBed.configureTestingModule({ imports: [StandaloneHost] }).compileComponents();
      const fix = TestBed.createComponent(StandaloneHost);
      const host = fix.componentInstance as StandaloneHost;

      host.disabled = true;
      fix.detectChanges();

      expect(queryFileInput(fix).disabled).toBe(true);
    });
  });

  describe('Drag and drop (unit-level)', () => {
    it('onDropped sets value + clears native input value', async () => {
      await TestBed.configureTestingModule({ imports: [RfBasicHost] }).compileComponents();
      const fix = TestBed.createComponent(RfBasicHost);
      fix.detectChanges();

      const host = fix.componentInstance as RfBasicHost;
      const comp = fix.debugElement.query(By.directive(TngFileUpload)).componentInstance as TngFileUpload;

      const file = new File(['a'], 'a.txt', { type: 'text/plain' });

      // IMPORTANT: avoid InvalidStateError by ensuring native input value is already ''
      // (jsdom may not allow setting non-empty anyway)
      comp.fileInput.nativeElement.value = '';

      comp.onDropped([file]);
      fix.detectChanges();

      expect(host.ctrl.value).toEqual([file]);
      expect(comp.fileInput.nativeElement.value).toBe('');
    });

    it('onDropped does nothing when disabled (standalone-disabled behavior)', async () => {
      // In RF mode, we disable via the control (no template disabled input)
      await TestBed.configureTestingModule({ imports: [RfDisabledViaControlHost] }).compileComponents();
      const fix = TestBed.createComponent(RfDisabledViaControlHost);
      fix.detectChanges();

      const host = fix.componentInstance as RfDisabledViaControlHost;
      const comp = fix.debugElement.query(By.directive(TngFileUpload)).componentInstance as TngFileUpload;

      const file = new File(['a'], 'a.txt', { type: 'text/plain' });

      comp.onDropped([file]);
      fix.detectChanges();

      expect(host.ctrl.value).toBeNull();
      expect(comp.value()).toBeNull();
    });
  });

  describe('trackBy', () => {
    it('trackByName uses name-size-lastModified', async () => {
      await TestBed.configureTestingModule({ imports: [RfBasicHost] }).compileComponents();
      const fix = TestBed.createComponent(RfBasicHost);
      fix.detectChanges();

      const comp = fix.debugElement.query(By.directive(TngFileUpload)).componentInstance as TngFileUpload;
      const file = new File(['x'], 'x.txt', { type: 'text/plain' });

      expect(comp.trackByName(0, file)).toBe(`${file.name}-${file.size}-${file.lastModified}`);
    });
  });
});