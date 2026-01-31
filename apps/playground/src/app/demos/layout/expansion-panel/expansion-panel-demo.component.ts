  import { Component, signal } from '@angular/core';
import { TailngExpansionIconCloseDirective, TailngExpansionIconOpenDirective, TailngExpansionPanelComponent, TailngButtonComponent } from '@tociva/tailng-ui';

@Component({
  selector: 'playground-expansion-panel-demo',
  standalone: true,
  imports: [TailngExpansionPanelComponent, TailngExpansionIconOpenDirective, TailngExpansionIconCloseDirective,  TailngButtonComponent],
  templateUrl: './expansion-panel-demo.component.html',
})
export class ExpansionPanelDemoComponent {
  
  // Demo-only accordion behavior (single-open)
  readonly openId = signal<'basic' | 'themed' | 'disabled' | 'nopad' | null>('basic');

  toggle(id: 'basic' | 'themed' | 'disabled' | 'nopad'): void {
    this.openId.update(v => (v === id ? null : id));
  }
  readonly outsideOpen = signal(false);
  toggleOutsidePanel(): void {
    this.outsideOpen.set(!this.outsideOpen());
  }
}
