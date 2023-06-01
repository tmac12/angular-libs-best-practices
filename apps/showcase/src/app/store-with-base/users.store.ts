import {
  BaseComponentStore,
  GenericState,
  LoadingState,
} from '@angular-libs-best-practices/store-common';
import { Injectable, inject } from '@angular/core';
import { Observable, exhaustMap } from 'rxjs';
import { tapResponse } from '@ngrx/component-store';
import { UserData, UserService } from './user.service';

interface UserViewModel {
  names: UserData[];
  loading: boolean;
  error: string | null;
}

@Injectable()
export class UsersStore extends BaseComponentStore<GenericState<UserData[]>> {
  userService = inject(UserService);

  readonly names$ = this.select((state) => state.data);
  readonly vm$: Observable<UserViewModel> = this.select(
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
        return this.userService.getUsers().pipe(
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
