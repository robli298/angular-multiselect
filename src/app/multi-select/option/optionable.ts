import { Observable } from "rxjs";

export interface Optionable {
  value: string;
  click$: Observable<string>;
}