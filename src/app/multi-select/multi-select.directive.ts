import {
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { fromEvent, Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { TakeUntilDestroy } from '../take-until-destroy';
import { MultiSelectComponent } from './multi-select.component';

@Directive({
  selector: '[multiSelect]',
})
@TakeUntilDestroy
export class MultiSelectDirective implements OnInit, OnDestroy {
  @Input()
  multiSelect!: MultiSelectComponent;

  private _overlayRef!: OverlayRef | null;

  destroyed!: () => Observable<any>;

  constructor(
    private _host: ElementRef<HTMLInputElement>,
    private _overlay: Overlay,
    private _viewContainer: ViewContainerRef,
    private _ngControl: NgControl,
    @Inject(DOCUMENT) private _document: Document
  ) {
    // no implementation needed
  }
  ngOnInit(): void {
    fromEvent(this.origin, 'focus')
      .pipe(takeUntil(this.destroyed()))
      .subscribe(() => {

        console.log(this.control?.value);

        // NOSONAR
        this.openDropdown();
        this.multiSelect
          .optionsClick()
          .pipe(takeUntil(this._overlayRef!.detachments()))
          .subscribe((option: any) => {
            //NOSONAR
            this.control?.setValue(this.getNewValue(option.value, this.control?.value));
          });
      });
  }

  ngOnDestroy(): void {
    // no implementation needed
  }

  get control() {
    return this._ngControl.control;
  }

  get origin() {
    return this._host.nativeElement;
  }

  private close(): void {
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
    this._overlayRef = null;
  }

  private openDropdown(): void {
    this._overlayRef = this._overlay.create({
      width: this.origin.offsetWidth,
      maxHeight: 40 * 3,
      backdropClass: '',
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      positionStrategy: this.getOverlayPosition(),
    });

    const template = new TemplatePortal(
      this.multiSelect.rootTemplate,
      this._viewContainer
    );

    this._overlayRef.attach(template);

    this.overlayClickedOutside()!.subscribe(() => this.close()); //NOSONAR
  }

  private getOverlayPosition(): FlexibleConnectedPositionStrategy {
    const positions = [
      new ConnectionPositionPair(
        {
          originX: 'start',
          originY: 'bottom',
        },
        {
          overlayX: 'start',
          overlayY: 'top',
        }
      ),
      new ConnectionPositionPair(
        {
          originX: 'start',
          originY: 'top',
        },
        {
          overlayX: 'start',
          overlayY: 'bottom',
        }
      ),
    ];

    return this._overlay
      .position()
      .flexibleConnectedTo(this.origin)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);
  }

  private overlayClickedOutside() {
    return fromEvent<MouseEvent>(this._document, 'click').pipe(
      filter((event) => {
        const clickedTarget = event.target as HTMLElement;
        const notOrigin = clickedTarget !== this.origin;
        const notOverlay =
          !!this._overlayRef &&
          this._overlayRef.overlayElement.contains(clickedTarget) === false;
        return notOrigin && notOverlay;
      })
    );
  }

  private getNewValue(newValue: string, oldValue: string): string {
   const separator = ',';

    if(oldValue) {
      const valueAsArray: string[] = oldValue.split(separator);

      if(valueAsArray.includes(newValue)) {
        return valueAsArray.filter((i) => i !== newValue).join(separator);
      } else {
        valueAsArray.push(newValue);
        return valueAsArray.join(separator);
      }
    }
    return newValue;
  }
}


