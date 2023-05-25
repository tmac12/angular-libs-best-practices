import { Route } from '@angular/router';
import { ChipsComponent } from './chips/chips.component';
import { HomeComponent } from './home/home.component';
import { DashComponent } from './dash/dash.component';

export const appRoutes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'chips', component: ChipsComponent },
  { path: 'dash', component: DashComponent },
  { path: '**', redirectTo: 'home' },
];
