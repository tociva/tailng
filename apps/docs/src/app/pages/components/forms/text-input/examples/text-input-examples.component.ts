import { Component, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TngIcon } from '@tociva/tailng-icons/icon';
import {
  TngTextInput
} from '@tociva/tailng-ui/form-controls';
import { TngTag } from '@tociva/tailng-ui/buttons-indicators';

import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-text-input-examples',
  templateUrl: './text-input-examples.component.html',
  imports: [
     TngTextInput,
    TngIcon,
    ReactiveFormsModule,
    ExampleBlockComponent,
    TngExampleDemo,
    TngTag

  ],
})
export class TextInputExamplesComponent {

   // Form for reactive forms example
  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
    search: new FormControl('', { nonNullable: true }),
    username: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/),
      ],
    }),
    readonlyValue: new FormControl('This value cannot be edited', { nonNullable: true }),
    prefilledValue: new FormControl('Pre-filled value', { nonNullable: true }),
  });

  get emailCtrl() {
    return this.form.controls.email;
  }

  get passwordCtrl() {
    return this.form.controls.password;
  }

  get searchCtrl() {
    return this.form.controls.search;
  }

  // Convert form control valueChanges to a signal
  private readonly searchValue = toSignal(this.searchCtrl.valueChanges, {
    initialValue: this.searchCtrl.value,
  });

  // Check if search has value to show/hide clear icon
  readonly hasSearchValue = computed(() => (this.searchValue()?.length ?? 0) > 0);

  // Clear search input
  clearSearch(): void {
    this.searchCtrl.setValue('');
  }

  // Code examples
  readonly basicExampleHtml = computed(
    () => `
  <form [formGroup]="form">
    <tng-text-input
      formControlName=username
      placeholder="Enter Username"
    />
  </form>
`,
  );

  readonly basicExampleTs = computed(
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

  readonly reactiveFormsExampleHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-text-input
    formControlName="email"
    placeholder="Enter email"
    type="email"
  />
  <tng-text-input
    formControlName="password"
    placeholder="Enter password"
    type="password"
  />
  <tng-text-input
    formControlName="search"
    placeholder="Search..."
    type="search"
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

  readonly reactiveFormsExampleTs = computed(
    () => `
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { computed } from '@angular/core';
import { TailngTextInputComponent,TailngIconComponent } from '@tociva/tailng-ui';

@Component({
 selector: 'text-input-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TailngTextInputComponent,TailngIconComponent],
  templateUrl: './text-input.component.html',
})
export class MyComponent {
  form = new FormGroup({
    email: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true })
    search: new FormControl('', { nonNullable: true }),
  });
}
`
  );

  readonly prefixSuffixExampleHtml = computed(
    () => `
<form [formGroup]="form">    
<tng-text-input placeholder="Search...">
  <tng-icon
    tngPrefix
    name="bootstrapSearch"
    class="ml-3 text-muted"
  />
</tng-text-input>
  <tng-text-input placeholder="Enter email">
    <tng-icon
      tngSuffix
      name="bootstrapCheck"
      class="mr-3 text-green-600"
    />
  </tng-text-input>
  <tng-text-input placeholder="Search users...">
    <tng-icon
      tngPrefix
      name="bootstrapSearch"
      class="ml-3 text-muted"
    />
    <tng-icon
      tngSuffix
      name="bootstrapX"
      class="mr-3 text-red-500 cursor-pointer"
    />
  </tng-text-input>
</form>
`,
  );

  readonly prefixSuffixExampleTs = computed(
    () => `
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { computed } from '@angular/core';
import { TailngTextInputComponent,TailngIconComponent } from '@tociva/tailng-ui';

@Component({
 selector: 'text-input-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TailngTextInputComponent,TailngIconComponent],
  templateUrl: './text-input.component.html',
})
export class MyComponent {
  form = new FormGroup({
    email: new FormControl('', { nonNullable: true }),
    search: new FormControl('', { nonNullable: true }),
  });
}
`
  );

  readonly inputTypesExampleHtml = computed(
    () => `
<form [formGroup]="form">  
  <tng-text-input
    formControlName="name"
    placeholder="Enter name"
    type="text"
  />
  <!-- Email input -->
  <tng-text-input
  formControlName="email"
    placeholder="Enter email"
    type="email"
  />
  <!-- Password input -->
  <tng-text-input
  formControlName="password"
    placeholder="Enter password"
    type="password"
  />
  <!-- Search input -->
  <tng-text-input
  formControlName="search"
    placeholder="Search..."
    type="search"
  />
  <!-- URL input -->
  <tng-text-input
  formControlName="url"
    placeholder="Enter URL"
    type="url"
  />
  <!-- Tel input -->
  <tng-text-input
  formControlName="tel"
    placeholder="Enter phone number"
    type="tel"
  />
</form>
`,
  );
  readonly inputTypesExampleTs = computed(
    () => `
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { computed } from '@angular/core';
import { TailngTextInputComponent } from '@tociva/tailng-ui';

@Component({
 selector: 'text-input-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TailngTextInputComponent],
  templateUrl: './text-input.component.html',
})
export class MyComponent {
  form = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
    search: new FormControl('', { nonNullable: true }),
    url: new FormControl('', { nonNullable: true }),
    tel: new FormControl('', { nonNullable: true }),
  });
}
`
  );
  readonly statesExample = computed(
    () => `
<form [formGroup]="form">  
  <tng-text-input
    placeholder="Disabled input"
    [disabled]="true"
  />
  <!-- Readonly state with form control -->
  <tng-text-input
    formControlName="readonlyValue"
    placeholder="Readonly input"
    [readonly]="true"
  />

  <!-- Pre-filled value with form control -->
  <tng-text-input
    formControlName="prefilledValue"
    placeholder="Enter text"
  />

  <!-- Or using ngModel for template-driven forms -->
  <tng-text-input
    [(ngModel)]="myValue"
    placeholder="Enter text"
  />
</form>
`,
  );

  readonly validationExample = computed(
    () => `import { Validators } from '@angular/forms';

form = new FormGroup({
  username: new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9_]+$/),
    ],
  }),
});

<tng-text-input
  formControlName="username"
  placeholder="Username"
  [minlength]="3"
  [maxlength]="20"
  pattern="^[a-zA-Z0-9_]+$"
/>

@if (usernameCtrl.touched && usernameCtrl.invalid) {
  <div class="text-sm text-red-600 mt-1">
    @if (usernameCtrl.hasError('required')) {
      Username is required
    } @else if (usernameCtrl.hasError('minlength')) {
      Username must be at least 3 characters
    } @else if (usernameCtrl.hasError('maxlength')) {
      Username must be no more than 20 characters
    } @else if (usernameCtrl.hasError('pattern')) {
      Username can only contain letters, numbers, and underscores
    }
  </div>
}
`,
  );

  readonly customStylingExample = computed(
    () => `
<form [formGroup]="form">  
  <tng-text-input
    placeholder="Custom styled input"
    rootKlass="border-2 border-purple-500 rounded-xl shadow-lg"
    inputKlass="text-purple-700 placeholder:text-purple-300"
    >
    <tng-icon
      tngPrefix
      name="bootstrapSearch"
      class="ml-3 text-purple-600"
    />
  </tng-text-input>
</form>
`,
  );
}

