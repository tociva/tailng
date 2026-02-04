import { inject, provideAppInitializer } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import {
  bootstrapArrowLeft, bootstrapArrowRight,
  bootstrapCheck,
  bootstrapCode,
  bootstrapCodeSlash,
  bootstrapCopy,
  bootstrapGithub,
  bootstrapLink45deg,
  bootstrapList,
  bootstrapListUl,
  bootstrapMoonFill,
  bootstrapPalette,
  bootstrapSearch,
  bootstrapShare,
  bootstrapSunFill,
  bootstrapX
} from '@ng-icons/bootstrap-icons';
import { provideIcons } from '@ng-icons/core';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { ShikiHighlighterService } from './app/shared/shiki-highlighter.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideIcons({
      bootstrapList,
      bootstrapSearch,
      bootstrapGithub,
      bootstrapCheck,
      bootstrapX,
      bootstrapCodeSlash,
      bootstrapLink45deg,
      bootstrapShare,
      bootstrapCode,
      bootstrapCopy,
      bootstrapPalette,
      bootstrapListUl,
      bootstrapArrowLeft,
      bootstrapArrowRight,
      bootstrapMoonFill,
      bootstrapSunFill
    }),

    provideAppInitializer(() => {
      const shiki = inject(ShikiHighlighterService);
      return shiki.init(); // can return Promise<void>
    }),
  ],
}).catch((err) => console.error(err));
