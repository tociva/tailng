import { Routes } from '@angular/router';
import { homeRoutes } from './routes/home.routes';
import { installationRoutes } from './routes/installation.routes';
import { componentsRoutes } from './routes/components.routes';

export const routes: Routes = [
  ...homeRoutes,
  ...installationRoutes,
  ...componentsRoutes,
  { path: '**', redirectTo: '' },
];
