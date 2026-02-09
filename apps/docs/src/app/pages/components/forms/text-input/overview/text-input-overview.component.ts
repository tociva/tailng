import { Component, computed } from '@angular/core';
import { TngIcon } from '@tailng-ui/icons/icon';
import { TngTag } from '@tailng-ui/ui/primitives';
import { TngTextInput, TngSlotMap, TngTextInputSlot } from '@tailng-ui/ui/form';
import {
  ExampleBlockComponent,
  TngExampleDemo,
} from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-text-input-overview',
  templateUrl: './text-input-overview.component.html',
  imports: [TngIcon, TngTextInput, TngTag, ExampleBlockComponent, TngExampleDemo],
})
export class TextInputOverviewComponent {
  readonly customSlot: TngSlotMap<TngTextInputSlot> = {
    frame: ['border-2', 'border-blue-900', 'rounded-md', 'shadow-md', 'focus-within:ring-blue-900'],
  };

  readonly textInputBasicHtml = computed(
    () => `
<form [formGroup]="login">
  <tng-text-input
    formControlName="userName"
    placeholder="Enter username"
    [slot]="customSlot"
  />
</form>
`,
  );

  readonly textInputBasicTs = computed(
    () => `
import { Component } from '@angular/core';
import {FormControl,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { TngTextInput, TngSlotMap, TngTextInputSlot } from '@tailng-ui/ui/form';
@Component({
  selector: 'text-input-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TngTextInput],
  templateUrl: './text-input.component.html',
})
export class TextInputDemoComponent {
  login = new FormGroup({
    userName: new FormControl('', { nonNullable: true })
});

  readonly customSlot: TngSlotMap<TngTextInputSlot> = {
    frame: ['border-2', 'border-blue-900', 'rounded-md', 'shadow-md', 'focus-within:ring-blue-900'],
  };

`,
  );

  readonly textInputBasicCss = computed(
    () => `
rootClass = flex h-10 w-full items-center rounded-md 
            border border-border bg-bg text-foreground
            focus-within:border-transparent 
            focus-within:ring-2 focus-within:ring-primary 
            focus-within:ring-offset-1 
            focus-within:ring-offset-background

`,
  );

  readonly searchSlot: TngSlotMap<TngTextInputSlot> = {
    input: ['text-blue-700'],
  };

  readonly textInputSearchHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-text-input placeholder="Search..."
    formControlName="search"
    [slot]="searchSlot"
  >
    <tng-icon
      tngPrefix
      name="bootstrapSearch"
      class="ml-3 text-muted"
    />
  </tng-text-input>
</form>
`,
  );

  readonly textInputSearchTs = computed(
    () => `
import { Component } from '@angular/core';
import {FormControl,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { TngIcon } from '@tailng-ui/icons/icon';
import { TngTextInput, TngSlotMap, TngTextInputSlot } from '@tailng-ui/ui/form';
@Component({
  selector: 'text-input-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TngTextInput,TngIcon],
  templateUrl: './text-input.component.html',
})
export class TextInputDemoComponent {
  form = new FormGroup({
    search: new FormControl('', { nonNullable: true })
});

  readonly searchSlot: TngSlotMap<TngTextInputSlot> = {
    input: ['text-blue-700'],
  };

`,
  );
  readonly textInputSearchCss = computed(
    () => `
// Default slot values
frame = flex h-10 w-full items-center rounded-md border border-border bg-bg text-foreground
        focus-within:border-transparent focus-within:ring-2 focus-within:ring-primary
        focus-within:ring-offset-1 focus-within:ring-offset-background
input = h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted
tngPrefix = ml-3
`,
  );
}
