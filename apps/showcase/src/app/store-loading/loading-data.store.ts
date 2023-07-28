import { Injectable, inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FakeDataService } from '../store-error/fake-data.service';
import { Observable, delay, exhaustMap, pipe, switchMap, tap } from 'rxjs';
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

interface LoadingDataState {
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
export class LoadingDataStore extends ComponentStore<LoadingDataState> {
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
  readonly updateError = this.updater(
    (state: LoadingDataState, error: string) => {
      return {
        ...state,
        callState: {
          errorMsg: error,
        },
      };
    }
  );
  readonly setLoading = this.updater((state: LoadingDataState) => {
    return {
      ...state,
      callState: LoadingState.LOADING,
    };
  });
  readonly setLoaded = this.updater((state: LoadingDataState) => {
    return {
      ...state,
      callState: LoadingState.LOADED,
    };
  });
  readonly updateItem = this.updater(
    (state: LoadingDataState, item: string) => {
      return {
        ...state,
        error: '',
        items: [...state.items, item],
      };
    }
  );

  setList = this.updater(
    (state: LoadingDataState, list: string[]): LoadingDataState => {
      console.log('loading-data.store setList' + JSON.stringify(list));
      return {
        ...state,
        items: list,
      };
    }
  );

  // EFFECTS

  //create effects without parameters: https://ngrx.io/guide/component-store/effect#calling-an-effect-without-parameters
  // readonly getFakeDatas = this.effect<void>((trigger$) =>
  //   trigger$.pipe(
  //     exhaustMap(() => {
  //       this.setLoading();
  //       return this.fakeDataService.getFakeDatas().pipe(
  //         delay(600),
  //         tapResponse<string[]>(
  //           this.setList,
  //           //(error: { message: string }) => console.error(error.message),
  //           (error) => {
  //             if (error instanceof HttpErrorResponse) {
  //               this.updateError('error on getFakeDataErrors ' + error.message);
  //             } else {
  //               this.updateError('error on getFakeDataErrors ' + error);
  //             }
  //             console.error('there is an error: ' + error);
  //           },
  //           () => this.setLoaded()
  //         )
  //       );
  //     })
  //   )
  // );

  // fetchTodo takes no input parameters
  readonly getFakeDatas = this.effect<void>(
    pipe(
      tap(() => this.patchState({ callState: LoadingState.LOADING })),
      switchMap(() =>
        this.fakeDataService.getFakeDatas().pipe(
          delay(600),
          tapResponse(
            // success logic
            this.setList,
            // failure logic
            (error) => {
              if (error instanceof HttpErrorResponse) {
                this.updateError('error on getFakeDataErrors ' + error.message);
              } else {
                this.updateError('error on getFakeDataErrors ' + error);
              }
              console.error('there is an error: ' + error);
            },
            () => this.setLoaded()
          )
        )
      )
    )
  );
}
