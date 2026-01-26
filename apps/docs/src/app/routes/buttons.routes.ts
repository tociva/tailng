import { Routes } from '@angular/router';

export const buttonsRoutes: Routes = [
  {
    path: 'buttons/button',
    loadComponent: () =>
      import('../pages/components/buttons/button/button-docs.component').then((m) => m.ButtonDocsComponent),
    data: { title: 'Button – tailng', description: 'Button component: variants, sizes, loading, icons.' },
  },
  {
    path: 'buttons/badge',
    loadComponent: () =>
      import('../pages/components/buttons/badge/badge-docs.component').then((m) => m.BadgeDocsComponent),
    data: { title: 'Badge – tailng', description: 'Badge component for tailng.' },
  },
  {
    path: 'buttons/icon',
    loadComponent: () =>
      import('../pages/components/buttons/icon/icon-docs.component').then((m) => m.IconDocsComponent),
    data: { title: 'Icon – tailng', description: 'Icon component for tailng.' },
  },
  {
    path: 'buttons/ripples',
    loadComponent: () =>
      import('../pages/components/buttons/ripples/ripples-docs.component').then((m) => m.RipplesDocsComponent),
    data: { title: 'Ripples – tailng', description: 'Ripple effect for tailng components.' },
  },
  {
    path: 'buttons/progress-bar',
    loadComponent: () =>
      import('../pages/components/buttons/progress-bar/progress-bar-docs.component').then(
        (m) => m.ProgressBarDocsComponent,
      ),
    data: { title: 'Progress Bar – tailng', description: 'Progress bar indicator for tailng.' },
  },
  {
    path: 'buttons/progress-spinner',
    loadComponent: () =>
      import('../pages/components/buttons/progress-spinner/progress-spinner-docs.component').then(
        (m) => m.ProgressSpinnerDocsComponent,
      ),
    data: { title: 'Progress Spinner – tailng', description: 'Progress spinner indicator for tailng.' },
  },
  {
    path: 'buttons/skeleton',
    loadComponent: () =>
      import('../pages/components/buttons/skeleton/skeleton-docs.component').then((m) => m.SkeletonDocsComponent),
    data: { title: 'Skeleton – tailng', description: 'Skeleton loading placeholder for tailng.' },
  },
];
