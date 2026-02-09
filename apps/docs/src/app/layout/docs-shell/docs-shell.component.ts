import { Component, computed, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  TngAccordion,
  TngExpansionPanel,
} from '@tailng-ui/ui/layout';
import { TngSlotMap, TngTextInput, TngTextInputSlot } from '@tailng-ui/ui/form';
import { TngSidenav } from '@tailng-ui/ui/navigation';
import { docsNav } from '../../data/nav';
import { TngIcon } from '@tailng-ui/icons/icon';

@Component({
  standalone: true,
  selector: 'docs-shell',
  host: { class: 'flex flex-1 flex-col min-h-0 overflow-hidden' },
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TngAccordion,
    TngExpansionPanel,
    TngSidenav,
    TngTextInput,
    ReactiveFormsModule,
    TngIcon,
  ],
  templateUrl: './docs-shell.component.html',
})
export class DocsShellComponent implements OnInit {
  mobileOpen = signal(false);
  nav = computed(() => docsNav);
  searchQuery = signal<string>('');
  
   form = new FormGroup({
    text: new FormControl(''),
  });
ngOnInit() {
  this.form.controls.text.valueChanges.subscribe(value => {
    this.searchQuery.set(value ?? '');
  });
}
normalizedQuery = computed(() =>
  this.searchQuery().toLowerCase().trim()
);
filteredNav() {
  const q = this.normalizedQuery();
  return this.nav().filter(section =>
    section.title.toLowerCase().includes(q) ||
    section.children?.some(child =>
      child.title?.toLowerCase().includes(q)
    )
  );
}
readonly frameSlot: TngSlotMap<TngTextInputSlot> = {
    frame: ['focus-within:!ring-0', 'focus-within:!ring-offset-0', 'border-0', 'focus-within:border-b-2', 'focus-within:border-primary', 'rounded-none'],
  };

}
