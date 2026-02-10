import { Component, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-datepicker-styling',
  templateUrl: './datepicker-styling.component.html',
  imports: [
    TngDatepicker,
    ReactiveFormsModule,
    TngTag,
    ExampleBlockComponent,
    TngExampleDemo,
  ],
})
export class DatepickerStylingComponent {
  form = new FormGroup({
    period: new FormControl<Date | null>(null, { nonNullable: false }),
  });

  // Slot examples
  containerSlot: TngSlotMap<TngDatepickerSlot> = {
    container: 'border-2 border-blue-200 p-2',
  };

  disabledSlot: TngSlotMap<TngDatepickerSlot> = {
    disabled: 'bg-gray-100',
  };

  fieldSlot: TngSlotMap<TngDatepickerSlot> = {
    field: 'border-2 border-purple-300',
  };

  inputSlot: TngSlotMap<TngDatepickerSlot> = {
    input: 'border-2 border-blue-500 rounded-lg font-semibold',
  };

  toggleSlot: TngSlotMap<TngDatepickerSlot> = {
    toggle: 'bg-blue-100 hover:bg-blue-200 rounded-r-md',
  };

  toggleIconSlot: TngSlotMap<TngDatepickerSlot> = {
    toggleIcon: 'text-blue-600',
  };

  overlayPanelSlot: TngSlotMap<TngDatepickerSlot> = {
    overlayPanel: 'border-2 border-green-500',
  };

  panelFrameSlot: TngSlotMap<TngDatepickerSlot> = {
    panelFrame: 'border-4 border-purple-500 shadow-2xl',
  };

  panelLayoutSlot: TngSlotMap<TngDatepickerSlot> = {
    panelLayout: 'bg-gray-50',
  };

  monthRailSlot: TngSlotMap<TngDatepickerSlot> = {
    monthRail: 'bg-blue-50 border-r-2 border-blue-300',
  };

  monthListSlot: TngSlotMap<TngDatepickerSlot> = {
    monthList: 'gap-1',
  };

  monthItemSlot: TngSlotMap<TngDatepickerSlot> = {
    monthItem: 'hover:bg-blue-100 font-bold',
  };

  calendarSlot: TngSlotMap<TngDatepickerSlot> = {
    calendar: 'bg-yellow-50',
  };

  titleSlot: TngSlotMap<TngDatepickerSlot> = {
    title: 'text-lg font-bold text-purple-600',
  };

  weekdayRowSlot: TngSlotMap<TngDatepickerSlot> = {
    weekdayRow: 'bg-gray-100',
  };

  weekdayCellSlot: TngSlotMap<TngDatepickerSlot> = {
    weekdayCell: 'font-bold',
  };

  dayGridSlot: TngSlotMap<TngDatepickerSlot> = {
    dayGrid: 'gap-1',
  };

  dayCellSlot: TngSlotMap<TngDatepickerSlot> = {
    dayCell: 'hover:scale-110 transition-transform',
  };

  previewTextSlot: TngSlotMap<TngDatepickerSlot> = {
    previewText: 'text-blue-600 font-semibold',
  };

  actionBarSlot: TngSlotMap<TngDatepickerSlot> = {
    actionBar: 'bg-gray-100 p-2',
  };

  cancelSlot: TngSlotMap<TngDatepickerSlot> = {
    cancel: 'bg-red-100 hover:bg-red-200 text-red-800',
  };

  confirmSlot: TngSlotMap<TngDatepickerSlot> = {
    confirm: 'bg-green-600 hover:bg-green-700',
  };

  yearRailSlot: TngSlotMap<TngDatepickerSlot> = {
    yearRail: 'bg-blue-50 border-l-2 border-blue-300',
  };

  yearNavPrevSlot: TngSlotMap<TngDatepickerSlot> = {
    yearNavPrev: 'bg-blue-200 hover:bg-blue-300',
  };

  yearListSlot: TngSlotMap<TngDatepickerSlot> = {
    yearList: 'gap-1',
  };

  yearItemSlot: TngSlotMap<TngDatepickerSlot> = {
    yearItem: 'hover:bg-blue-100 font-bold',
  };

  yearNavNextSlot: TngSlotMap<TngDatepickerSlot> = {
    yearNavNext: 'bg-blue-200 hover:bg-blue-300',
  };

