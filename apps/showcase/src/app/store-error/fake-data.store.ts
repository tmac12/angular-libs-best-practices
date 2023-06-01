import { Injectable, inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, exhaustMap } from 'rxjs';
import { FakeDataService } from './fake-data.service';
import { HttpErrorResponse } from '@angular/common/http';

export const enum LoadingState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}

export interface ErrorState {
  errorMsg: string;
}

export type CallState = LoadingState | ErrorState;

interface FakeDataState {
  items: string[];
  callState: CallState;
}

// Utility function to extract the error from the state
function getError(callState: CallState): LoadingState | string | null {
  if ((callState as ErrorState).errorMsg !== undefined) {
    return (callState as ErrorState).errorMsg;
  }

  return null;
}

@Injectable()
export class FakeDataStore extends ComponentStore<FakeDataState> {
  fakeDataService = inject(FakeDataService);

  constructor() {
    super({
      items: [],
      callState: LoadingState.INIT,
    });
  }

  // SELECTORS
  private readonly items$: Observable<string[]> = this.select(
    (state) => state.items
  );
  private readonly loading$: Observable<boolean> = this.select(
    (state) => state.callState === LoadingState.LOADING
  );
  private readonly error$: Observable<string | null> = this.select((state) =>
    getError(state.callState)
  );

  // ViewModel for the component
  readonly vm$ = this.select(
    this.items$,
    this.loading$,
    this.error$,
    (items, loading, error) => ({
      items,
      loading,
      error,
    })
  );

  // UPDATERS
  readonly updateError = this.updater((state: FakeDataState, error: string) => {
    return {
      ...state,
      callState: {
        errorMsg: error,
      },
    };
  });
  readonly setLoading = this.updater((state: FakeDataState) => {
    return {
      ...state,
      callState: LoadingState.LOADING,
    };
  });
  readonly setLoaded = this.updater((state: FakeDataState) => {
    return {
      ...state,
      callState: LoadingState.LOADED,
    };
  });
  readonly updateItem = this.updater((state: FakeDataState, item: string) => {
    return {
      ...state,
      error: '',
      items: [...state.items, item],
    };
  });

  readonly setList = this.updater(
    (state: FakeDataState, list: string[]): FakeDataState => {
      return {
        ...state,
        items: list,
      };
    }
  );

  // EFFECTS
  readonly getFakeDataErrors = this.effect<void>((trigger$) =>
    trigger$.pipe(
      exhaustMap(() => {
        this.setLoading();
        return this.fakeDataService.getFakeDataErrors().pipe(
          tapResponse<string[]>(
            this.setList,
            //(error: { message: string }) => console.error(error.message),
            (error) => {
              if (error instanceof HttpErrorResponse) {
                this.updateError('error on getFakeDataErrors ' + error.message);
              } else {
                this.updateError('error on getFakeDataErrors ' + error);
              }
            },
            () => this.setLoaded()
          )
        );
      })
    )
  );

  //   readonly getFakeDatas = this.effect(() => {
  //     this.setLoading();
  //     return this.fakeDataService.getFakeDatas().pipe(
  //       tapResponse<string[]>(
  //         this.setList,
  //         //(error: { message: string }) => console.error(error.message),
  //         (error) => {
  //           if (error instanceof HttpErrorResponse) {
  //             this.updateError('error on getFakeDataErrors ' + error.message);
  //           } else {
  //             this.updateError('error on getFakeDataErrors ' + error);
  //           }
  //           console.error('there is an error: ' + error);
  //         },
  //         () => this.setLoaded()
  //       )
  //     );
  //   });
}
