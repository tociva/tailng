import { Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngChips, TngSlotMap, TngChipsSlot } from '@tailng-ui/ui/form';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';
import { Country, COUNTRY_LIST, toFlagEmoji } from '../../../../../shared/country-list';

@Component({
  standalone: true,
  selector: 'docs-chips-styling',
  templateUrl: './chips-styling.component.html',
  imports: [
    TngChips,
    ReactiveFormsModule,
    TngTag,
    ExampleBlockComponent,
    TngExampleDemo,
  ],
})
export class ChipsStylingComponent {
  form = new FormGroup({
    countries: new FormControl<Country[]>([], { nonNullable: true }),
  });

  options = signal<Country[]>(COUNTRY_LIST);
  displayCountry = (c: Country) => `${toFlagEmoji(c.code)} ${c.name}`;

  onSearch(term: string) {
    const v = term.toLowerCase().trim();
    this.options.set(v ? COUNTRY_LIST.filter((c) => c.name.toLowerCase().includes(v) || c.iso.toLowerCase().includes(v)) : COUNTRY_LIST);
  }

  // Slot examples
  containerSlot: TngSlotMap<TngChipsSlot> = {
    container: 'border-2 border-blue-200 p-2',
  };

  chipsWrapperSlot: TngSlotMap<TngChipsSlot> = {
    chipsWrapper: 'border-2 border-blue-500 rounded-lg bg-blue-50/30',
  };

  chipSlot: TngSlotMap<TngChipsSlot> = {
    chip: 'rounded-full bg-blue-100 border border-blue-300',
  };

  chipLabelSlot: TngSlotMap<TngChipsSlot> = {
    chipLabel: 'font-semibold text-blue-900',
  };

  removeButtonSlot: TngSlotMap<TngChipsSlot> = {
    removeButton: 'text-red-600 hover:text-red-800',
  };

  inputSlot: TngSlotMap<TngChipsSlot> = {
    input: 'border-2 border-green-500 rounded-lg',
  };

  overlayPanelSlot: TngSlotMap<TngChipsSlot> = {
    overlayPanel: 'border-2 border-green-500 bg-green-50',
  };

  optionListSlot: TngSlotMap<TngChipsSlot> = {
    optionListContainer: 'py-2 max-h-48',
    optionListItem: 'px-4 py-2',
    optionListItemActive: 'bg-yellow-100 text-red-900',
  };

  // HTML examples
  readonly containerSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-chips formControlName="countries" [options]="options()"
    [displayWith]="displayCountry" [allowFreeText]="false"
    (search)="onSearch($event)"
    [slot]="{ container: 'border-2 border-blue-200 p-2' }" />
</form>
`,
  );

  readonly containerSlotTs = computed(
    () => `
import { TngChips, TngSlotMap, TngChipsSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  containerSlot: TngSlotMap<TngChipsSlot> = {
    container: 'border-2 border-blue-200 p-2',
  };
}
`,
  );

  readonly chipsWrapperSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-chips formControlName="countries" [options]="options()"
    [displayWith]="displayCountry" [allowFreeText]="false"
    (search)="onSearch($event)"
    [slot]="{ chipsWrapper: 'border-2 border-blue-500 rounded-lg bg-blue-50/30' }" />
</form>
`,
  );

  readonly chipsWrapperSlotTs = computed(
    () => `
import { TngChips, TngSlotMap, TngChipsSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  chipsWrapperSlot: TngSlotMap<TngChipsSlot> = {
    chipsWrapper: 'border-2 border-blue-500 rounded-lg bg-blue-50/30',
  };
}
`,
  );

  readonly chipSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-chips formControlName="countries" [options]="options()"
    [displayWith]="displayCountry" [allowFreeText]="false"
    (search)="onSearch($event)"
    [slot]="{ chip: 'rounded-full bg-blue-100 border border-blue-300' }" />
</form>
`,
  );

  readonly chipSlotTs = computed(
    () => `
import { TngChips, TngSlotMap, TngChipsSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  chipSlot: TngSlotMap<TngChipsSlot> = {
    chip: 'rounded-full bg-blue-100 border border-blue-300',
  };
}
`,
  );

  readonly chipLabelSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-chips formControlName="countries" [options]="options()"
    [displayWith]="displayCountry" [allowFreeText]="false"
    (search)="onSearch($event)"
    [slot]="{ chipLabel: 'font-semibold text-blue-900' }" />
</form>
`,
  );

  readonly chipLabelSlotTs = computed(
    () => `
import { TngChips, TngSlotMap, TngChipsSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  chipLabelSlot: TngSlotMap<TngChipsSlot> = {
    chipLabel: 'font-semibold text-blue-900',
  };
}
`,
  );

  readonly removeButtonSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-chips formControlName="countries" [options]="options()"
    [displayWith]="displayCountry" [allowFreeText]="false"
    (search)="onSearch($event)"
    [slot]="{ removeButton: 'text-red-600 hover:text-red-800' }" />
</form>
`,
  );

  readonly removeButtonSlotTs = computed(
    () => `
import { TngChips, TngSlotMap, TngChipsSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  removeButtonSlot: TngSlotMap<TngChipsSlot> = {
    removeButton: 'text-red-600 hover:text-red-800',
  };
}
`,
  );

  readonly inputSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-chips formControlName="countries" [options]="options()"
    [displayWith]="displayCountry" [allowFreeText]="false"
    (search)="onSearch($event)"
    [slot]="{ input: 'border-2 border-green-500 rounded-lg' }" />
</form>
`,
  );

  readonly inputSlotTs = computed(
    () => `
import { TngChips, TngSlotMap, TngChipsSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  inputSlot: TngSlotMap<TngChipsSlot> = {
    input: 'border-2 border-green-500 rounded-lg',
  };
}
`,
  );

  readonly overlayPanelSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-chips formControlName="countries" [options]="options()"
    [displayWith]="displayCountry" [allowFreeText]="false"
    (search)="onSearch($event)"
    [slot]="{ overlayPanel: 'border-2 border-green-500 bg-green-50' }" />
</form>
`,
  );

  readonly overlayPanelSlotTs = computed(
    () => `
import { TngChips, TngSlotMap, TngChipsSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  overlayPanelSlot: TngSlotMap<TngChipsSlot> = {
    overlayPanel: 'border-2 border-green-500 bg-green-50',
  };
}
`,
  );

  readonly optionListSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-chips formControlName="countries" [options]="options()"
    [displayWith]="displayCountry" [allowFreeText]="false"
    (search)="onSearch($event)"
    [slot]="{
      optionListContainer: 'py-2 max-h-48',
      optionListItem: 'px-4 py-2',
      optionListItemActive: 'bg-yellow-100 text-red-900'
    }" />
</form>
`,
  );

  readonly optionListSlotTs = computed(
    () => `
import { TngChips, TngSlotMap, TngChipsSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  optionListSlot: TngSlotMap<TngChipsSlot> = {
    optionListContainer: 'py-2 max-h-48',
    optionListItem: 'px-4 py-2',
    optionListItemActive: 'bg-blue-100 text-blue-900',
  };
}
`,
  );
}