  // HTML examples
  readonly containerSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ container: 'border-2 border-blue-200 p-2' }" />
</form>
`,
  );

  readonly containerSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  containerSlot: TngSlotMap<TngDatepickerSlot> = {
    container: 'border-2 border-blue-200 p-2',
  };
}
`,
  );

  readonly disabledSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ disabled: 'bg-gray-100' }" />
</form>
`,
  );

  readonly disabledSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  disabledSlot: TngSlotMap<TngDatepickerSlot> = {
    disabled: 'bg-gray-100',
  };
}
`,
  );

  readonly fieldSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ field: 'border-2 border-purple-300' }" />
</form>
`,
  );

  readonly fieldSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  fieldSlot: TngSlotMap<TngDatepickerSlot> = {
    field: 'border-2 border-purple-300',
  };
}
`,
  );

  readonly inputSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ input: 'border-2 border-blue-500 rounded-lg font-semibold' }" />
</form>
`,
  );

  readonly inputSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  inputSlot: TngSlotMap<TngDatepickerSlot> = {
    input: 'border-2 border-blue-500 rounded-lg font-semibold',
  };
}
`,
  );

  readonly toggleSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ toggle: 'bg-blue-100 hover:bg-blue-200 rounded-r-md' }" />
</form>
`,
  );

  readonly toggleSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  toggleSlot: TngSlotMap<TngDatepickerSlot> = {
    toggle: 'bg-blue-100 hover:bg-blue-200 rounded-r-md',
  };
}
`,
  );

  readonly toggleIconSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ toggleIcon: 'text-blue-600' }" />
</form>
`,
  );

  readonly toggleIconSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  toggleIconSlot: TngSlotMap<TngDatepickerSlot> = {
    toggleIcon: 'text-blue-600',
  };
}
`,
  );

  readonly overlayPanelSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ overlayPanel: 'border-2 border-green-500' }" />
</form>
`,
  );

  readonly overlayPanelSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  overlayPanelSlot: TngSlotMap<TngDatepickerSlot> = {
    overlayPanel: 'border-2 border-green-500',
  };
}
`,
  );

  readonly panelFrameSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ panelFrame: 'border-4 border-purple-500 shadow-2xl' }" />
</form>
`,
  );

  readonly panelFrameSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  panelFrameSlot: TngSlotMap<TngDatepickerSlot> = {
    panelFrame: 'border-4 border-purple-500 shadow-2xl',
  };
}
`,
  );

  readonly panelLayoutSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ panelLayout: 'bg-gray-50' }" />
</form>
`,
  );

  readonly panelLayoutSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  panelLayoutSlot: TngSlotMap<TngDatepickerSlot> = {
    panelLayout: 'bg-gray-50',
  };
}
`,
  );

  readonly monthRailSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ monthRail: 'bg-blue-50 border-r-2 border-blue-300' }" />
</form>
`,
  );

  readonly monthRailSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  monthRailSlot: TngSlotMap<TngDatepickerSlot> = {
    monthRail: 'bg-blue-50 border-r-2 border-blue-300',
  };
}
`,
  );

  readonly monthListSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ monthList: 'gap-1' }" />
</form>
`,
  );

  readonly monthListSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  monthListSlot: TngSlotMap<TngDatepickerSlot> = {
    monthList: 'gap-1',
  };
}
`,
  );

  readonly monthItemSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ monthItem: 'hover:bg-blue-100 font-bold' }" />
</form>
`,
  );

  readonly monthItemSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  monthItemSlot: TngSlotMap<TngDatepickerSlot> = {
    monthItem: 'hover:bg-blue-100 font-bold',
  };
}
`,
  );

  readonly calendarSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ calendar: 'bg-yellow-50' }" />
</form>
`,
  );

  readonly calendarSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  calendarSlot: TngSlotMap<TngDatepickerSlot> = {
    calendar: 'bg-yellow-50',
  };
}
`,
  );

  readonly titleSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ title: 'text-lg font-bold text-purple-600' }" />
</form>
`,
  );

  readonly titleSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  titleSlot: TngSlotMap<TngDatepickerSlot> = {
    title: 'text-lg font-bold text-purple-600',
  };
}
`,
  );

  readonly weekdayRowSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ weekdayRow: 'bg-gray-100' }" />
