import { Directive, TemplateRef } from '@angular/core';
import { TngHeaderContext } from './table.types';

@Directive({
  selector: 'ng-template[tngHeader]',
  standalone: true,
})
export class TngHeaderDefDirective {
  constructor(public readonly tpl: TemplateRef<TngHeaderContext>) {}
}
