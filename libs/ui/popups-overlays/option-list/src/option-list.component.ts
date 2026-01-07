import { Component, computed, ElementRef, input, output, ViewChild } from '@angular/core';

@Component({
  selector: 'tng-option-list',
  standalone: true,
  templateUrl: './option-list.component.html',
})
export class TailngOptionListComponent<T> {
  @ViewChild('listbox', { static: true })
  listbox!: ElementRef<HTMLElement>;

  // data
  readonly items = input<T[]>([]);
  readonly activeIndex = input<number>(-1);

  // how to display an item
  readonly displayWith = input<(item: T) => string>((v) => String(v));

  // texts
  readonly emptyText = input<string>('No results');

  // theming hooks (section-wise)
  readonly containerKlass = input<string>('py-1 overflow-auto max-h-60');

  readonly optionKlass = input<string>(
    'px-3 py-2 text-sm cursor-pointer select-none'
  );

  // state classes (theme-driven defaults)
  readonly optionActiveKlass = input<string>('bg-primary text-on-primary');
  readonly optionInactiveKlass = input<string>('bg-background text-text');

  readonly emptyKlass = input<string>('px-3 py-2 text-sm text-disable');

  // events
  readonly optionMouseDown = output<{ item: T; index: number }>();
  readonly optionHover = output<number>();

  readonly hasItems = computed(() => this.items().length > 0);

  display(item: T) {
    return this.displayWith()(item);
  }

  onMouseDown(item: T, index: number, ev: MouseEvent) {
    // Important: mousedown beats input blur
    ev.preventDefault();
    this.optionMouseDown.emit({ item, index });
  }

  onMouseEnter(index: number) {
    this.optionHover.emit(index);
  }

  isActive(i: number) {
    return i === this.activeIndex();
  }

  optionClasses(i: number) {
    // keep this string-only for [class]="..."
    const state = this.isActive(i) ? this.optionActiveKlass() : this.optionInactiveKlass();
    return `${this.optionKlass()} ${state}`.trim();
  }

  getContainer(): HTMLElement {
    return this.listbox.nativeElement;
  }
}
