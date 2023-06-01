import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

export const enum LoadingState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}

export interface ErrorState {
  errorMsg: string;
}

export type CallState = LoadingState | ErrorState;

export interface GenericState<T> {
  data: T;
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
export class BaseComponentStore<
  T extends GenericState<unknown>
> extends ComponentStore<T> {
  // SELECTORS
  private readonly items$ = this.select((state) => state.data);

  private readonly loading$: Observable<boolean> = this.select(
    (state) => state.callState === LoadingState.LOADING
  );
  private readonly error$: Observable<string | null> = this.select((state) =>
    getError(state.callState)
  );

  //ViewModel
  baseSelector = this.select(
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
  readonly updateError = this.updater((state, error: string): T => {
    return {
      ...state,
      callState: {
        errorMsg: error,
      },
    };
  });

  readonly setLoading = this.updater((state): T => {
    return {
      ...state,
      data: undefined,
      callState: LoadingState.LOADING,
    };
  });

  readonly setLoaded = this.updater((state): T => {
    return {
      ...state,
      callState: LoadingState.LOADED,
    };
  });

  readonly updateItem = this.updater((state, data: T['data']): T => {
    return {
      ...state,
      data,
      callState: LoadingState.LOADED,
    };
  });
}
