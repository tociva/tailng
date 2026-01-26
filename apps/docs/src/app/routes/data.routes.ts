import { Routes } from '@angular/router';

export const dataRoutes: Routes = [
  {
    path: 'data/table',
    loadComponent: () =>
      import('../pages/components/data/table/table-docs.component').then((m) => m.TableDocsComponent),
    data: { title: 'Table – tailng', description: 'Basic data table component.' },
  },
  {
    path: 'data/sort-header',
    loadComponent: () =>
      import('../pages/components/data/sort-header/sort-header-docs.component').then(
        (m) => m.SortHeaderDocsComponent,
      ),
    data: { title: 'Sort Header – tailng', description: 'Sortable header for tables.' },
  },
  {
    path: 'data/filter-header',
    loadComponent: () =>
      import('../pages/components/data/filter-header/filter-header-docs.component').then(
        (m) => m.FilterHeaderDocsComponent,
      ),
    data: { title: 'Filter Header – tailng', description: 'Filter header for tables and lists.' },
  },
  {
    path: 'data/tree',
    loadComponent: () =>
      import('../pages/components/data/tree/tree-docs.component').then((m) => m.TreeDocsComponent),
    data: { title: 'Tree – tailng', description: 'Tree component for hierarchical data.' },
  },
  {
    path: 'data/virtual-scroll',
    loadComponent: () =>
      import('../pages/components/data/virtual-scroll/virtual-scroll-docs.component').then(
        (m) => m.VirtualScrollDocsComponent,
      ),
    data: { title: 'Virtual Scroll – tailng', description: 'Virtual scrolling for large lists.' },
  },
  {
    path: 'data/empty-state',
    loadComponent: () =>
      import('../pages/components/data/empty-state/empty-state-docs.component').then(
        (m) => m.EmptyStateDocsComponent,
      ),
    data: { title: 'Empty State – tailng', description: 'Empty state component for no-data situations.' },
  },
];
