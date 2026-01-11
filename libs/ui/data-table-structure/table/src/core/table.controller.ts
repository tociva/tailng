import { TngTableSortFeature } from '../features/sort.feature';
import type { TngSort, TngSortDir } from '../core/table.types';

export class TngTableController {
  private readonly sortFeature = new TngTableSortFeature();

  // expose state (same API you already have)
  readonly sort = this.sortFeature.sort;

  toggleSort(active: string): void {
    this.sortFeature.toggleSort(active);
  }
  setSort(sort: TngSort): void {
    this.sortFeature.setSort(sort);
  }
  clearSort(): void {
    this.sortFeature.clearSort();
  }
  directionFor(colId: string): TngSortDir {
    return this.sortFeature.directionFor(colId);
  }
  isSorted(colId: string): boolean {
    return this.sortFeature.isSorted(colId);
  }

  // later:
  // private readonly filterFeature = new TngTableFilterFeature();
  // openFilter(), isFiltered(), etc...
}
