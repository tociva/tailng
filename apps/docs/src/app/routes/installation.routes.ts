import { Routes } from '@angular/router';

export const installationRoutes: Routes = [
  {
    path: 'installation',
    loadComponent: () =>
      import('../layout/docs-shell/docs-shell.component').then((m) => m.DocsShellComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../pages/installation/installation/installation.component').then((m) => m.InstallationComponent),
        data: { title: 'Installation – tailng', description: 'Install tailng and get started quickly.' },
      },
      {
        path: 'tailwind-setup',
        loadComponent: () =>
          import('../pages/installation/tailwind-setup/tailwind-setup.component').then((m) => m.TailwindSetupComponent),
        data: { title: 'Tailwind Setup – tailng', description: 'Configure Tailwind for tailng.' },
      },
      {
        path: 'quick-start',
        loadComponent: () =>
          import('../pages/installation/quick-start/quick-start.component').then((m) => m.QuickStartComponent),
        data: { title: 'Quick Start – tailng', description: 'Use tailng components in minutes.' },
      },
    ],
  },
];
