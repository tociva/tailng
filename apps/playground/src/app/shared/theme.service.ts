import { Injectable, computed, effect, signal } from '@angular/core';

export type TailngTheme = 'default' | 'slate' | 'indigo' | 'emerald' | 'rose';
export type TailngMode = 'light' | 'dark';

export type ThemeOption = Readonly<{ id: TailngTheme; label: string }>;
export type ModeOption = Readonly<{ id: TailngMode; label: string }>;

const THEME_LIST = [
  { id: 'default', label: 'Default' },
  { id: 'slate', label: 'Slate' },
  { id: 'indigo', label: 'Indigo' },
  { id: 'emerald', label: 'Emerald' },
  { id: 'rose', label: 'Rose' },
] as const satisfies ReadonlyArray<ThemeOption>;

const MODE_LIST = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
] as const satisfies ReadonlyArray<ModeOption>;

const THEME_CLASSES = THEME_LIST.map(x => `theme-${x.id}`) as ReadonlyArray<string>;
const MODE_CLASSES = MODE_LIST.map(x => `mode-${x.id}`) as ReadonlyArray<string>;

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly themeList = THEME_LIST;
  readonly modeList = MODE_LIST;

  readonly theme = signal<TailngTheme>('default');
  readonly mode = signal<TailngMode>('light');

  readonly isDark = computed(() => this.mode() === 'dark');
  readonly themeLabel = computed(() => THEME_LIST.find(x => x.id === this.theme())?.label ?? 'Default');
  readonly modeLabel = computed(() => (this.isDark() ? 'Dark' : 'Light'));

  constructor() {
    effect(() => {
      const html = document.documentElement;
      html.classList.remove(...THEME_CLASSES, ...MODE_CLASSES);
      html.classList.add(`theme-${this.theme()}`, `mode-${this.mode()}`);
    });
  }

  setTheme(theme: TailngTheme) {
    this.theme.set(theme);
  }

  setMode(mode: TailngMode) {
    this.mode.set(mode);
  }

  toggleMode() {
    this.mode.set(this.isDark() ? 'light' : 'dark');
  }
}