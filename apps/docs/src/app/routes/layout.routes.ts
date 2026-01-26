import { Routes } from '@angular/router';

export const layoutRoutes: Routes = [
  {
    path: 'layout/card',
    loadComponent: () =>
      import('../pages/components/layout/card/card-docs.component').then((m) => m.CardDocsComponent),
    data: { title: 'Card – tailng', description: 'Card component for layouts.' },
  },
  {
    path: 'layout/divider',
    loadComponent: () =>
      import('../pages/components/layout/divider/divider-docs.component').then((m) => m.DividerDocsComponent),
    data: { title: 'Divider – tailng', description: 'Divider component for layouts.' },
  },
  {
    path: 'layout/expansion-panel',
    loadComponent: () =>
      import('../pages/components/layout/expansion-panel/expansion-panel-docs.component').then(
        (m) => m.ExpansionPanelDocsComponent,
      ),
    data: { title: 'Expansion Panel – tailng', description: 'Expansion panel component.' },
  },
  {
    path: 'layout/tabs',
    loadComponent: () =>
      import('../pages/components/layout/tabs/tabs-docs.component').then((m) => m.TabsDocsComponent),
    data: { title: 'Tabs – tailng', description: 'Tabs component for switching views.' },
  },
  {
    path: 'layout/accordion',
    loadComponent: () =>
      import('../pages/components/layout/accordion/accordion-docs.component').then(
        (m) => m.AccordionDocsComponent,
      ),
    data: { title: 'Accordion – tailng', description: 'Accordion component for collapsible content.' },
  },
];
