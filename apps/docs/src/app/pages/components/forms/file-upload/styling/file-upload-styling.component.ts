import { Component, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngFileUpload, TngSlotMap, TngFileUploadSlot } from '@tailng-ui/ui/form';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-file-upload-styling',
  templateUrl: './file-upload-styling.component.html',
  imports: [
    ReactiveFormsModule,
    TngFileUpload,
    TngTag,
    ExampleBlockComponent,
    TngExampleDemo,
  ],
})
export class FileUploadStylingComponent {
  form = new FormGroup({
    files: new FormControl<File[] | null>(null),
  });

  // Slot examples
  containerSlot: TngSlotMap<TngFileUploadSlot> = {
    container: 'max-w-md mx-auto',
  };

  dropzoneSlot: TngSlotMap<TngFileUploadSlot> = {
    dropzone: 'border-2 border-dashed border-primary rounded-xl bg-primary/5',
  };

  titleSubtitleSlot: TngSlotMap<TngFileUploadSlot> = {
    title: 'text-base font-bold text-primary',
    subtitle: 'text-sm text-disable',
  };

  hintSlot: TngSlotMap<TngFileUploadSlot> = {
    hint: 'text-xs text-primary/80',
  };

  clearButtonSlot: TngSlotMap<TngFileUploadSlot> = {
    clearButton: 'text-sm font-semibold text-red-600 hover:text-red-700',
  };

  fileListSlot: TngSlotMap<TngFileUploadSlot> = {
    fileList: 'mt-4 space-y-2',
  };

  fileItemSlot: TngSlotMap<TngFileUploadSlot> = {
    fileItem: 'border-2 border-primary/30 bg-primary/5 rounded-lg px-4 py-3',
  };

  fileNameSlot: TngSlotMap<TngFileUploadSlot> = {
    fileName: 'font-semibold text-primary',
  };

  fileSizeSlot: TngSlotMap<TngFileUploadSlot> = {
    fileSize: 'text-xs font-mono text-primary/70',
  };

  // HTML examples
  readonly containerSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-file-upload formControlName="files"
    [slot]="{ container: 'max-w-md mx-auto' }" />
</form>
`,
  );

  readonly containerSlotTs = computed(
    () => `
import { TngFileUpload, TngSlotMap, TngFileUploadSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  containerSlot: TngSlotMap<TngFileUploadSlot> = {
    container: 'max-w-md mx-auto',
  };
}
`,
  );

  readonly dropzoneSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-file-upload formControlName="files"
    [slot]="{ dropzone: 'border-2 border-dashed border-primary rounded-xl bg-primary/5' }" />
</form>
`,
  );

  readonly dropzoneSlotTs = computed(
    () => `
import { TngFileUpload, TngSlotMap, TngFileUploadSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  dropzoneSlot: TngSlotMap<TngFileUploadSlot> = {
    dropzone: 'border-2 border-dashed border-primary rounded-xl bg-primary/5',
  };
}
`,
  );

  readonly titleSubtitleSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-file-upload formControlName="files" titleText="Drop files here" subtitleText="or click to browse"
    [slot]="{ title: 'text-base font-bold text-primary', subtitle: 'text-sm text-disable' }" />
</form>
`,
  );

  readonly titleSubtitleSlotTs = computed(
    () => `
import { TngFileUpload, TngSlotMap, TngFileUploadSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  titleSubtitleSlot: TngSlotMap<TngFileUploadSlot> = {
    title: 'text-base font-bold text-primary',
    subtitle: 'text-sm text-disable',
  };
}
`,
  );

  // Additional slot examples
  dropzoneActiveSlot: TngSlotMap<TngFileUploadSlot> = {
    dropzoneActive: 'ring-4 ring-primary/50',
  };

  dropzoneDisabledSlot: TngSlotMap<TngFileUploadSlot> = {
    dropzoneDisabled: 'bg-gray-100 border-gray-300',
  };

  headerSlot: TngSlotMap<TngFileUploadSlot> = {
    header: 'flex items-center justify-between gap-6',
  };

  readonly dropzoneActiveSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-file-upload formControlName="files"
    [slot]="{ dropzoneActive: 'ring-4 ring-primary/50' }" />
</form>
`,
  );

  readonly dropzoneActiveSlotTs = computed(
    () => `
import { TngFileUpload, TngSlotMap, TngFileUploadSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  dropzoneActiveSlot: TngSlotMap<TngFileUploadSlot> = {
    dropzoneActive: 'ring-4 ring-primary/50',
  };
}
`,
  );

  readonly dropzoneDisabledSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-file-upload formControlName="files" [disabled]="true"
    [slot]="{ dropzoneDisabled: 'bg-gray-100 border-gray-300' }" />
