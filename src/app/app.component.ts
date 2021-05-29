import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  options = [
    {
      id: '12',
      label: 'test 1',
      isChecked: false,
    },
    {
      id: '1',
      label: 'test 2',
      isChecked: false,
    },
    {
      id: '34',
      label: 'test 3',
      isChecked: false,
    },
  ];

  control = new FormControl();
}
