import {
  BaseComponentStore,
  GenericState,
  LoadingState,
} from '@angular-libs-best-practices/store-common';
import { Injectable, inject } from '@angular/core';
import { Observable, exhaustMap } from 'rxjs';
import { FakeData, FakeDataService } from './fake-data.service';
import { tapResponse } from '@ngrx/component-store';

interface FakeDataViewModel {
  names: FakeData[];
  loading: boolean;
  error: string | null;
}

@Injectable()
export class FakeDataStoreNew extends BaseComponentStore<
  GenericState<FakeData[]>
> {
  fakeDataService = inject(FakeDataService);

  readonly names$ = this.select((state) => state.data);
  //   readonly vm$ = this.select(
  readonly vm$: Observable<FakeDataViewModel> = this.select(
    this.baseSelector,
    this.names$,
    (state, names) => ({ ...state, names })
  );

  constructor() {
    super({
      data: [],
      callState: LoadingState.INIT,
    });
  }

  // EFFECTS
  //create effects without parameters: https://ngrx.io/guide/component-store/effect#calling-an-effect-without-parameters
  readonly getFakeDatas = this.effect<void>((trigger$) =>
    trigger$.pipe(
      exhaustMap(() => {
        this.setLoading();
        return this.fakeDataService.getFakeDatasTyped().pipe(
          tapResponse(
            (v) => this.updateItem(v),
            (error: string) => this.updateError(error),
            () => this.setLoaded()
          )
        );
      })
    )
  );
}
