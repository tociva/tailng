import { Routes } from '@angular/router';
import { componentsRoutes } from './routes/components.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/app-shell/app-shell.component').then((m) => m.AppShellComponent),
    children: [
      // Home (/) – no sidebar
      {
        path: '',
        loadComponent: () =>
          import('./pages/project/home/home.component').then((m) => m.HomeComponent),
        data: {
          title: 'tailng — Scalability of Angular. Simplicity of Tailwind.',
          description:
            'tailng is an open-source Angular component library built with Tailwind CSS.',
        },
      },
      // Theme (/theme)
      {
        path: 'theme',
        loadComponent: () =>
          import('./pages/theme/theme.component').then((m) => m.ThemeComponent),
        data: {
          title: 'Theme – tailng',
          description: 'Customize colors, tokens, and appearance for tailng.',
        },
      },
      // Components (/components) – sidebar + content via docs-shell
      ...componentsRoutes,
    ],
  },
  { path: '**', redirectTo: '' },
];
