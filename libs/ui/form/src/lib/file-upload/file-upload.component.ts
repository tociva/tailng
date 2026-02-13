import {
  Component,
  ElementRef,
  ViewChild,
  computed,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { TngSlotMap, TngSlotValue } from '@tailng-ui/ui';
import { TngFileUploadSlot } from './file-upload.slots';
import { TngFileDropzone } from './file-dropzone.directive';

@Component({
  selector: 'tng-file-upload',
  standalone: true,
  imports: [TngFileDropzone],
  templateUrl: './file-upload.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TngFileUpload),
      multi: true,
    },
  ],
})
export class TngFileUpload implements ControlValueAccessor {
  @ViewChild('fileInput', { static: true })
  fileInput!: ElementRef<HTMLInputElement>;

  // config
  readonly disabled = input(false);
  readonly accept = input<string>('');
  readonly multiple = input(false);

  // texts
  readonly title = input<string>('Upload files');
  readonly subtitle = input<string>('Drag & drop here or click to browse');

  /* ─────────────────────────
   * Slot hooks (micro styling)
   * ───────────────────────── */
  slot = input<TngSlotMap<TngFileUploadSlot>>({});

  // optional outputs (non-form usage)
  readonly valueChange = output<File[] | null>();

  private readonly _value = signal<File[] | null>(null);
  readonly value = computed(() => this._value());

  private readonly _formDisabled = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());

  private onChange: (value: File[] | null) => void = () => {};
  private onTouched: () => void = () => {};

  // visual state
  readonly dragActive = signal(false);

  writeValue(value: File[] | null): void {
    this._value.set(value ?? null);
  }

  registerOnChange(fn: (value: File[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  /* ─────────────────────────
   * Computed slot classes
   * ───────────────────────── */
  readonly containerClassFinal = computed(() =>
    this.cx('w-full', this.slotClass('container')),
  );

  readonly dropzoneClassFinal = computed(() => {
    const base = this.cx(
      'relative w-full rounded-md border px-4 py-4 transition',
      'bg-bg text-fg border-border',
      'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background',
      this.slotClass('dropzone'),
    );

    const disabled = this.isDisabled()
      ? this.cx('opacity-60 pointer-events-none', this.slotClass('dropzoneDisabled'))
      : this.cx('cursor-pointer');
    const active = this.dragActive()
      ? this.cx(
          'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background',
          this.slotClass('dropzoneActive'),
        )
      : '';

    return this.cx(base, disabled, active);
  });

  readonly headerClassFinal = computed(() =>
    this.cx('flex items-start justify-between gap-4', this.slotClass('header')),
  );

  readonly titleClassFinal = computed(() =>
    this.cx('text-sm font-medium text-fg', this.slotClass('title')),
  );

  readonly subtitleClassFinal = computed(() =>
    this.cx('text-xs text-disable', this.slotClass('subtitle')),
  );

  readonly hintClassFinal = computed(() =>
    this.cx('text-xs text-disable', this.slotClass('hint')),
  );

  readonly clearButtonClassFinal = computed(() =>
    this.cx('text-xs text-danger hover:text-danger-hover', this.slotClass('clearButton')),
  );

  readonly fileListClassFinal = computed(() =>
    this.cx('mt-2 space-y-1', this.slotClass('fileList')),
  );

  readonly fileItemClassFinal = computed(() =>
    this.cx(
      'flex items-center justify-between rounded-md border border-border bg-bg px-3 py-2 text-sm text-fg',
      this.slotClass('fileItem'),
    ),
  );

  readonly fileNameClassFinal = computed(() =>
    this.cx('truncate', this.slotClass('fileName')),
  );

  readonly fileSizeClassFinal = computed(() =>
    this.cx('ml-3 text-xs text-disable', this.slotClass('fileSize')),
  );

  /* ─────────────────────────
   * Helpers
   * ───────────────────────── */
  private slotClass(key: TngFileUploadSlot): TngSlotValue {
    return this.slot()?.[key];
  }

  private cx(...parts: Array<TngSlotValue>): string {
    return parts
      .flatMap((p) => (Array.isArray(p) ? p : [p]))
      .map((p) => (p ?? '').toString().trim())
      .filter(Boolean)
      .join(' ');
  }

  openPicker() {
    if (this.isDisabled()) return;
    this.fileInput.nativeElement.click();
  }

  private setFiles(next: File[] | null) {
    this._value.set(next);
    this.onChange(next);
    this.valueChange.emit(next);
  }

  onNativeChange(event: Event) {
    if (this.isDisabled()) return;

    const files = (event.target as HTMLInputElement).files;
    const list = files ? Array.from(files) : [];

    this.setFiles(list.length ? list : null);
  }

  onDropped(files: File[]) {
    if (this.isDisabled()) return;

    this.setFiles(files.length ? files : null);

    // reset native input so selecting same file again still triggers change
    this.fileInput.nativeElement.value = '';
  }

  clear() {
    if (this.isDisabled()) return;
    this.setFiles(null);
    this.fileInput.nativeElement.value = '';
  }

  onBlur() {
    this.onTouched();
  }

  onDragActiveChange(active: boolean) {
    this.dragActive.set(active);
  }

  trackByName = (_: number, f: File) => `${f.name}-${f.size}-${f.lastModified}`;
}
