import { Component, computed, input } from '@angular/core';
import { TngFocusTrap } from '@tailng-ui/cdk/a11y';

import { TngSlotMap, TngSlotValue } from '../core/slot.types';
import { TngOverlayPanelSlot } from './overlay-panel.slots';

@Component({
  selector: 'tng-overlay-panel',
  standalone: true,
  imports: [TngFocusTrap],
  templateUrl: './overlay-panel.component.html',
})
export class TngOverlayPanel {
  /**
   * When true, treat panel as modal surface:
   * - trap focus
   * - restore focus on destroy
   * - aria-modal="true"
   */
  readonly modal = input<boolean>(false);

  /** a11y */
  readonly role = input<'dialog' | 'menu' | 'listbox' | 'region' | 'presentation'>('presentation');
  readonly ariaLabel = input<string>('');
  readonly ariaLabelledby = input<string>('');
  readonly ariaDescribedby = input<string>('');

  /** Focus trap options (only meaningful when modal=true) */
  readonly restoreFocus = input<boolean>(true);
  readonly autoCapture = input<boolean>(true);
  readonly deferCaptureElements = input<boolean>(false);

  /* ─────────────────────────
   * Slot hooks (micro styling)
   * ───────────────────────── */
  slot = input<TngSlotMap<TngOverlayPanelSlot>>({});

  /* ─────────────────────────
   * Slot finals (defaults + overrides)
   * ───────────────────────── */
  readonly panelClassFinal = computed(() =>
    this.cx(
      'bg-bg text-fg border border-border rounded-md shadow-lg max-h-60 overflow-auto outline-none',
      this.slotClass('panel'),
    ),
  );

  /** For ARIA: only true when modal */
  readonly ariaModal = computed(() => (this.modal() ? 'true' : null));

  /* ─────────────────────────
   * Helpers
   * ───────────────────────── */
  private slotClass(key: TngOverlayPanelSlot): TngSlotValue {
    return this.slot()?.[key];
  }

  private cx(...parts: Array<TngSlotValue>): string {
    return parts
      .flatMap((p) => (Array.isArray(p) ? p : [p]))
      .map((p) => (p ?? '').toString().trim())
      .filter(Boolean)
      .join(' ');
  }
}
