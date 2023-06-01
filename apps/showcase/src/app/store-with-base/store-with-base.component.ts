import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStore } from './users.store';
import { LetDirective } from '@ngrx/component';

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
  fakeDataStoreNew = inject(UsersStore);

  vm$ = this.fakeDataStoreNew.vm$;

  ngOnInit(): void {
    this.fakeDataStoreNew.getFakeDatas();
  }
}
