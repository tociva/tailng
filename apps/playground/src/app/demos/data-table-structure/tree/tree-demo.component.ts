import { Component } from '@angular/core';
import { TngTree } from '@tociva/tailng-ui/table';

@Component({
  selector: 'playground-tree-demo',
  standalone: true,
  imports: [TngTree],
  templateUrl: './tree-demo.component.html',
})
export class TreeDemoComponent {}

