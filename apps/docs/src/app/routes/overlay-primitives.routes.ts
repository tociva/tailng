import { Routes } from '@angular/router';

export const overlayPrimitivesRoutes: Routes = [
  {
    path: 'overlay-primitives/connected-overlay',
    loadComponent: () =>
      import('../pages/components/overlay-primitives/connected-overlay/connected-overlay-docs.component').then(
        (m) => m.ConnectedOverlayDocsComponent,
      ),
    data: {
      title: 'Connected Overlay – tailng',
      description: 'Internal overlay primitive used by overlay components.',
    },
  },
  {
    path: 'overlay-primitives/option-list',
    loadComponent: () =>
      import('../pages/components/overlay-primitives/option-list/option-list-docs.component').then(
        (m) => m.OptionListDocsComponent,
      ),
    data: {
      title: 'Option List – tailng',
      description: 'Internal option list primitive used by selection components.',
    },
  },
];
