import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'playground-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  categories = [
    {
      name: 'Form Controls',
      components: [
        { name: 'Autocomplete', route: '/form-controls/autocomplete', status:'backlog' },
        { name: 'Checkbox', route: '/form-controls/checkbox', status:'backlog' },
        { name: 'Chips', route: '/form-controls/chips', status:'backlog' },
        { name: 'Datepicker', route: '/form-controls/datepicker', status:'backlog' },
        { name: 'Form Field', route: '/form-controls/form-field', status:'backlog' },
        { name: 'Input', route: '/form-controls/input', status:'in-progress' },
        { name: 'Radio Button', route: '/form-controls/radio-button', status:'backlog' },
        { name: 'Select', route: '/form-controls/select', status:'backlog' },
        { name: 'Slider', route: '/form-controls/slider', status:'backlog' },
        { name: 'Slide Toggle', route: '/form-controls/slide-toggle', status:'backlog' },
        { name: 'Timepicker', route: '/form-controls/timepicker', status:'backlog' },
      ],
    },
    {
      name: 'Buttons & Indicators',
      components: [
        { name: 'Button', route: '/buttons-indicators/button', status:'in-progress' },
        { name: 'Button Toggle', route: '/buttons-indicators/button-toggle', status:'backlog' },
        { name: 'Badge', route: '/buttons-indicators/badge', status:'backlog' },
        { name: 'Icon', route: '/buttons-indicators/icon', status:'backlog' },
        { name: 'Ripples', route: '/buttons-indicators/ripples', status:'backlog' },
        { name: 'Progress Bar', route: '/buttons-indicators/progress-bar', status:'backlog' },
        { name: 'Progress Spinner', route: '/buttons-indicators/progress-spinner', status:'backlog' },
      ],
    },
    {
      name: 'Layout',
      components: [
        { name: 'Card', route: '/layout/card', status:'in-progress' },
        { name: 'Divider', route: '/layout/divider', status:'backlog' },
        { name: 'Expansion Panel', route: '/layout/expansion-panel', status:'backlog' },
        { name: 'Grid List', route: '/layout/grid-list', status:'backlog' },
        { name: 'List', route: '/layout/list', status:'backlog' },
        { name: 'Tabs', route: '/layout/tabs', status:'backlog' },
        { name: 'Toolbar', route: '/layout/toolbar', status:'backlog' },
      ],
    },
    {
      name: 'Navigation',
      components: [
        { name: 'Menu', route: '/navigation/menu', status:'backlog' },
        { name: 'Sidenav', route: '/navigation/sidenav', status:'backlog' },
        { name: 'Stepper', route: '/navigation/stepper', status:'backlog'  },
        { name: 'Paginator', route: '/navigation/paginator', status:'backlog' },
      ],
    },
    {
      name: 'Popups & Overlays',
      components: [
        { name: 'Dialog', route: '/popups-overlays/dialog', status:'backlog' },
        { name: 'Bottom Sheet', route: '/popups-overlays/bottom-sheet', status:'backlog' },
        { name: 'Snackbar', route: '/popups-overlays/snackbar', status:'backlog' },
        { name: 'Tooltip', route: '/popups-overlays/tooltip', status:'backlog' },
      ],
    },
    {
      name: 'Data Table & Structure',
      components: [
        { name: 'Table', route: '/data-table-structure/table', status:'backlog' },
        { name: 'Sort Header', route: '/data-table-structure/sort-header', status:'backlog' },
        { name: 'Tree', route: '/data-table-structure/tree', status:'backlog' },
      ],
    },
  ];
}

