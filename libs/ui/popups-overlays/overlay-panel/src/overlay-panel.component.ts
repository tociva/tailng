import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'tng-overlay-panel',
  standalone: true,
  templateUrl: './overlay-panel.component.html',
})
export class TailngOverlayPanelComponent {
  /** Consumer-provided class overrides / extensions */
  readonly klass = input<string>('');

  /** Base themed Tailwind classes */
  private readonly baseClasses =
    'bg-background text-text border border-border rounded-md shadow-lg max-h-60 overflow-auto outline-none';

  /** Final merged class string */
  readonly classes = computed(() =>
    `${this.baseClasses} ${this.klass()}`.trim()
  );
}
