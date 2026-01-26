import { Routes } from '@angular/router';

export const navigationRoutes: Routes = [
  {
    path: 'navigation/menu',
    loadComponent: () =>
      import('../pages/components/navigation/menu/menu-docs.component').then((m) => m.MenuDocsComponent),
    data: { title: 'Menu – tailng', description: 'Menu component for navigation and actions.' },
  },
  {
    path: 'navigation/sidenav',
    loadComponent: () =>
      import('../pages/components/navigation/sidenav/sidenav-docs.component').then((m) => m.SidenavDocsComponent),
    data: { title: 'Sidenav – tailng', description: 'Sidenav component for app layouts.' },
  },
  {
    path: 'navigation/drawer',
    loadComponent: () =>
      import('../pages/components/navigation/drawer/drawer-docs.component').then((m) => m.DrawerDocsComponent),
    data: { title: 'Drawer – tailng', description: 'Drawer component for overlays and navigation.' },
  },
  {
    path: 'navigation/stepper',
    loadComponent: () =>
      import('../pages/components/navigation/stepper/stepper-docs.component').then((m) => m.StepperDocsComponent),
    data: { title: 'Stepper – tailng', description: 'Stepper component for multi-step flows.' },
  },
  {
    path: 'navigation/paginator',
    loadComponent: () =>
      import('../pages/components/navigation/paginator/paginator-docs.component').then(
        (m) => m.PaginatorDocsComponent,
      ),
    data: { title: 'Paginator – tailng', description: 'Paginator component for lists and tables.' },
  },
  {
    path: 'navigation/breadcrumbs',
    loadComponent: () =>
      import('../pages/components/navigation/breadcrumbs/breadcrumbs-docs.component').then(
        (m) => m.BreadcrumbsDocsComponent,
      ),
    data: { title: 'Breadcrumbs – tailng', description: 'Breadcrumbs for hierarchical navigation.' },
  },
];
