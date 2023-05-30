import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CardShowcaseComponent } from './card-showcase/card-showcase.component';
import { StoreErrorComponent } from './store-error/store-error.component';

export const appRoutes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'cardShowcase', component: CardShowcaseComponent },
  { path: 'storeError', component: StoreErrorComponent },
  { path: '**', redirectTo: 'home' },
];
