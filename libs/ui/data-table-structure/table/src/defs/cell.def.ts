import { Directive, TemplateRef } from '@angular/core';
import { TngCellContext } from '../core/table.types';

@Directive({
  selector: 'ng-template[tngCell]',
  standalone: true,
})
export class TngCellDefDirective<T = unknown> {
  constructor(public readonly tpl: TemplateRef<TngCellContext<T>>) {}
}
