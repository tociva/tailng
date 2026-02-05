import { Component, computed, contentChild, input } from '@angular/core';
import { TngCardFooter, TngCardHeader } from './card-slots.directive';

@Component({
  selector: 'tng-card',
  standalone: true,
  templateUrl: './card.component.html',
})
export class TngCard {
  /* =====================
   * Klass hooks
   * ===================== */
  rootKlass = input<string>('');
  headerKlass = input<string>('');
  contentKlass = input<string>('');
  footerKlass = input<string>('');

  private headerMarker = contentChild(TngCardHeader);
  private footerMarker = contentChild(TngCardFooter);

  readonly hasHeader = computed(() => !!this.headerMarker());
  readonly hasFooter = computed(() => !!this.footerMarker());

  /* -------------------------
   * KlassFinal: defaults + overrides via join()
   * ------------------------- */
  private join(...parts: Array<string | null | undefined>): string {
    return parts.map((p) => (p ?? '').trim()).filter(Boolean).join(' ');
  }

  private static readonly defaultRootKlass =
    'block rounded-lg border border-border bg-bg text-fg shadow-sm';
  private static readonly defaultHeaderKlass = 'border-b border-border px-4 py-3';
  private static readonly defaultContentKlass = 'px-4 py-4';
  private static readonly defaultFooterKlass = 'border-t border-border px-4 py-3';

  readonly rootKlassFinal = computed(() =>
    this.join(TngCard.defaultRootKlass, this.rootKlass())
  );
  readonly headerKlassFinal = computed(() =>
    this.join(TngCard.defaultHeaderKlass, this.headerKlass())
  );
  readonly contentKlassFinal = computed(() =>
    this.join(TngCard.defaultContentKlass, this.contentKlass())
  );
  readonly footerKlassFinal = computed(() =>
    this.join(TngCard.defaultFooterKlass, this.footerKlass())
  );
}
