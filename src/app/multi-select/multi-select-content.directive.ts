import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: '[appMultiSelectContentDirective]'
})
export class MultiSelectContentDirective {
    constructor(public template: TemplateRef<any>) {}
}