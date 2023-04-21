import { Injectable } from '@angular/core';
import { CardModel } from 'libs/ui-kit/src/lib/card-model/card-model';
import { of, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardShowcaseService {
  loadCards$() {
    const cards: Array<CardModel> = [
      {
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/b/b3/Jordan_Lipofsky.jpg',
        title: 'title 1',
        bodyValue: '1',
      },
      {
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/a/a7/LeBron_James_Lakers.jpg',
        title: 'title 2',
        bodyValue: '2',
      },
    ];

    return timer(2000).pipe(switchMap(() => of(cards)));
  }
  constructor() {}
}
