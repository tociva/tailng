
import { signal } from '@angular/core';
import { TngTableSortFeature } from '../features/sort.feature';
import { TngTableFilterFeature } from '../features/filter.feature';
import type {
  TngSort,
  TngSortDir,
  TngFilterValue,
  TngFilters,
  TngColumnMeta,
} from './table.types';

export class TngTableController {
  private readonly sortFeature = new TngTableSortFeature();
  private readonly filterFeature = new TngTableFilterFeature();

  // -------------------- SORT --------------------
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

  // -------------------- FILTER --------------------
  readonly filters = this.filterFeature.filters;
  readonly openFilterColId = this.filterFeature.openFilterColId;
  readonly filterAnchorEl = this.filterFeature.anchorEl;

  openFilter(colId: string, anchorEl?: HTMLElement | null): void {
    this.filterFeature.openFilter(colId, anchorEl);
  }
  closeFilter(): void {
    this.filterFeature.closeFilter();
  }
  toggleFilter(colId: string, anchorEl?: HTMLElement | null): void {
    this.filterFeature.toggleFilter(colId, anchorEl);
  }
  isFilterOpenFor(colId: string): boolean {
    return this.filterFeature.isFilterOpenFor(colId);
  }

  setFilter(colId: string, value: TngFilterValue): void {
    this.filterFeature.setFilter(colId, value);
  }
  clearFilter(colId: string): void {
    this.filterFeature.clearFilter(colId);
  }
  clearAllFilters(): void {
    this.filterFeature.clearAllFilters();
  }

  filterValueFor(colId: string): TngFilterValue | undefined {
    return this.filterFeature.filterValueFor(colId);
  }
  isFiltered(colId: string): boolean {
    return this.filterFeature.isFiltered(colId);
  }

  setFilters(filters: TngFilters): void {
    this.filters.set(filters);
  }

  // -------------------- COLUMN META (for default filters) --------------------
  private readonly colMeta = signal<Record<string, TngColumnMeta>>({});

  registerColumn(meta: TngColumnMeta): void {
    this.colMeta.update((cur) => ({ ...cur, [meta.id]: meta }));
  }

  unregisterColumn(colId: string): void {
    this.colMeta.update((cur) => {
      if (!(colId in cur)) return cur;
      const next = { ...cur };
      delete next[colId];
      return next;
    });
  }

  metaFor(colId: string): TngColumnMeta | undefined {
    return this.colMeta()[colId];
  }
}