</form>
`,
  );

  readonly weekdayRowSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  weekdayRowSlot: TngSlotMap<TngDatepickerSlot> = {
    weekdayRow: 'bg-gray-100',
  };
}
`,
  );

  readonly weekdayCellSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ weekdayCell: 'font-bold' }" />
</form>
`,
  );

  readonly weekdayCellSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  weekdayCellSlot: TngSlotMap<TngDatepickerSlot> = {
    weekdayCell: 'font-bold',
  };
}
`,
  );

  readonly dayGridSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ dayGrid: 'gap-1' }" />
</form>
`,
  );

  readonly dayGridSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  dayGridSlot: TngSlotMap<TngDatepickerSlot> = {
    dayGrid: 'gap-1',
  };
}
`,
  );

  readonly dayCellSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ dayCell: 'hover:scale-110 transition-transform' }" />
</form>
`,
  );

  readonly dayCellSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  dayCellSlot: TngSlotMap<TngDatepickerSlot> = {
    dayCell: 'hover:scale-110 transition-transform',
  };
}
`,
  );

  readonly previewTextSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ previewText: 'text-blue-600 font-semibold' }" />
</form>
`,
  );

  readonly previewTextSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  previewTextSlot: TngSlotMap<TngDatepickerSlot> = {
    previewText: 'text-blue-600 font-semibold',
  };
}
`,
  );

  readonly actionBarSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ actionBar: 'bg-gray-100 p-2' }" />
</form>
`,
  );

  readonly actionBarSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  actionBarSlot: TngSlotMap<TngDatepickerSlot> = {
    actionBar: 'bg-gray-100 p-2',
  };
}
`,
  );

  readonly cancelSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ cancel: 'bg-red-100 hover:bg-red-200 text-red-800' }" />
</form>
`,
  );

  readonly cancelSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  cancelSlot: TngSlotMap<TngDatepickerSlot> = {
    cancel: 'bg-red-100 hover:bg-red-200 text-red-800',
  };
}
`,
  );

  readonly confirmSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ confirm: 'bg-green-600 hover:bg-green-700' }" />
</form>
`,
  );

  readonly confirmSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  confirmSlot: TngSlotMap<TngDatepickerSlot> = {
    confirm: 'bg-green-600 hover:bg-green-700',
  };
}
`,
  );

  readonly yearRailSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ yearRail: 'bg-blue-50 border-l-2 border-blue-300' }" />
</form>
`,
  );

  readonly yearRailSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  yearRailSlot: TngSlotMap<TngDatepickerSlot> = {
    yearRail: 'bg-blue-50 border-l-2 border-blue-300',
  };
}
`,
  );

  readonly yearNavPrevSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ yearNavPrev: 'bg-blue-200 hover:bg-blue-300' }" />
</form>
`,
  );

  readonly yearNavPrevSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  yearNavPrevSlot: TngSlotMap<TngDatepickerSlot> = {
    yearNavPrev: 'bg-blue-200 hover:bg-blue-300',
  };
}
`,
  );

  readonly yearListSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ yearList: 'gap-1' }" />
</form>
`,
  );

  readonly yearListSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  yearListSlot: TngSlotMap<TngDatepickerSlot> = {
    yearList: 'gap-1',
  };
}
`,
  );

  readonly yearItemSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ yearItem: 'hover:bg-blue-100 font-bold' }" />
</form>
`,
  );

  readonly yearItemSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  yearItemSlot: TngSlotMap<TngDatepickerSlot> = {
    yearItem: 'hover:bg-blue-100 font-bold',
  };
}
`,
  );

  readonly yearNavNextSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-datepicker formControlName="period"
    [slot]="{ yearNavNext: 'bg-blue-200 hover:bg-blue-300' }" />
</form>
`,
  );

  readonly yearNavNextSlotTs = computed(
    () => `
import { TngDatepicker, TngSlotMap, TngDatepickerSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  yearNavNextSlot: TngSlotMap<TngDatepickerSlot> = {
    yearNavNext: 'bg-blue-200 hover:bg-blue-300',
  };
}
`,
  );
}
