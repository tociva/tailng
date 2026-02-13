import { Component, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngFormField, TngSlotMap, TngFormFieldSlot, TngTextInput } from '@tailng-ui/ui/form';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-form-field-styling',
  templateUrl: './form-field-styling.component.html',
  imports: [
    ReactiveFormsModule,
    TngFormField,
    TngTextInput,
    TngTag,
    ExampleBlockComponent,
    TngExampleDemo,
  ],
})
export class FormFieldStylingComponent {
  form = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
  });

  // Slot examples
  formFieldSlot: TngSlotMap<TngFormFieldSlot> = {
    formField: 'border-2 border-blue-200 p-2',
  };

  labelSlot: TngSlotMap<TngFormFieldSlot> = {
    label: 'text-base font-bold text-primary',
  };

  requiredIndicatorSlot: TngSlotMap<TngFormFieldSlot> = {
    requiredIndicator: 'text-red-600 font-bold',
  };

  controlWrapperSlot: TngSlotMap<TngFormFieldSlot> = {
    controlWrapper: 'border-2 border-green-500 rounded-lg',
  };

  prefixSlot: TngSlotMap<TngFormFieldSlot> = {
    prefix: 'text-blue-600 font-semibold',
  };

  suffixSlot: TngSlotMap<TngFormFieldSlot> = {
    suffix: 'text-purple-600 font-semibold',
  };

  messagesSlot: TngSlotMap<TngFormFieldSlot> = {
    messages: 'mt-2 gap-4',
  };

  helperTextSlot: TngSlotMap<TngFormFieldSlot> = {
    helperText: 'text-xs text-primary/80',
  };

  errorTextSlot: TngSlotMap<TngFormFieldSlot> = {
    errorText: 'text-sm font-semibold text-red-600',
  };

  // HTML examples
  readonly formFieldSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-form-field label="Name" [slot]="{ formField: 'border-2 border-blue-200 p-2' }">
    <tng-text-input formControlName="name" placeholder="Your name" />
  </tng-form-field>
</form>
`,
  );

  readonly formFieldSlotTs = computed(
    () => `
import { TngFormField, TngSlotMap, TngFormFieldSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  formFieldSlot: TngSlotMap<TngFormFieldSlot> = {
    formField: 'border-2 border-blue-200 p-2',
  };
}
`,
  );

  readonly labelSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-form-field label="Custom label" [required]="true"
    [slot]="{ label: 'text-base font-bold text-primary' }">
    <tng-text-input formControlName="name" placeholder="Your name" />
  </tng-form-field>
</form>
`,
  );

  readonly labelSlotTs = computed(
    () => `
import { TngFormField, TngSlotMap, TngFormFieldSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  labelSlot: TngSlotMap<TngFormFieldSlot> = {
    label: 'text-base font-bold text-primary',
  };
}
`,
  );

  readonly requiredIndicatorSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-form-field label="Required field" [required]="true"
    [slot]="{ requiredIndicator: 'text-red-600 font-bold' }">
    <tng-text-input formControlName="name" placeholder="Your name" />
  </tng-form-field>
</form>
`,
  );

  readonly requiredIndicatorSlotTs = computed(
    () => `
import { TngFormField, TngSlotMap, TngFormFieldSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  requiredIndicatorSlot: TngSlotMap<TngFormFieldSlot> = {
    requiredIndicator: 'text-red-600 font-bold',
  };
}
`,
  );

  readonly controlWrapperSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-form-field label="Email"
    [slot]="{ controlWrapper: 'border-2 border-green-500 rounded-lg' }">
    <tng-text-input formControlName="email" placeholder="Email" />
  </tng-form-field>
</form>
`,
  );

  readonly controlWrapperSlotTs = computed(
    () => `
import { TngFormField, TngSlotMap, TngFormFieldSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  controlWrapperSlot: TngSlotMap<TngFormFieldSlot> = {
    controlWrapper: 'border-2 border-green-500 rounded-lg',
  };
}
`,
  );

  readonly prefixSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-form-field label="Email"
    [slot]="{ prefix: 'text-blue-600 font-semibold' }">
    <span tngPrefix>@</span>
    <tng-text-input formControlName="email" placeholder="Email" />
  </tng-form-field>
</form>
`,
  );

  readonly prefixSlotTs = computed(
    () => `
import { TngFormField, TngSlotMap, TngFormFieldSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  prefixSlot: TngSlotMap<TngFormFieldSlot> = {
    prefix: 'text-blue-600 font-semibold',
  };
}
`,
  );

  readonly suffixSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-form-field label="Email"
    [slot]="{ suffix: 'text-purple-600 font-semibold' }">
    <tng-text-input formControlName="email" placeholder="Email" />
    <span tngSuffix>✓</span>
  </tng-form-field>
</form>
`,
  );

  readonly suffixSlotTs = computed(
    () => `
import { TngFormField, TngSlotMap, TngFormFieldSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  suffixSlot: TngSlotMap<TngFormFieldSlot> = {
    suffix: 'text-purple-600 font-semibold',
  };
}
`,
  );

  readonly messagesSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-form-field label="Email" hint="Helper text"
    [slot]="{ messages: 'mt-2 gap-4' }">
    <tng-text-input formControlName="email" placeholder="Email" />
  </tng-form-field>
</form>
`,
  );

  readonly messagesSlotTs = computed(
    () => `
import { TngFormField, TngSlotMap, TngFormFieldSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  messagesSlot: TngSlotMap<TngFormFieldSlot> = {
    messages: 'mt-2 gap-4',
  };
}
`,
  );

  readonly helperTextSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-form-field label="Email" hint="We'll never share it."
    [slot]="{ helperText: 'text-xs text-primary/80' }">
    <tng-text-input formControlName="email" placeholder="Email" />
  </tng-form-field>
</form>
`,
  );

  readonly helperTextSlotTs = computed(
    () => `
import { TngFormField, TngSlotMap, TngFormFieldSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  helperTextSlot: TngSlotMap<TngFormFieldSlot> = {
    helperText: 'text-xs text-primary/80',
  };
}
`,
  );

  readonly errorTextSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-form-field label="Email" error="Invalid email"
    [slot]="{ errorText: 'text-sm font-semibold text-red-600' }">
    <tng-text-input formControlName="email" placeholder="Email" />
  </tng-form-field>
</form>
`,
  );

  readonly errorTextSlotTs = computed(
    () => `
import { TngFormField, TngSlotMap, TngFormFieldSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  errorTextSlot: TngSlotMap<TngFormFieldSlot> = {
    errorText: 'text-sm font-semibold text-red-600',
  };
}
`,
  );
}
