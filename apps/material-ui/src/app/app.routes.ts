import { Route } from '@angular/router';
import { ChipsComponent } from './chips/chips.component';
import { HomeComponent } from './home/home.component';
import { DashComponent } from './dash/dash.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MyListComponent } from './my-list/my-list.component';

export const appRoutes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'chips', component: ChipsComponent },
  { path: 'dash', component: DashComponent },
  { path: 'nav', component: NavigationComponent },
  { path: 'mylist', component: MyListComponent },
  { path: '**', redirectTo: 'home' },
];
