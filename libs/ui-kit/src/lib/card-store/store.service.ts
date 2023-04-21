import { Injectable } from '@angular/core';
import { CardModel } from '../card-model/card-model';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, tap } from 'rxjs';

export const enum LoadingState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}
export interface ErrorState {
  errorMsg: string;
}

export type CallState = LoadingState | ErrorState;

// The state model
interface CardState {
  item: CardModel;
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
export class StoreService extends ComponentStore<CardState> {
  constructor() {
    super({
      item: {} as CardModel,
      callState: LoadingState.INIT,
    });
  }

  // SELECTORS
  private readonly item$: Observable<CardModel> = this.select(
    (state) => state.item
  );
  private readonly loading$: Observable<boolean> = this.select(
    (state) => state.callState === LoadingState.LOADING
  );
  private readonly error$: Observable<string | null> = this.select((state) =>
    getError(state.callState)
  );

  // ViewModel for the component
  readonly vm$ = this.select(
    this.item$,
    this.loading$,
    this.error$,
    (item, loading, error) => ({
      item,
      loading,
      error,
    })
  );

  // UPDATERS
  readonly updateError = this.updater((state: CardState, error: string) => {
    return {
      ...state,
      callState: {
        errorMsg: error,
      },
    };
  });
  readonly setLoading = this.updater((state: CardState) => {
    return {
      ...state,
      callState: LoadingState.LOADING,
    };
  });
  readonly setLoaded = this.updater((state: CardState) => {
    return {
      ...state,
      callState: LoadingState.LOADED,
    };
  });
  readonly updateItem = this.updater((state: CardState, item: CardModel) => {
    return {
      ...state,
      error: '',
      item: item,
    };
  });

  // EFFECTS
  readonly addItem = this.effect((item$: Observable<CardModel>) => {
    return item$.pipe(
      tap((item: CardModel) => {
        this.setLoading();
        //TODO: validate item else this.updateError(e)
        this.setLoaded();
        this.updateItem(item);
      })
    );
  });
}
