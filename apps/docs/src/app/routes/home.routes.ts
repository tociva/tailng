import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../layout/project-shell/project-shell.component').then((m) => m.ProjectShellComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('../pages/project/home/home.component').then((m) => m.HomeComponent),
        data: {
          title: 'tailng — Scalability of Angular. Simplicity of Tailwind.',
          description: 'tailng is an open-source Angular component library built with Tailwind CSS.',
        },
      },
    ],
  },
];
