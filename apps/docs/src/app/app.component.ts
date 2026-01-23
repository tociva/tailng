import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from './shared/seo/seo.service';

@Component({
  selector: 'docs-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.init();
  }
}
