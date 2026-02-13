import { Component, computed, signal } from '@angular/core';
import { TngOptionList, TngSlotMap, TngOptionListSlot } from '@tailng-ui/ui/overlay';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-option-list-styling',
  templateUrl: './option-list-styling.component.html',
  imports: [
    TngOptionList,
    TngTag,
    ExampleBlockComponent,
    TngExampleDemo,
  ],
})
export class OptionListStylingComponent {
  options = signal<string[]>(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']);
  activeIndex = signal<number>(-1);

  containerSlot: TngSlotMap<TngOptionListSlot> = { container: 'py-2 max-h-48' };
  optionSlot: TngSlotMap<TngOptionListSlot> = { option: 'px-4 py-3 text-base' };
  optionStateSlot: TngSlotMap<TngOptionListSlot> = {
    optionActive: 'bg-blue-100 text-blue-900',
    optionInactive: 'hover:bg-gray-50',
  };
  emptySlot: TngSlotMap<TngOptionListSlot> = { empty: 'px-4 py-3 text-center text-gray-500' };
  overlayPanelSlot: TngSlotMap<TngOptionListSlot> = { overlayPanel: 'p-2' };

  readonly containerSlotExampleHtml = computed(
    () => `
<tng-option-list
  [items]="options()"
  [activeIndex]="activeIndex()"
  (activeIndexChange)="activeIndex.set($event)"
  [slot]="{ container: 'py-2 max-h-48' }"
/>
`,
  );

  readonly containerSlotExampleTs = computed(
    () => `
import { Component, signal } from '@angular/core';
import { TngOptionList, TngSlotMap, TngOptionListSlot } from '@tailng-ui/ui/overlay';

@Component({
  selector: 'option-list-demo',
  standalone: true,
  imports: [TngOptionList],
  template: '...',
})
export class OptionListDemoComponent {
  options = signal<string[]>(['Apple', 'Banana', 'Cherry']);
  activeIndex = signal<number>(-1);
}
`,
  );

  readonly containerSlotExampleCss = computed(
    () => `
// Default container classes: py-1 overflow-auto max-h-60
// Slot classes are merged with defaults
`,
  );

  readonly optionSlotExampleHtml = computed(
    () => `
<tng-option-list
  [items]="options()"
  [activeIndex]="activeIndex()"
  (activeIndexChange)="activeIndex.set($event)"
  [slot]="{ option: 'px-4 py-3 text-base' }"
/>
`,
  );

  readonly optionSlotExampleTs = computed(
    () => `
import { Component, signal } from '@angular/core';
import { TngOptionList, TngSlotMap, TngOptionListSlot } from '@tailng-ui/ui/overlay';

@Component({
  selector: 'option-list-demo',
  standalone: true,
  imports: [TngOptionList],
  template: '...',
})
export class OptionListDemoComponent {
  options = signal<string[]>(['Apple', 'Banana', 'Cherry']);
  activeIndex = signal<number>(-1);
}
`,
  );

  readonly optionSlotExampleCss = computed(
    () => `
// Default option classes: px-3 py-2 text-sm cursor-pointer select-none
// Slot classes are merged with defaults and state classes
`,
  );

  readonly optionStateSlotExampleHtml = computed(
    () => `
<tng-option-list
  [items]="options()"
  [activeIndex]="activeIndex()"
  (activeIndexChange)="activeIndex.set($event)"
  [slot]="{
    optionActive: 'bg-blue-100 text-blue-900',
    optionInactive: 'hover:bg-gray-50'
  }"
/>
`,
  );

  readonly optionStateSlotExampleTs = computed(
    () => `
import { Component, signal } from '@angular/core';
import { TngOptionList, TngSlotMap, TngOptionListSlot } from '@tailng-ui/ui/overlay';

@Component({
  selector: 'option-list-demo',
  standalone: true,
  imports: [TngOptionList],
  template: '...',
})
export class OptionListDemoComponent {
  options = signal<string[]>(['Apple', 'Banana', 'Cherry']);
  activeIndex = signal<number>(-1);
}
`,
  );

  readonly optionStateSlotExampleCss = computed(
    () => `
// Default active: bg-primary text-on-primary
// Default inactive: bg-bg text-fg
// Slot classes replace defaults
`,
  );

  readonly emptySlotExampleHtml = computed(
    () => `
<tng-option-list
  [items]="[]"
  emptyText="No items found"
  [slot]="{ empty: 'px-4 py-3 text-center text-gray-500' }"
/>
`,
  );

  readonly emptySlotExampleTs = computed(
    () => `
import { Component } from '@angular/core';
import { TngOptionList, TngSlotMap, TngOptionListSlot } from '@tailng-ui/ui/overlay';

@Component({
  selector: 'option-list-demo',
  standalone: true,
  imports: [TngOptionList],
  template: '...',
})
export class OptionListDemoComponent {}
`,
  );

  readonly emptySlotExampleCss = computed(
    () => `
// Default empty classes: px-3 py-2 text-sm text-disable
// Slot classes are merged with defaults
`,
  );

  readonly overlayPanelSlotExampleHtml = computed(
    () => `
<tng-option-list
  modal="true"
  [items]="options()"
  [activeIndex]="activeIndex()"
  (activeIndexChange)="activeIndex.set($event)"
  [slot]="{ overlayPanel: 'p-2' }"
/>
`,
  );

  readonly overlayPanelSlotExampleTs = computed(
    () => `
import { Component, signal } from '@angular/core';
import { TngOptionList, TngSlotMap, TngOptionListSlot } from '@tailng-ui/ui/overlay';

@Component({
  selector: 'option-list-demo',
  standalone: true,
  imports: [TngOptionList],
  template: '...',
})
export class OptionListDemoComponent {
  options = signal<string[]>(['Apple', 'Banana', 'Cherry']);
  activeIndex = signal<number>(-1);
}
`,
  );

  readonly overlayPanelSlotExampleCss = computed(
    () => `
// Default overlayPanel value: p-0 (no padding)
// Only applies when modal=true
// Slot classes are passed to tng-overlay-panel component
`,
  );
}
