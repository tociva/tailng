import { AfterViewInit, Component, computed, inject, signal } from '@angular/core';
import { TngCodeBlock } from '@tailng-ui/ui/utilities';
import { TngTable, TngCol } from '@tailng-ui/ui/table';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ShikiHighlighterService } from '../../../../../shared/shiki-highlighter.service';
import { TngShikiAdapter } from '../../../../../shared/tng-shiki.adapter';

type DisplayDetails = {
  property: string;
  type: string;
  default?: string;
  description: string;
};

@Component({
  standalone: true,
  selector: 'docs-option-list-api',
  templateUrl: './option-list-api.component.html',
  imports: [TngCodeBlock, TngTable, TngCol, TngTag],
})
export class OptionListApiComponent implements AfterViewInit {
  private shiki = inject(ShikiHighlighterService);
  readonly highlighter = new TngShikiAdapter(this.shiki);

  readonly importExample = computed(() => `import { TngOptionList } from '@tailng-ui/ui/overlay';`);

  private readonly seed: DisplayDetails[] = [
    { property: 'items', type: 'T[]', default: '[]', description: 'Array of items to display' },
    { property: 'activeIndex', type: 'number', default: '-1', description: 'Controlled active/focused index' },
    { property: 'displayWith', type: '(item: T) => string', default: '(v) => String(v)', description: 'Function to format items for display' },
    { property: 'optionTemplate', type: 'TemplateRef<OptionTplContext<T>> | null', default: 'null', description: 'Custom template for option rendering' },
    { property: 'emptyText', type: 'string', default: "'No results'", description: 'Text shown when items array is empty' },
    { property: 'modal', type: 'boolean', default: 'false', description: 'When true, wraps in focus-trapped overlay panel' },
    { property: 'slot', type: 'TngSlotMap<TngOptionListSlot>', default: '{}', description: 'Slot-based micro styling for container, option, optionActive, optionInactive, empty, and overlayPanel' },
    { property: 'keyboard', type: 'boolean', default: 'true', description: 'Enable keyboard navigation' },
    { property: 'loop', type: 'boolean', default: 'true', description: 'Loop navigation (wrap around)' },
    { property: 'selectOnEnter', type: 'boolean', default: 'true', description: 'Select active option on Enter key' },
    { property: 'typeahead', type: 'boolean', default: 'true', description: 'Enable typeahead search' },
    { property: 'typeaheadMode', type: "'startsWith' | 'includes'", default: "'startsWith'", description: 'Typeahead matching mode' },
    { property: 'tabindex', type: 'number | null', default: '0', description: 'Tabindex for listbox container' },
    { property: 'ariaLabel', type: 'string', default: "''", description: 'ARIA label for listbox' },
    { property: 'ariaLabelledby', type: 'string', default: "''", description: 'ARIA labelledby for listbox' },
    { property: 'ariaDescribedby', type: 'string', default: "''", description: 'ARIA describedby for listbox' },
    { property: 'optionMouseDown', type: 'OutputEventEmitter<{ item: T; index: number }>', default: '—', description: 'Emits when option is clicked' },
    { property: 'optionHover', type: 'OutputEventEmitter<number>', default: '—', description: 'Emits index when mouse enters option' },
    { property: 'activeIndexChange', type: 'OutputEventEmitter<number>', default: '—', description: 'Emits when active index changes (controlled)' },
    { property: 'requestSelectActive', type: 'OutputEventEmitter<void>', default: '—', description: 'Emits when Enter is pressed (parent decides selection)' },
    { property: 'requestTypeaheadMatch', type: 'OutputEventEmitter<{ query: string; index: number }>', default: '—', description: 'Emits typeahead matches (optional)' },
  ];

  readonly basicRows = signal<DisplayDetails[]>(
    this.seed.filter((p) => ['items', 'activeIndex', 'displayWith', 'optionTemplate', 'emptyText'].includes(p.property)),
  );

  readonly behaviorRows = signal<DisplayDetails[]>(
    this.seed.filter((p) => ['modal', 'keyboard', 'loop', 'selectOnEnter', 'typeahead', 'typeaheadMode', 'tabindex'].includes(p.property)),
  );

  readonly stylingRows = signal<DisplayDetails[]>(
    this.seed.filter((p) => ['slot'].includes(p.property)),
  );

  readonly a11yRows = signal<DisplayDetails[]>(
    this.seed.filter((p) => ['ariaLabel', 'ariaLabelledby', 'ariaDescribedby'].includes(p.property)),
  );

  readonly outputRows = signal<DisplayDetails[]>(
    this.seed.filter((p) => ['optionMouseDown', 'optionHover', 'activeIndexChange', 'requestSelectActive', 'requestTypeaheadMatch'].includes(p.property)),
  );

  readonly property = (r: DisplayDetails) => r.property;
  readonly type = (r: DisplayDetails) => r.type;
  readonly default = (r: DisplayDetails) => r.default ?? '—';
  readonly description = (r: DisplayDetails) => r.description;

  ngAfterViewInit() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.scroll-link');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          const link = document.querySelector(`.scroll-link[href="#${id}"]`);
          if (entry.isIntersecting) {
            links.forEach((l) => l.classList.remove('text-blue-500', 'font-semibold'));
            link?.classList.add('text-blue-500', 'font-semibold');
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
  }
}
