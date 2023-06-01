import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FakeDataStoreNew } from '../store-error/fake-data-new.store';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'angular-libs-best-practices-store-with-base',
  standalone: true,
  imports: [CommonModule, LetDirective],
  templateUrl: './store-with-base.component.html',
  styleUrls: ['./store-with-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FakeDataStoreNew],
})
export class StoreWithBaseComponent implements OnInit {
  fakeDataStoreNew = inject(FakeDataStoreNew);

  vm$ = this.fakeDataStoreNew.vm$;

  ngOnInit(): void {
    this.fakeDataStoreNew.getFakeDatas();
  }
}
