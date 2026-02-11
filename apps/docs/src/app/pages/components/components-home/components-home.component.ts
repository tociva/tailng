import { Component, computed, OnInit, signal } from '@angular/core';
import { TngAccordion, TngExpansionPanel } from '@tailng-ui/ui/layout';
import { ComponentDemoCardComponent } from '../../../shared/component-demo-card/component-demo-card.component';
import { TngSlotMap, TngTextInput, TngTextInputSlot } from '@tailng-ui/ui/form';
import { TngIcon } from '@tailng-ui/icons/icon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
export interface ComponentDemoItem {
  routerLink: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface ComponentDemoSection {
  sectionTitle: string;
  components: ComponentDemoItem[];
}

@Component({
  standalone: true,
  selector: 'docs-components-home',
  templateUrl: './components-home.component.html',
  imports: [
    TngAccordion,
    TngExpansionPanel,
    ComponentDemoCardComponent,
    TngTextInput,
    TngIcon,
    ReactiveFormsModule,
  ],
})
export class ComponentsHomeComponent implements OnInit {
readonly frameSlot: TngSlotMap<TngTextInputSlot> = {
    frame: ['md:hidden','border-primary', 'border-2', 'focus-within:ring-2', 'rounded-2xl'],
  };

  isMobile = signal(window.innerWidth < 768);
  constructor() {
    window.addEventListener('resize', () => {
      this.isMobile.set(window.innerWidth < 768);
    });
  }
  form = new FormGroup({
    text: new FormControl(''),
  });
 searchQuery = signal<string>('');
  
ngOnInit() {
  this.form.controls.text.valueChanges.subscribe(value => {
    this.searchQuery.set(value ?? '');
  });
}
normalizedQuery = computed(() =>
  this.searchQuery().toLowerCase().trim()
);
filteredNav(): ComponentDemoSection[] {
  const q = this.normalizedQuery();
  if (!q) return this.sections;

  return this.sections
    .map(section => ({
      ...section,
      components: section.components.filter(component =>
        component.title.toLowerCase().includes(q)
      )
    }))
    .filter(section =>
      section.components.length > 0 ||
      section.sectionTitle.toLowerCase().includes(q)
    );
}


sectionMatchesQuery(section: ComponentDemoSection): boolean {
  const q = this.normalizedQuery();
  if (!q) return false;

  return (
    section.sectionTitle.toLowerCase().includes(q) ||
    section.components.some(component =>
      component.title.toLowerCase().includes(q)
    )
  );
}




  readonly sections: ComponentDemoSection[] = [
    {
      sectionTitle: 'Form Controls',
      components: [
        {
          routerLink: '../components/forms/autocomplete/overview',
          title: 'Auto Complete',
          description: 'Footer',
          imageUrl: '/assets/autocomplete.png',
        },
        {
          routerLink: '../components/forms/checkbox/overview',
          title: 'Checkbox',
          description:
            'Captures a boolean value with support for checked unchecked, and optional labeling for clear selection feedback.',
          imageUrl: '/assets/check-box.png',
        },
        {
          routerLink: '../components/forms/chips/overview',
          title: 'Chips',
          description: 'Footer',
          imageUrl: '/assets/chips.png',
        },
        {
          routerLink: '../components/forms/datepicker/overview',
          title: 'Datepicker',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/forms/timepicker/overview',
          title: 'Timepicker',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/forms/form-field/overview',
          title: 'Form Field',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/forms/text-input/overview',
          title: 'Textinput',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/forms/number-input/overview',
          title: 'Number Input',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/forms/textarea/overview',
          title: 'Textarea',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/forms/file-upload/overview',
          title: 'File Upload',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/forms/radio-button/overview',
          title: 'Radio Button',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/forms/select/overview',
          title: 'Select',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/forms/slider/overview',
          title: 'Slider',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/forms/slide-toggle/overview',
          title: 'Slide Toggle',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/forms/button-toggle/overview',
          title: 'Button Toggle',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
      ],
    },
    {
      sectionTitle: 'Buttons & Indicators',
      components: [
        {
          routerLink: '../components/buttons/button/overview',
          title: 'Button',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/buttons/badge/overview',
          title: 'Badge',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/buttons/tag/overview',
          title: 'Tag',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/buttons/icon/overview',
          title: 'Icon',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/buttons/ripples/overview',
          title: 'Ripples',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/buttons/progress-bar/overview',
          title: 'Progress Bar',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/buttons/progress-spinner/overview',
          title: 'Progress Spinner',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/buttons/skeleton/overview',
          title: 'Skeleton',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
      ],
    },
    {
      sectionTitle: 'Layout',
      components: [
        {
          routerLink: '../components/layout/card/overview',
          title: 'Card',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/layout/divider/overview',
          title: 'Divider',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/layout/expansion-panel/overview',
          title: 'Expansion panel',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/layout/tabs/overview',
          title: 'Tabs',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/layout/accordion/overview',
          title: 'Accordion',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
      ],
    },
    {
      sectionTitle: 'Navigation',
      components: [
        {
          routerLink: '../components/navigation/menu/overview',
          title: 'Menu',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/navigation/sidenav/overview',
          title: 'Sidenav',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/navigation/drawer/overview',
          title: 'Drawer',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/navigation/stepper/overview',
          title: 'Stepper',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/navigation/paginator/overview',
          title: 'Paginator',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/navigation/breadcrumbs/overview',
          title: 'Breadcrumbs',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
      ],
    },
    {
      sectionTitle: 'Popups & Overlays',
      components: [
        {
          routerLink: '../components/overlay/dialog/overview',
          title: 'Dialog',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/overlay/snackbar/overview',
          title: 'Snackbar',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/overlay/tooltip/overview',
          title: 'Tooltip',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/overlay/popover/overview',
          title: 'Popover',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
      ],
    },
    {
      sectionTitle: 'Data Table & Structure',
      components: [
        {
          routerLink: '../components/data/table/overview',
          title: 'Table Basic',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/data/sort-header/overview',
          title: 'Sort Header',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/data/filter-header/overview',
          title: 'Filter Header',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/data/tree/overview',
          title: 'Tree',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/data/virtual-scroll/overview',
          title: 'Virtual Scroll',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/data/empty-state/overview',
          title: 'Empty State',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
      ],
    },
    {
      sectionTitle: 'Utilities',
      components: [
        {
          routerLink: '../components/utilities/code-block/overview',
          title: 'Code Block',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
        {
          routerLink: '../components/utilities/copy-button/overview',
          title: 'Copy Button',
          description: 'Footer',
          imageUrl: '/assets/components/form/fake.png',
        },
      ],
    },
  ];
}
