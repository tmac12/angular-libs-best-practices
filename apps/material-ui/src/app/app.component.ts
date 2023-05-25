import { Component } from '@angular/core';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ChipsComponent } from './chips/chips.component';
import { DashComponent } from './dash/dash.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, ChipsComponent, DashComponent],
  selector: 'angular-libs-best-practices-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'material-ui';
}
