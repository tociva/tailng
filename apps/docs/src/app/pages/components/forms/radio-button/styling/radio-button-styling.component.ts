import { Component, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngRadioButton, TngSlotMap, TngRadioButtonSlot } from '@tailng-ui/ui/form';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-radio-button-styling',
  templateUrl: './radio-button-styling.component.html',
  imports: [
    TngRadioButton,
    ReactiveFormsModule,
    TngTag,
    ExampleBlockComponent,
    TngExampleDemo,
  ],
})
export class RadioButtonStylingComponent {
  form = new FormGroup({
    choice: new FormControl<string | null>(null),
  });

  // Slot examples
  containerSlot: TngSlotMap<TngRadioButtonSlot> = {
    container: 'inline-flex items-center gap-3 cursor-pointer p-2 rounded border-2 border-blue-500',
  };

  inputSlot: TngSlotMap<TngRadioButtonSlot> = {
    input: 'h-5 w-5 accent-green-600',
  };

  labelSlot: TngSlotMap<TngRadioButtonSlot> = {
    label: 'text-base font-semibold text-primary',
  };

  // HTML examples
  readonly containerSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-radio-button formControlName="choice" name="choice" value="a" label="Option A"
    [slot]="{ container: 'inline-flex items-center gap-3 cursor-pointer p-2 rounded border-2 border-blue-500' }" />
</form>
`,
  );

  readonly containerSlotTs = computed(
    () => `
import { TngRadioButton, TngSlotMap, TngRadioButtonSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  containerSlot: TngSlotMap<TngRadioButtonSlot> = {
    container: 'inline-flex items-center gap-3 cursor-pointer p-2 rounded border-2 border-blue-500',
  };
}
`,
  );

  readonly inputSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-radio-button formControlName="choice" name="choice" value="a" label="Custom input"
    [slot]="{ input: 'h-5 w-5 accent-green-600' }" />
</form>
`,
  );

  readonly inputSlotTs = computed(
    () => `
import { TngRadioButton, TngSlotMap, TngRadioButtonSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  inputSlot: TngSlotMap<TngRadioButtonSlot> = {
    input: 'h-5 w-5 accent-green-600',
  };
}
`,
  );

  readonly labelSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-radio-button formControlName="choice" name="choice" value="a" label="Custom label"
    [slot]="{ label: 'text-base font-semibold text-primary' }" />
</form>
`,
  );

  readonly labelSlotTs = computed(
    () => `
import { TngRadioButton, TngSlotMap, TngRadioButtonSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  labelSlot: TngSlotMap<TngRadioButtonSlot> = {
    label: 'text-base font-semibold text-primary',
  };
}
`,
  );
}
