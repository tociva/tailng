import { inject, Injectable } from '@angular/core';
import { createHighlighter, type Highlighter } from 'shiki';
import { DocsThemeService } from './docs-theme.service';

@Injectable({ providedIn: 'root' })
export class ShikiHighlighterService {
  private highlighter: Highlighter | null = null;
  private docsThemeService = inject(DocsThemeService);

  async init(): Promise<void> {
    if (this.highlighter) return;

    this.highlighter = await createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: ['bash', 'json', 'typescript', 'html', 'css', 'text'],
    });
  }

  toHtml(code: string, lang: string): string {
    if (!this.highlighter) {
      // fallback: no highlight yet
      return this.escapeHtml(code);
    }

    const theme = this.docsThemeService.isDark() ? 'github-dark' : 'github-light';

    return this.highlighter.codeToHtml(code, {
      lang,
      theme,
    });
  }

  private escapeHtml(s: string): string {
    return s
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }
}
