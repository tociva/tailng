import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'docs-theme',
  host: { class: 'block flex-1 min-h-0 overflow-auto' },
  templateUrl: './theme.component.html',
})
export class ThemeComponent {}
