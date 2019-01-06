import {Component} from '@angular/core';

/**
 * @title Configurable progress spinner
 */
@Component({
  selector: 'progress-spinner-configurable-example',
  templateUrl: 'progress-spinner-configurable-example.component.html',
  styleUrls: ['progress-spinner-configurable-example.component.css'],
})
export class ProgressSpinnerConfigurableExampleComponent {
  color = 'primary';
  mode = 'determinate';
  value = 50;
}
