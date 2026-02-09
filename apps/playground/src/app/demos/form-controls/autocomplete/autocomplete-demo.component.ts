import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TngAutocomplete, TngSlotMap, TngAutocompleteSlot } from '@tailng-ui/ui/form';

import { Country, COUNTRY_LIST } from '../../util/country-list';
import { toFlagEmoji } from '../../util/common.util';

const countryCodeToFlag = (code: string): string =>
  code
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );

@Component({
  selector: 'playground-autocomplete-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TngAutocomplete],
  templateUrl: './autocomplete-demo.component.html',
})
export class AutocompleteDemoComponent {
  // CVA value lives in a FormControl now
  countryCtrl = new FormControl<Country | null>(null);

  // Filtered options shown in autocomplete
  options = signal<Country[]>([]);

  // Display function for input + list
  displayCountry = (country: Country) =>
    `${toFlagEmoji(country.code)} ${country.name}`;

  // Called when user types (still needed for filtering / API calls)
  onSearch(term: string) {
    const value = term.toLowerCase().trim();

    if (!value) {
      this.options.set([]);
      return;
    }

    const filtered = COUNTRY_LIST.filter(
      (country) =>
        country.name.toLowerCase().includes(value) ||
        country.iso.toLowerCase().includes(value)
    );

    this.options.set(filtered);
  }

  countryControl2 = new FormControl<Country | null>(null);
  options2 = signal<Country[]>([]);

  onSearch2(term: string) {
    const value = term.toLowerCase().trim();

    if (!value) {
      this.options2.set([]);
      return;
    }

    const filtered = COUNTRY_LIST.filter(
      (country) =>
        country.name.toLowerCase().includes(value) ||
        country.iso.toLowerCase().includes(value)
      );

    this.options2.set(filtered);
  }

  displayCountryText = (c: Country) =>
  `${countryCodeToFlag(c.code)} ${c.name}`;

  /* ─────────────────────────
   * Demo: slot overrides (keep in TS)
   * ───────────────────────── */
  readonly customSlot: TngSlotMap<TngAutocompleteSlot> = {
    container: 'border-2 border-blue-200',
    inputWrapper: 'bg-gray-50 rounded-md',
    input: 'border-2 border-blue-500 rounded-lg shadow-md',
    selectedTpl: 'bg-blue-50 rounded-md',
    overlayPanel: 'border-2 border-green-500 bg-green-50',
  };
  
  onClosed(reason: string) {
    console.log('Autocomplete closed:', reason);
  }
}
