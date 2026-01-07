import { Component, signal } from '@angular/core';
import { TailngFileUploadComponent } from '@tailng/ui';

@Component({
  selector: 'playground-file-upload-demo',
  standalone: true,
  imports: [TailngFileUploadComponent],
  templateUrl: './file-upload-demo.component.html',
})
export class FileUploadDemoComponent {
  readonly files = signal<File[] | null>(null);
}
