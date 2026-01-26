import { Component, ElementRef, computed, input, viewChild } from '@angular/core';

@Component({
  selector: 'tng-code-block',
  standalone: true,
  templateUrl: './code-block.component.html',
})
export class TailngCodeBlockComponent {
  // -------------------------
  // API (code-only)
  // -------------------------
  content = input<string | null>(null);
  showLineNumbers = input<boolean>(false);
  wrap = input<boolean>(false);

  // -------------------------
  // klass hooks (user overrides)
  // -------------------------
  rootKlass = input<string>('');
  bodyKlass = input<string>('');
  gutterKlass = input<string>('');
  preKlass = input<string>('');
  codeKlass = input<string>('');

  // -------------------------
  // Projection (fallback)
  // -------------------------
  private projectedEl = viewChild<ElementRef<HTMLElement>>('projected');

  // -------------------------
  // Derived
  // -------------------------
  readonly code = computed(() => {
    const c = this.content();
    if (c != null) return c;

    const el = this.projectedEl();
    return el?.nativeElement?.innerText ?? '';
  });

  readonly escapedCode = computed(() => this.escapeHtml(this.code()));

  readonly lines = computed(() => {
    const text = this.code();
    if (!text) return 0;
    return text.split(/\r\n|\r|\n/).length;
  });

  readonly lineNumbers = computed(() =>
    Array.from({ length: this.lines() }, (_, i) => i + 1),
  );

  // -------------------------
  // klass (defaults + user overrides)
  // -------------------------
  readonly rootKlassFinal = computed(() =>
    this.join(
      'relative rounded-lg border border-border bg-alternate-background text-text',
      this.rootKlass(),
    ),
  );

  readonly bodyKlassFinal = computed(() => this.join('relative', this.bodyKlass()));

  readonly gutterKlassFinal = computed(() =>
    this.join(
      'absolute inset-y-0 left-0 w-10 select-none border-r border-border bg-background px-2 py-4 text-right text-xs leading-6 text-text/60',
      this.gutterKlass(),
    ),
  );

  readonly preKlassFinal = computed(() =>
    this.join(
      'overflow-auto p-4 text-xs leading-6 text-text',
      this.showLineNumbers() ? 'pl-14' : '',
      this.wrap() ? 'whitespace-pre-wrap break-words' : 'whitespace-pre',
      this.preKlass(),
    ),
  );

  readonly codeKlassFinal = computed(() =>
    this.join('block', this.codeKlass()),
  );

  // -------------------------
  // Utils
  // -------------------------
  private join(...parts: Array<string | null | undefined>): string {
    return parts.map((p) => (p ?? '').trim()).filter(Boolean).join(' ');
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