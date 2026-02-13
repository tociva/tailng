import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TngCard, TngCardFooter } from '@tailng-ui/ui/layout';

@Component({
  standalone: true,
  selector: 'docs-component-demo-card',
  templateUrl: './component-demo-card.component.html',
  imports: [TngCard, TngCardFooter, RouterLink],
})
export class ComponentDemoCardComponent {
  routerLink = input.required<string>();
  title = input.required<string>();
  description = input<string>('Footer');
  imageUrl = input<string>();
}
