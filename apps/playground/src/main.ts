import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { provideAppInitializer, inject } from '@angular/core';
import { bootstrapAlarm, bootstrapBell, bootstrapFunnel } from '@ng-icons/bootstrap-icons';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { ShikiHighlighterService } from './app/shared/shiki-highlighter.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideIcons({
      bootstrapAlarm,
      bootstrapBell,
      bootstrapFunnel,
    }),

    provideAppInitializer(() => {
      const shiki = inject(ShikiHighlighterService);
      return shiki.init(); // can return Promise<void>
    }),
  ],
}).catch((err) => console.error(err));