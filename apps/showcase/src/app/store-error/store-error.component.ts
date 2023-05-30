import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FakeDataStore } from './fake-data.store';
import { FakeDataService } from './fake-data.service';
import { LetDirective } from '@ngrx/component';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';

@Component({
  selector: 'angular-libs-best-practices-store-error',
  standalone: true,
  imports: [CommonModule, LetDirective],
  templateUrl: './store-error.component.html',
  styleUrls: ['./store-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FakeDataStore],
})
export class StoreErrorComponent implements OnInit {
  fakeDataStore = inject(FakeDataStore);
  toastrService = inject(ToastrService);

  vm$ = this.fakeDataStore.vm$.pipe(
    tap((t) => {
      if (t.error !== null) {
        this.toastrService.error(t.error);
      }
    })
  );

  ngOnInit(): void {
    // this.fakeDataStore.getFakeDatas();
    // this.fakeDataStore.getFakeDataErrors();
  }
}
