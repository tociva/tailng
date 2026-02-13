import { Component, inject } from '@angular/core';
import {
  TngCodeBlock,
  TngCodeBlockCopiedSlot,
  TngCodeBlockCopySlot,
} from '@tailng-ui/ui/utilities';
import { ShikiHighlighterService } from '../../shared/shiki-highlighter.service';
import { TngShikiAdapter } from '../../shared/tng-shiki.adapter';
import { TngCard } from '@tailng-ui/ui/layout';
import { TngButtonToggle, TngButtonToggleOption } from '@tailng-ui/ui/form';
import { TngIcon } from '@tailng-ui/icons/icon';

@Component({
  standalone: true,
  selector: 'docs-theme',
  host: { class: 'block flex-1 min-h-0 overflow-auto' },
  templateUrl: './theme.component.html',
  imports: [
    TngCard,
    TngCodeBlock,
    TngCodeBlockCopySlot,
    TngCodeBlockCopiedSlot,
    TngButtonToggle,
    TngIcon,
  ],
})
export class ThemeComponent {
  private shiki = inject(ShikiHighlighterService);
  readonly highlighter = new TngShikiAdapter(this.shiki);

  installStatus: 'yarn' | 'npm' = 'yarn';

  titleOptions: TngButtonToggleOption<string>[] = [
    { value: 'yarn', label: 'Yarn' },
    { value: 'npm', label: 'npm' },
  ];

  get installTheme(): string {
    return this.installStatus === 'yarn' ? this.yarnInstallTheme : this.npmInstallTheme;
  }

  readonly yarnInstallTheme = `yarn add @tailng-ui/theme`;
  readonly npmInstallTheme = `npm i @tailng-ui/theme`;

  applyClasses = `<body class="mode-light theme-default">
  <app-root></app-root>
</body>`;

  appThemeCss = `/* src/theme/theme-mybrand.css
   Custom app theme for "MyBrand"
   Apply using: <body class="... theme-mybrand"> */

:where(html.theme-mybrand, .theme-mybrand) {
  /* Primary */
  --primary-color: #5b2dff;
  --primary-color-hover: #4a23d9;
  --on-primary-color: #ffffff;

  /* Danger */
  --danger-color: #e5484d;
  --danger-color-hover: #c93d42;
  --on-danger-color: #ffffff;

  /* Warning */
  --warning-color: #f7b955;
  --warning-color-hover: #e0a84b;
  --on-warning-color: #1a1a1a;

  /* Success */
  --success-color: #2fb344;
  --success-color-hover: #27963a;
  --on-success-color: #ffffff;

  /* Info */
  --info-color: #3b82f6;
  --info-color-hover: #2563eb;
  --on-info-color: #ffffff;
}`;

  appStylesCss = `/* src/styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* tailng tokens (ship defaults + modes + themes) */
@import "@tailng-ui/theme/tokens/index.css";

/* app theme override (your brand) */
@import "./theme/theme-mybrand.css";`;

  activateThemeHtml = `<body class="mode-light theme-mybrand">
  <app-root></app-root>
</body>

<!-- dark mode -->
<body class="mode-dark theme-mybrand">
  <app-root></app-root>
</body>`;

  usageGood = `<div class="bg-bg text-fg p-4">
  This adapts to mode changes automatically.
</div>

<tng-button variant="primary">
  Primary Button
</tng-button>`;

  usageBad = `<div class="bg-slate-900 text-white p-4">
  This will NOT adapt to light/dark modes correctly.
</div>`;
}