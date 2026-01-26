import { Routes } from '@angular/router';

export const utilitiesRoutes: Routes = [
  {
    path: 'utilities/code-block',
    loadComponent: () =>
      import('../pages/components/utilities/code-block/code-block-docs.component').then(
        (m) => m.CodeBlockDocsComponent,
      ),
    data: { title: 'Code Block – tailng', description: 'Code block component with syntax highlighting support.' },
  },
  {
    path: 'utilities/copy-button',
    loadComponent: () =>
      import('../pages/components/utilities/copy-button/copy-button-docs.component').then(
        (m) => m.CopyButtonDocsComponent,
      ),
    data: { title: 'Copy Button – tailng', description: 'Copy-to-clipboard button component.' },
  },
];
