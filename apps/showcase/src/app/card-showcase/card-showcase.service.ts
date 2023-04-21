import { Injectable } from '@angular/core';
import { CardModel } from 'libs/ui-kit/card-model/card-model';
import { of, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardShowcaseService {
  loadCards$() {
    const cards: Array<CardModel> = [
      {
        icon: '',
        title: 'title 1',
        bodyValue: '1',
      },
      {
        icon: '',
        title: 'title 2',

        bodyValue: '2',
      },
    ];

    return timer(2000).pipe(switchMap(() => of(cards)));
  }
  constructor() {}
}
