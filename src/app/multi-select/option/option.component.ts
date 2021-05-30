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
      [checked]="option?.isChecked"
    /><ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent implements OnInit, AfterViewInit {
  @Input()
  option?: { id: string; label: string; value: string; isChecked: boolean };

  click$?: Observable<any>;

  @ViewChild('input')
  input!: ElementRef;

  ngOnInit(): void {
    // no implementation needed
  }

  ngAfterViewInit() {
    this.click$ = fromEvent(this.input.nativeElement, 'change').pipe(
      mapTo(this.option)
    );
  }
}
