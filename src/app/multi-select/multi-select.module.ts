import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MultiSelectContentDirective } from "./multi-select-content.directive";
import { MultiSelectComponent } from "./multi-select.component";
import { MultiSelectDirective } from "./multi-select.directive";
import { OptionComponent } from "./option/option.component";


const publicApi = [
  MultiSelectComponent,
  MultiSelectDirective,
  MultiSelectContentDirective,
  OptionComponent,
];

@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: publicApi,
  exports: publicApi,
})
export class MultiSelectModule {}