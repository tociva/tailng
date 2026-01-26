import { Routes } from '@angular/router';

export const overlayRoutes: Routes = [
  {
    path: 'overlay/dialog',
    loadComponent: () =>
      import('../pages/components/overlay/dialog/dialog-docs.component').then((m) => m.DialogDocsComponent),
    data: { title: 'Dialog – tailng', description: 'Dialog component for modal interactions.' },
  },
  {
    path: 'overlay/snackbar',
    loadComponent: () =>
      import('../pages/components/overlay/snackbar/snackbar-docs.component').then((m) => m.SnackbarDocsComponent),
    data: { title: 'Snackbar – tailng', description: 'Snackbar notifications for tailng.' },
  },
  {
    path: 'overlay/tooltip',
    loadComponent: () =>
      import('../pages/components/overlay/tooltip/tooltip-docs.component').then((m) => m.TooltipDocsComponent),
    data: { title: 'Tooltip – tailng', description: 'Tooltip component for contextual hints.' },
  },
  {
    path: 'overlay/popover',
    loadComponent: () =>
      import('../pages/components/overlay/popover/popover-docs.component').then((m) => m.PopoverDocsComponent),
    data: { title: 'Popover – tailng', description: 'Popover component for anchored overlays.' },
  },
];
