import { Component, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TngCheckbox } from '@tailng-ui/ui/form';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-checkbox-examples',
  templateUrl: './checkbox-examples.component.html',
  imports: [
    TngCheckbox,
    ReactiveFormsModule,
    ExampleBlockComponent,
    TngExampleDemo,
    TngTag,
  ],
})
export class CheckboxExamplesComponent {
  form = new FormGroup({
    terms: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
    newsletter: new FormControl(false, { nonNullable: true }),
    notifications: new FormControl(true, { nonNullable: true }),
  });

  triStateForm = new FormGroup({
    mixedFirst: new FormControl<boolean | null>(null, { nonNullable: false }),
    uncheckedFirst: new FormControl<boolean | null>(false, { nonNullable: false }),
  });

  get termsCtrl() {
    return this.form.controls.terms;
  }

  get mixedFirstCtrl() {
    return this.triStateForm.controls.mixedFirst;
  }

  get uncheckedFirstCtrl() {
    return this.triStateForm.controls.uncheckedFirst;
  }

  readonly basicHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-checkbox formControlName="terms" label="I agree to the terms" />
  <tng-checkbox formControlName="newsletter" label="Subscribe to newsletter" />
</form>
`,
  );

  readonly basicTs = computed(
    () => `
form = new FormGroup({
  terms: new FormControl(false, { nonNullable: true }),
  newsletter: new FormControl(false, { nonNullable: true }),
});
`,
  );

  readonly validationHtml = computed(
    () => `
form = new FormGroup({
  terms: new FormControl(false, {
    nonNullable: true,
    validators: [Validators.requiredTrue],
  }),
});

<tng-checkbox formControlName="terms" label="I agree to the terms" [required]="true" />

@if (termsCtrl.touched && termsCtrl.invalid) {
  <p class="text-sm text-red-600">You must agree to the terms.</p>
}
`,
  );

  readonly statesHtml = computed(
    () => `
<tng-checkbox formControlName="newsletter" label="Subscribe" />
<tng-checkbox formControlName="notifications" label="Notifications" [disabled]="true" />
`,
  );

  readonly triStateHtml = computed(
    () => `
<form [formGroup]="triStateForm">
  <tng-checkbox
    formControlName="mixedFirst"
    label="Mixed-first cycle"
    [tristate]="true"
    cycle="mixed-first"
  />
  <p class="text-xs text-fg mt-1">
    Value: {{ mixedFirstCtrl.value }} (null → true → false → null)
  </p>

  <tng-checkbox
    formControlName="uncheckedFirst"
    label="Unchecked-first cycle"
    [tristate]="true"
    cycle="unchecked-first"
  />
  <p class="text-xs text-fg mt-1">
    Value: {{ uncheckedFirstCtrl.value }} (false → null → true → false)
  </p>
</form>
`,
  );

  readonly triStateTs = computed(
    () => `
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngCheckbox } from '@tailng-ui/ui/form';

export class MyComponent {
  triStateForm = new FormGroup({
    mixedFirst: new FormControl<boolean | null>(null, { nonNullable: false }),
    uncheckedFirst: new FormControl<boolean | null>(false, { nonNullable: false }),
  });
}
`,
  );
}
