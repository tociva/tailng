import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { categories } from './home/home.component';
import {
  TailngMenuComponent,
  TailngMenuItemDirective,
  TailngMenuTemplateDirective,
  TailngSlideToggleComponent,
} from '@tociva/tailng-ui';
import { TailngTheme, ThemeService } from './shared/theme.service';

@Component({
  selector: 'playground-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TailngMenuComponent,
    TailngMenuItemDirective,
    TailngMenuTemplateDirective,
    TailngSlideToggleComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly themeService = inject(ThemeService);
  year = new Date().getFullYear();
  categories = categories;

  changeTheme(theme: TailngTheme): void {
    this.themeService.setTheme(theme);
  }

  onModeToggle(checked: boolean): void {
    this.themeService.setMode(checked ? 'dark' : 'light');
  }
}