</form>
`,
  );

  readonly dropzoneDisabledSlotTs = computed(
    () => `
import { TngFileUpload, TngSlotMap, TngFileUploadSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  dropzoneDisabledSlot: TngSlotMap<TngFileUploadSlot> = {
    dropzoneDisabled: 'bg-gray-100 border-gray-300',
  };
}
`,
  );

  readonly headerSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-file-upload formControlName="files"
    [slot]="{ header: 'flex items-center justify-between gap-6' }" />
</form>
`,
  );

  readonly headerSlotTs = computed(
    () => `
import { TngFileUpload, TngSlotMap, TngFileUploadSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  headerSlot: TngSlotMap<TngFileUploadSlot> = {
    header: 'flex items-center justify-between gap-6',
  };
}
`,
  );

  readonly hintSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-file-upload formControlName="files" accept="image/*"
    [slot]="{ hint: 'text-xs text-primary/80' }" />
</form>
`,
  );

  readonly hintSlotTs = computed(
    () => `
import { TngFileUpload, TngSlotMap, TngFileUploadSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  hintSlot: TngSlotMap<TngFileUploadSlot> = {
    hint: 'text-xs text-primary/80',
  };
}
`,
  );

  readonly clearButtonSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-file-upload formControlName="files"
    [slot]="{ clearButton: 'text-sm font-semibold text-red-600 hover:text-red-700' }" />
</form>
`,
  );

  readonly clearButtonSlotTs = computed(
    () => `
import { TngFileUpload, TngSlotMap, TngFileUploadSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  clearButtonSlot: TngSlotMap<TngFileUploadSlot> = {
    clearButton: 'text-sm font-semibold text-red-600 hover:text-red-700',
  };
}
`,
  );

  readonly fileListSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-file-upload formControlName="files"
    [slot]="{ fileList: 'mt-4 space-y-2' }" />
</form>
`,
  );

  readonly fileListSlotTs = computed(
    () => `
import { TngFileUpload, TngSlotMap, TngFileUploadSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  fileListSlot: TngSlotMap<TngFileUploadSlot> = {
    fileList: 'mt-4 space-y-2',
  };
}
`,
  );

  readonly fileItemSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-file-upload formControlName="files"
    [slot]="{ fileItem: 'border-2 border-primary/30 bg-primary/5 rounded-lg px-4 py-3' }" />
</form>
`,
  );

  readonly fileItemSlotTs = computed(
    () => `
import { TngFileUpload, TngSlotMap, TngFileUploadSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  fileItemSlot: TngSlotMap<TngFileUploadSlot> = {
    fileItem: 'border-2 border-primary/30 bg-primary/5 rounded-lg px-4 py-3',
  };
}
`,
  );

  readonly fileNameSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-file-upload formControlName="files"
    [slot]="{ fileName: 'font-semibold text-primary' }" />
</form>
`,
  );

  readonly fileNameSlotTs = computed(
    () => `
import { TngFileUpload, TngSlotMap, TngFileUploadSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  fileNameSlot: TngSlotMap<TngFileUploadSlot> = {
    fileName: 'font-semibold text-primary',
  };
}
`,
  );

  readonly fileSizeSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-file-upload formControlName="files"
    [slot]="{ fileSize: 'text-xs font-mono text-primary/70' }" />
</form>
`,
  );

  readonly fileSizeSlotTs = computed(
    () => `
import { TngFileUpload, TngSlotMap, TngFileUploadSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  fileSizeSlot: TngSlotMap<TngFileUploadSlot> = {
    fileSize: 'text-xs font-mono text-primary/70',
  };
}
`,
  );
}
