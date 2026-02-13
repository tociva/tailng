import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { TngConnectedOverlay, TngOverlayPanel, TngSlotMap, TngOverlayPanelSlot } from '@tailng-ui/ui/overlay';

@Component({
  selector: 'playground-connected-overlay-demo',
  standalone: true,
  imports: [TngConnectedOverlay, TngOverlayPanel],
  templateUrl: './connected-overlay-demo.component.html',
})
export class ConnectedOverlayDemoComponent {
  @ViewChild('anchorBtn', { static: true })
  anchorBtn!: ElementRef<HTMLElement>;

  open = signal(false);

  /* ─────────────────────────
   * Demo: slot overrides (keep in TS)
   * ───────────────────────── */
  readonly customSlot: TngSlotMap<TngOverlayPanelSlot> = {
    panel: 'border-2 border-blue-500 bg-blue-50',
  };

  toggle() {
    this.open.update(v => !v);
  }

  close() {
    this.open.set(false);
  }
}
