import { Component, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngTextarea, TngSlotMap, TngTextareaSlot } from '@tailng-ui/ui/form';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-textarea-styling',
  templateUrl: './textarea-styling.component.html',
  imports: [
    TngTextarea,
    ReactiveFormsModule,
    TngTag,
    ExampleBlockComponent,
    TngExampleDemo,
  ],
})
export class TextareaStylingComponent {
  form = new FormGroup({
    message: new FormControl('', { nonNullable: true }),
  });

  // Slot example
  textareaSlot: TngSlotMap<TngTextareaSlot> = {
    textarea: 'border-2 border-blue-500 rounded-lg shadow-md min-h-[100px]',
  };

  readonly textareaSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-textarea formControlName="message" placeholder="Custom styled"
    [slot]="{ textarea: 'border-2 border-blue-500 rounded-lg shadow-md min-h-[100px]' }" />
</form>
`,
  );

  readonly textareaSlotTs = computed(
    () => `
import { TngTextarea, TngSlotMap, TngTextareaSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  textareaSlot: TngSlotMap<TngTextareaSlot> = {
    textarea: 'border-2 border-blue-500 rounded-lg shadow-md min-h-[100px]',
  };
}
`,
  );
}
