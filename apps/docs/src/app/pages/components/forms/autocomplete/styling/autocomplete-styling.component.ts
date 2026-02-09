import { Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngAutocomplete, TngSlotMap, TngAutocompleteSlot } from '@tailng-ui/ui/form';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';
import { Country, COUNTRY_LIST, toFlagEmoji } from '../../../../../shared/country-list';

@Component({
  standalone: true,
  selector: 'docs-autocomplete-styling',
  templateUrl: './autocomplete-styling.component.html',
  imports: [
    TngAutocomplete,
    ReactiveFormsModule,
    TngTag,
    ExampleBlockComponent,
    TngExampleDemo,
  ],
})
export class AutocompleteStylingComponent {
  form = new FormGroup({
    country: new FormControl<Country | null>(null),
  });

  options = signal<Country[]>([]);

  displayCountry = (c: Country) => `${toFlagEmoji(c.code)} ${c.name}`;

  onSearch(term: string) {
    const v = term.toLowerCase().trim();
    this.options.set(v ? COUNTRY_LIST.filter((c) => c.name.toLowerCase().includes(v) || c.iso.toLowerCase().includes(v)) : []);
  }

  containerSlot = { container: 'border-2 border-blue-200' };
  inputWrapperSlot = { inputWrapper: 'bg-red-500 rounded-md p-1' };
  inputSlot = { input: 'border-2 border-blue-500 rounded-lg shadow-md' };
  selectedTplSlot = { selectedTpl: 'bg-blue-50 rounded-md' };
  overlayPanelSlot = { overlayPanel: 'border-2 border-green-500 bg-green-50' };
  optionListSlot: TngSlotMap<TngAutocompleteSlot> = {
    optionListContainer: 'py-2 max-h-48',
    optionListItem: 'px-4 py-2',
    optionListItemActive: 'bg-yellow-100 text-red-900',
  };

  // Form and options for selectedTpl demo
  formWithTemplate = new FormGroup({
    country: new FormControl<Country | null>(null),
  });

  optionsWithTemplate = signal<Country[]>([]);

  onSearchWithTemplate(term: string) {
    const v = term.toLowerCase().trim();
    this.optionsWithTemplate.set(v ? COUNTRY_LIST.filter((c) => c.name.toLowerCase().includes(v) || c.iso.toLowerCase().includes(v)) : []);
  }

  readonly containerSlotExampleHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-autocomplete
    formControlName="country"
    [options]="options()"
    [displayWith]="displayCountry"
    placeholder="Search country…"
    (search)="onSearch($event)"
    [slot]="{ container: 'border-2 border-blue-200' }"
  />
</form>
`,
  );

  readonly containerSlotExampleTs = computed(
    () => `
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngAutocomplete } from '@tailng-ui/ui/form';

@Component({
  selector: 'autocomplete-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TngAutocomplete],
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteDemoComponent {
  form = new FormGroup({ country: new FormControl<Country | null>(null) });
  options = signal<Country[]>([]);
  displayCountry = (c: Country) => c.name;
  onSearch(term: string) { /* filter options */ }
}
`,
  );

  readonly containerSlotExampleCss = computed(
    () => `
// Default container class: relative
// Slot classes are merged with defaults
`,
  );

  readonly inputWrapperSlotExampleHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-autocomplete
    formControlName="country"
    [options]="options()"
    [displayWith]="displayCountry"
    placeholder="Search country…"
    (search)="onSearch($event)"
    [slot]="{ inputWrapper: 'bg-gray-50 rounded-md p-1' }"
  />
</form>
`,
  );

  readonly inputWrapperSlotExampleTs = computed(
    () => `
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngAutocomplete } from '@tailng-ui/ui/form';

@Component({
  selector: 'autocomplete-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TngAutocomplete],
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteDemoComponent {
  form = new FormGroup({ country: new FormControl<Country | null>(null) });
  options = signal<Country[]>([]);
  displayCountry = (c: Country) => c.name;
  onSearch(term: string) { /* filter options */ }
}
`,
  );

  readonly inputWrapperSlotExampleCss = computed(
    () => `
// Default inputWrapper classes: none (empty by default)
// Slot classes are merged with disabled state classes (opacity-60, pointer-events-none)
// when the component is disabled
`,
  );

  readonly inputSlotExampleHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-autocomplete
    formControlName="country"
    [options]="options()"
    [displayWith]="displayCountry"
    placeholder="Search country…"
    (search)="onSearch($event)"
    [slot]="{ input: 'border-2 border-blue-500 rounded-lg shadow-md' }"
  />
</form>
`,
  );

  readonly inputSlotExampleTs = computed(
    () => `
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngAutocomplete } from '@tailng-ui/ui/form';

