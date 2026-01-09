import { Component } from '@angular/core';
import { TailngMenuComponent, TailngMenuItemDirective } from '@tailng/ui';

@Component({
  selector: 'playground-menu-demo',
  standalone: true,
  imports: [TailngMenuComponent, TailngMenuItemDirective],
  templateUrl: './menu-demo.component.html',
})
export class MenuDemoComponent {
  onMenuClosed(reason: unknown): void {
    console.log('Menu closed:', reason);
  }

  onAction(action: string): void {
    console.log('Action:', action);
  }
}
