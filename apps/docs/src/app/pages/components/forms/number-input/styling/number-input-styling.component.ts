import { Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngNumberInput, TngSlotMap, TngNumberInputSlot } from '@tailng-ui/ui/form';
import { TngIcon } from '@tailng-ui/icons/icon';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-number-input-styling',
  templateUrl: './number-input-styling.component.html',
  imports: [
    TngNumberInput,
    TngIcon,
    ReactiveFormsModule,
    TngTag,
    ExampleBlockComponent,
    TngExampleDemo,
  ],
})
export class NumberInputStylingComponent {
  form = new FormGroup({
    quantity: new FormControl<number | null>(42, { nonNullable: false }),
    amount: new FormControl<number | null>(null, { nonNullable: false }),
  });

  readonly frameSlot: TngSlotMap<TngNumberInputSlot> = {
    frame: ['border-2', 'border-blue-500', 'rounded-lg', 'shadow-md', 'w-48'],
  };

  readonly klassExampleHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-number-input
    formControlName="quantity"
    placeholder="Quantity"
    [slot]="frameSlot"
  />
</form>
`,
  );

  readonly klassExampleTs = computed(
    () => `
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngNumberInput, TngSlotMap, TngNumberInputSlot } from '@tailng-ui/ui/form';

@Component({
  selector: 'number-input-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TngNumberInput],
  templateUrl: './number-input.component.html',
})
export class NumberInputDemoComponent {
  form = new FormGroup({
    quantity: new FormControl<number | null>(42, { nonNullable: false }),
  });

  readonly frameSlot: TngSlotMap<TngNumberInputSlot> = {
    frame: ['border-2', 'border-blue-500', 'rounded-lg', 'shadow-md', 'w-48'],
  };
}
`,
  );

  readonly klassExampleCss = computed(
    () => `
// Default classes (merged with your slot)
// frame = flex h-10 w-full items-center rounded-md border border-border bg-bg text-foreground
//         focus-within:border-transparent focus-within:ring-2 focus-within:ring-primary
//         focus-within:ring-offset-1 focus-within:ring-offset-background
// input = h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted
`,
  );

  readonly textSlot: TngSlotMap<TngNumberInputSlot> = {
    input: ['text-lg', 'font-semibold', 'text-blue-600', 'w-48'],
  };

  readonly inputKlassExampleHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-number-input
    formControlName="quantity"
    placeholder="Custom text styling"
    [slot]="textSlot"
  />
</form>
`,
  );

  readonly inputKlassExampleTs = computed(
    () => `
readonly textSlot: TngSlotMap<TngNumberInputSlot> = {
  input: ['text-lg', 'font-semibold', 'text-blue-600', 'w-48'],
};
`,
  );

  readonly inputKlassExampleCss = computed(
    () => `
// Use input slot for text size, color, font weight, etc.
input = text-lg font-semibold text-blue-600
`,
  );

  readonly prefixSlot: TngSlotMap<TngNumberInputSlot> = {
    prefix: ['bg-blue-50', 'rounded-l-md'],
  };

  readonly prefixExampleHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-number-input placeholder="Amount" [slot]="prefixSlot">
    <tng-icon
      tngPrefix
      name="bootstrapCurrencyDollar"
      class="ml-3 text-blue-600"
    />
  </tng-number-input>
</form>
`,
  );

  readonly prefixExampleTs = computed(
    () => `
import { TngIcon } from '@tailng-ui/icons/icon';
import { TngNumberInput, TngSlotMap, TngNumberInputSlot } from '@tailng-ui/ui/form';

readonly prefixSlot: TngSlotMap<TngNumberInputSlot> = {
  prefix: ['bg-blue-50', 'rounded-l-md'],
};
`,
  );

  readonly suffixSlot: TngSlotMap<TngNumberInputSlot> = {
    suffix: ['bg-green-50', 'rounded-r-md'],
  };

  readonly suffixExampleHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-number-input placeholder="Quantity" [slot]="suffixSlot">
    <tng-icon
      tngSuffix
      name="bootstrapCheck"
      class="mr-3 text-green-600"
    />
  </tng-number-input>
</form>
`,
  );

  readonly suffixExampleTs = computed(
    () => `
import { TngIcon } from '@tailng-ui/icons/icon';
import { TngNumberInput, TngSlotMap, TngNumberInputSlot } from '@tailng-ui/ui/form';

readonly suffixSlot: TngSlotMap<TngNumberInputSlot> = {
  suffix: ['bg-green-50', 'rounded-r-md'],
};
`,
  );

  readonly combinedSlot: TngSlotMap<TngNumberInputSlot> = {
    frame: ['border-2', 'border-purple-500', 'rounded-xl'],
    input: ['text-purple-700', 'placeholder:text-purple-300'],
    prefix: ['bg-purple-50'],
    suffix: ['bg-purple-50'],
  };

  readonly combinedExampleHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-number-input
    formControlName="amount"
    placeholder="Fully customized"
    [min]="0"
    [max]="1000"
    [step]="0.01"
    [slot]="combinedSlot"
  >
    <tng-icon
      tngPrefix
      name="bootstrapCurrencyDollar"
      class="ml-3 text-purple-600"
    />
    <tng-icon
      tngSuffix
      name="bootstrapCheck"
      class="mr-3 text-purple-600"
    />
  </tng-number-input>
</form>
`,
  );

  readonly combinedExampleTs = computed(
    () => `
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngIcon } from '@tailng-ui/icons/icon';
import { TngNumberInput, TngSlotMap, TngNumberInputSlot } from '@tailng-ui/ui/form';

@Component({
  selector: 'number-input-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TngNumberInput, TngIcon],
  template: \`<form [formGroup]="form">
    <tng-number-input formControlName="amount" placeholder="Amount"
      [min]="0" [max]="1000" [step]="0.01"
      [slot]="combinedSlot">
      <tng-icon tngPrefix name="bootstrapCurrencyDollar" class="ml-3 text-purple-600" />
      <tng-icon tngSuffix name="bootstrapCheck" class="mr-3 text-purple-600" />
    </tng-number-input>
  </form>\`,
})
export class NumberInputDemoComponent {
  form = new FormGroup({
    amount: new FormControl<number | null>(null, { nonNullable: false }),
  });

  readonly combinedSlot: TngSlotMap<TngNumberInputSlot> = {
    frame: ['border-2', 'border-purple-500', 'rounded-xl'],
    input: ['text-purple-700', 'placeholder:text-purple-300'],
    prefix: ['bg-purple-50'],
    suffix: ['bg-purple-50'],
  };
}
`,
  );

  readonly isCodePanelOpen = signal(false);
  toggleCodePanel(): void {
    this.isCodePanelOpen.set(!this.isCodePanelOpen());
  }
}
