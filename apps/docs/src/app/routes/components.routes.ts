import { Routes } from '@angular/router';
import { formsRoutes } from './forms.routes';
import { buttonsRoutes } from './buttons.routes';
import { layoutRoutes } from './layout.routes';
import { navigationRoutes } from './navigation.routes';
import { overlayRoutes } from './overlay.routes';
import { overlayPrimitivesRoutes } from './overlay-primitives.routes';
import { dataRoutes } from './data.routes';
import { utilitiesRoutes } from './utilities.routes';

export const componentsRoutes: Routes = [
  {
    path: 'components',
    loadComponent: () =>
      import('../layout/docs-shell/docs-shell.component').then((m) => m.DocsShellComponent),
    children: [
      // /components (intro + left menu)
      {
        path: '',
        loadComponent: () =>
          import('../pages/components/components-home/components-home.component').then(
            (m) => m.ComponentsHomeComponent,
          ),
        data: {
          title: 'Components – tailng',
          description: 'Browse tailng components, examples, and usage guidelines.',
        },
      },

      // Import all category routes
      ...formsRoutes,
      ...buttonsRoutes,
      ...layoutRoutes,
      ...navigationRoutes,
      ...overlayRoutes,
      ...overlayPrimitivesRoutes,
      ...dataRoutes,
      ...utilitiesRoutes,
    ],
  },
];
