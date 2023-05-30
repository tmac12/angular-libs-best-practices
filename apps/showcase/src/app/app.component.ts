import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { CardShowcaseComponent } from './card-showcase/card-showcase.component';
import { StoreErrorComponent } from './store-error/store-error.component';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    CardShowcaseComponent,
    StoreErrorComponent,
  ],
  selector: 'angular-libs-best-practices-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'showcase';
}
