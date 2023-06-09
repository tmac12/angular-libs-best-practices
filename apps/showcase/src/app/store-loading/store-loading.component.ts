import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LoadingService,
  SpinnerComponent,
} from '@angular-libs-best-practices/ui-kit';
import { FakeDataStore } from '../store-error/fake-data.store';
import { tap } from 'rxjs';
import { LoadingDataStore } from './loading-data.store';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'angular-libs-best-practices-store-loading',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, LetDirective],
  templateUrl: './store-loading.component.html',
  styleUrls: ['./store-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoadingService, FakeDataStore, LoadingDataStore],
})
export class StoreLoadingComponent implements OnInit {
  loadingService = inject(LoadingService);
  loadingDataStore = inject(LoadingDataStore);

  vm$ = this.loadingDataStore.vm$.pipe(
    tap((t) => {
      if (t.loading) this.loadingService.show();
      else this.loadingService.hide();
      if (t.items) console.log(JSON.stringify(t.items));
      console.log(JSON.stringify(t));
    })
  );

  ngOnInit(): void {
    this.loadingDataStore.getFakeDatas();
  }
}