@Component({
  selector: 'autocomplete-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TngAutocomplete],
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteDemoComponent {
  form = new FormGroup({ country: new FormControl<Country | null>(null) });
  options = signal<Country[]>([]);
  displayCountry = (c: Country) => c.name;
  onSearch(term: string) { /* filter options */ }
}
`,
  );

  readonly inputSlotExampleCss = computed(
    () => `
// Default input classes are merged with slot input:
// relative z-0 w-full border rounded-md px-3 py-2 text-sm
// focus:outline-none focus:ring-2 focus:ring-primary bg-bg text-fg
`,
  );

  readonly selectedTplSlotExampleHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-autocomplete
    formControlName="country"
    [options]="options()"
    [displayWith]="displayCountry"
    placeholder="Search country…"
    (search)="onSearch($event)"
    [slot]="{ selectedTpl: 'bg-blue-50 rounded-md' }"
  >
    <ng-template #inputTpl let-item>
      <div class="flex items-center gap-2">
        <span class="opacity-70">({{ item.code }})</span>
        <span class="font-semibold">{{ item.name }}</span>
      </div>
    </ng-template>
  </tng-autocomplete>
</form>
`,
  );

  readonly selectedTplSlotExampleTs = computed(
    () => `
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngAutocomplete } from '@tailng-ui/ui/form';

@Component({
  selector: 'autocomplete-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TngAutocomplete],
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteDemoComponent {
  form = new FormGroup({ country: new FormControl<Country | null>(null) });
  options = signal<Country[]>([]);
  displayCountry = (c: Country) => c.name;
  onSearch(term: string) { /* filter options */ }
}
`,
  );

  readonly selectedTplSlotExampleCss = computed(
    () => `
// Default selectedTpl classes are merged with slot selectedTpl:
// pointer-events-none absolute inset-y-0 left-0 right-0 z-10 flex items-center px-3
// Slot classes allow customization of background, borders, rounded corners, etc.
`,
  );

  readonly overlayPanelSlotExampleHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-autocomplete
    formControlName="country"
    [options]="options()"
    [displayWith]="displayCountry"
    placeholder="Search country…"
    (search)="onSearch($event)"
    [slot]="{ overlayPanel: 'border-2 border-green-500 bg-green-50' }"
  />
</form>
`,
  );

  readonly overlayPanelSlotExampleTs = computed(
    () => `
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngAutocomplete } from '@tailng-ui/ui/form';

@Component({
  selector: 'autocomplete-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TngAutocomplete],
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteDemoComponent {
  form = new FormGroup({ country: new FormControl<Country | null>(null) });
  options = signal<Country[]>([]);
  displayCountry = (c: Country) => c.name;
  onSearch(term: string) { /* filter options */ }
}
`,
  );

  readonly overlayPanelSlotExampleCss = computed(
    () => `
// Default overlay panel classes are merged with slot overlayPanel:
// bg-bg text-fg border border-border rounded-md shadow-lg max-h-60 overflow-auto outline-none
// Slot classes allow customization of borders, backgrounds, shadows, max-height, etc.
`,
  );

  readonly optionListSlotExampleHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-autocomplete
    formControlName="country"
    [options]="options()"
    [displayWith]="displayCountry"
    placeholder="Search country…"
    (search)="onSearch($event)"
    [slot]="{
      optionListContainer: 'py-2 max-h-48',
      optionListItem: 'px-4 py-2',
      optionListItemActive: 'bg-blue-100 text-blue-900'
    }"
  />
</form>
`,
  );

  readonly optionListSlotExampleTs = computed(
    () => `
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngAutocomplete, TngSlotMap, TngAutocompleteSlot } from '@tailng-ui/ui/form';

@Component({
  selector: 'autocomplete-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TngAutocomplete],
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteDemoComponent {
  form = new FormGroup({ country: new FormControl<Country | null>(null) });
  options = signal<Country[]>([]);
  displayCountry = (c: Country) => c.name;
  onSearch(term: string) { /* filter options */ }
}
`,
  );

  readonly optionListSlotExampleCss = computed(
    () => `
// Option list slots are passed to tng-option-list component:
// - optionListContainer: default 'py-1 overflow-auto max-h-60'
// - optionListItem: default 'px-3 py-2 text-sm cursor-pointer select-none'
// - optionListItemActive: default 'bg-primary text-on-primary'
// - optionListItemInactive: default 'bg-bg text-fg'
// - optionListEmpty: default 'px-3 py-2 text-sm text-disable'
`,
  );
}
