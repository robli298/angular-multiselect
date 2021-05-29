import { Subject } from 'rxjs';

export function TakeUntilDestroy(constructor: any) {
  const originalNgOnDestroyFunction = constructor.prototype.ngOnDestroy;

  if (typeof originalNgOnDestroyFunction !== 'function') {
    console.warn(
      `${constructor.name} is using @TakeUntilDestroy but does not implement OnDestroy`
    );
  }

  constructor.prototype.destroyed = function () {
    this._takeUntilDestroy$ = this._takeUntilDestroy$ || new Subject();
    return this._takeUntilDestroy$.asObservable();
  };

  constructor.prototype.ngOnDestroy = function () {
    originalNgOnDestroyFunction &&
      typeof originalNgOnDestroyFunction === 'function' &&
      originalNgOnDestroyFunction.apply(this);
    this._takeUntilDestroy$ &&
      this._takeUntilDestroy$.next() &&
      this._takeUntilDestroy$.complete();
  };
}
