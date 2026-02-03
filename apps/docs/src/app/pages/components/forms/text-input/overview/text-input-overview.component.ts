import { Component, computed } from '@angular/core';
import { TngIcon } from '@tociva/tailng-icons/icon';
import { TngTag } from '@tociva/tailng-ui/buttons-indicators';
import { TngTextInput } from '@tociva/tailng-ui/form-controls';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-text-input-overview',
  templateUrl: './text-input-overview.component.html',
  imports: [
    TngIcon,
    TngTextInput,
    TngTag,
    ExampleBlockComponent,
    TngExampleDemo

],
})
export class TextInputOverviewComponent {
  readonly textInputBasicHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-text-input
    formControlName="username"
    placeholder="Enter username"
    rootKlass="border-2 border-blue-500 rounded-lg shadow-md"
  />
</form>
`,
  );

  readonly textInputBasicTs = computed(
    () => `
import { Component } from '@angular/core';
import {FormControl,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { TailngTextInputComponent } from '@tociva/tailng-ui';
@Component({
  selector: 'text-input-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TailngTextInputComponent],
  templateUrl: './text-input.component.html',
})
export class TextInputDemoComponent {
  form = new FormGroup({
    username: new FormControl('', { nonNullable: true })
});

`,
  );

  readonly textInputBasicCss = computed(
    () => `
rootClass = flex h-10 w-full items-center rounded-md border border-border bg-bg text-foreground
  focus-within:border-transparent focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-1 
  focus-within:ring-offset-background

`,
  );

  readonly textInputSearchHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-text-input placeholder="Search..."
    formControlName="search"
    inputKlass="text-blue-700"
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
import { TailngTextInputComponent,TailngIconComponent } from '@tociva/tailng-ui';
@Component({
  selector: 'text-input-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TailngTextInputComponent,TailngIconComponent],
  templateUrl: './text-input.component.html',
})
export class TextInputDemoComponent {
  form = new FormGroup({
    search: new FormControl('', { nonNullable: true })
});

`
  );
  readonly textInputSearchCss = computed(
    () => `
inputKlass = h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted
tngPrefix = ml-3
`,
  );
}