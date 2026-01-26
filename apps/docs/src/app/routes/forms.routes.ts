import { Routes } from '@angular/router';

export const formsRoutes: Routes = [
  {
    path: 'forms/autocomplete',
    loadComponent: () =>
      import('../pages/components/forms/autocomplete/autocomplete-docs.component').then(
        (m) => m.AutocompleteDocsComponent,
      ),
    data: { title: 'Autocomplete – tailng', description: 'Autocomplete form control for tailng.' },
  },
  {
    path: 'forms/checkbox',
    loadComponent: () =>
      import('../pages/components/forms/checkbox/checkbox-docs.component').then(
        (m) => m.CheckboxDocsComponent,
      ),
    data: { title: 'Checkbox – tailng', description: 'Checkbox form control for tailng.' },
  },
  {
    path: 'forms/chips',
    loadComponent: () =>
      import('../pages/components/forms/chips/chips-docs.component').then((m) => m.ChipsDocsComponent),
    data: { title: 'Chips – tailng', description: 'Chips input for tailng.' },
  },
  {
    path: 'forms/datepicker',
    loadComponent: () =>
      import('../pages/components/forms/datepicker/datepicker-docs.component').then(
        (m) => m.DatepickerDocsComponent,
      ),
    data: { title: 'Datepicker – tailng', description: 'Datepicker component for tailng.' },
  },
  {
    path: 'forms/timepicker',
    loadComponent: () =>
      import('../pages/components/forms/timepicker/timepicker-docs.component').then(
        (m) => m.TimepickerDocsComponent,
      ),
    data: { title: 'Timepicker – tailng', description: 'Timepicker component for tailng.' },
  },
  {
    path: 'forms/form-field',
    loadComponent: () =>
      import('../pages/components/forms/form-field/form-field-docs.component').then(
        (m) => m.FormFieldDocsComponent,
      ),
    data: {
      title: 'Form Field – tailng',
      description: 'Form field wrapper: label, hint, errors, prefix/suffix.',
    },
  },
  {
    path: 'forms/text-input',
    loadComponent: () =>
      import('../pages/components/forms/text-input/text-input-docs.component').then(
        (m) => m.TextInputDocsComponent,
      ),
    data: { title: 'Text Input – tailng', description: 'Text input control for tailng.' },
  },
  {
    path: 'forms/number-input',
    loadComponent: () =>
      import('../pages/components/forms/number-input/number-input-docs.component').then(
        (m) => m.NumberInputDocsComponent,
      ),
    data: { title: 'Number Input – tailng', description: 'Number input control for tailng.' },
  },
  {
    path: 'forms/textarea',
    loadComponent: () =>
      import('../pages/components/forms/textarea/textarea-docs.component').then(
        (m) => m.TextareaDocsComponent,
      ),
    data: { title: 'Textarea – tailng', description: 'Textarea control for tailng.' },
  },
  {
    path: 'forms/file-upload',
    loadComponent: () =>
      import('../pages/components/forms/file-upload/file-upload-docs.component').then(
        (m) => m.FileUploadDocsComponent,
      ),
    data: { title: 'File Upload – tailng', description: 'File upload control for tailng.' },
  },
  {
    path: 'forms/radio-button',
    loadComponent: () =>
      import('../pages/components/forms/radio-button/radio-button-docs.component').then(
        (m) => m.RadioButtonDocsComponent,
      ),
    data: { title: 'Radio Button – tailng', description: 'Radio button control for tailng.' },
  },
  {
    path: 'forms/select',
    loadComponent: () =>
      import('../pages/components/forms/select/select-docs.component').then((m) => m.SelectDocsComponent),
    data: { title: 'Select – tailng', description: 'Select control for tailng.' },
  },
  {
    path: 'forms/slider',
    loadComponent: () =>
      import('../pages/components/forms/slider/slider-docs.component').then((m) => m.SliderDocsComponent),
    data: { title: 'Slider – tailng', description: 'Slider control for tailng.' },
  },
  {
    path: 'forms/slide-toggle',
    loadComponent: () =>
      import('../pages/components/forms/slide-toggle/slide-toggle-docs.component').then(
        (m) => m.SlideToggleDocsComponent,
      ),
    data: { title: 'Slide Toggle – tailng', description: 'Slide toggle control for tailng.' },
  },
  // NOTE: category route is /buttons/button-toggle, keep it under /components/buttons/button-toggle
  {
    path: 'buttons/button-toggle',
    loadComponent: () =>
      import('../pages/components/forms/button-toggle/button-toggle-docs.component').then(
        (m) => m.ButtonToggleDocsComponent,
      ),
    data: { title: 'Button Toggle – tailng', description: 'Button toggle control for tailng.' },
  },
];
