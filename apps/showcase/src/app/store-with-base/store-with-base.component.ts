import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStore } from './users.store';
import { LetDirective } from '@ngrx/component';
import { tap } from 'rxjs';

@Component({
  selector: 'angular-libs-best-practices-store-with-base',
  standalone: true,
  imports: [CommonModule, LetDirective],
  templateUrl: './store-with-base.component.html',
  styleUrls: ['./store-with-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersStore],
})
export class StoreWithBaseComponent implements OnInit {
  usersStore = inject(UsersStore);

  vm$ = this.usersStore.vm$.pipe(
    tap((t) => {
      t.loading ? console.log('loading') : console.log('loaded');
      if (t.users) console.log('users:' + JSON.stringify(t.users));
      console.log('vm object:' + JSON.stringify(t));
    })
  );

  ngOnInit(): void {
    this.usersStore.getUsers();
  }
}
