import {
  Component,
  ContentChild,
  ContentChildren,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MultiSelectContentDirective } from './multi-select-content.directive';
import { OptionComponent } from './option/option.component';

@Component({
  selector: 'app-multi-select',
  template: `<ng-template #root>
    <div class="multiselect">
      <ng-container *ngTemplateOutlet="content.template"></ng-container>
    </div>
  </ng-template>`,
  styleUrls: ['./multi-select.scss'],
  exportAs: 'appMultiSelect',
})
export class MultiSelectComponent implements OnInit {
  @ViewChild('root')
  rootTemplate!: TemplateRef<any>;

  @ContentChildren(OptionComponent)
  options!: QueryList<OptionComponent>;

  @ContentChild(MultiSelectContentDirective)
  content!: MultiSelectContentDirective;

  constructor() {
    // no implementation needed
  }

  ngOnInit(): void {
    // no implementation needed
  }

  optionsClick() {
    return this.options.changes.pipe(
      switchMap((options) => {
        const clicks$ = options.map((option: any) => option.click$);
        return merge(...clicks$);
      })
    );
  }
}
