import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-option',
  template: `<input
      #input
      type="checkbox"
      [checked]="isChecked"
    /><ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent implements OnInit, AfterViewInit {
  @Input()
  value!: string;

  @Input()
  isChecked!: boolean;

  click$!: Observable<string>;

  @ViewChild('input')
  input!: ElementRef;

  ngOnInit(): void {
    // no implementation needed
  }

  ngAfterViewInit() {
    this.click$ = fromEvent(this.input.nativeElement, 'change').pipe(
      mapTo(this.value)
    );
  }
}
