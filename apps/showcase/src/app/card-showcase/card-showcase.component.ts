import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Card1ObservableComponent,
  Card2StoreComponent,
  CardModel,
  StoreService,
} from '@angular-libs-best-practices/ui-kit';
import { CardShowcaseService } from './card-showcase.service';
import { LetModule, PushModule } from '@ngrx/component';
import { EMPTY, Subject, exhaustMap, of } from 'rxjs';

@Component({
  selector: 'angular-libs-best-practices-card-showcase',
  standalone: true,
  imports: [
    CommonModule,
    LetModule,
    PushModule,
    Card1ObservableComponent,
    Card2StoreComponent,
  ],
  templateUrl: './card-showcase.component.html',
  styleUrls: ['./card-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CardShowcaseService, StoreService],
})
export class CardShowcaseComponent implements AfterViewInit {
  storeService = inject(StoreService);
  cardShowcaseService = inject(CardShowcaseService);

  // change$ = new Subject<boolean>();
  cards$ = this.cardShowcaseService.loadCards$();

  // aa = this.change$.pipe(
  //   exhaustMap(() => {
  //     const newCard = this.getNewCard();
  //     this.card = { ...newCard };
  //     return EMPTY;
  //   })
  // );

  public card: CardModel = {
    title: 'title 1',
    bodyValue: 'value 1',
  };

  private getNewCard() {
    const newCard: CardModel = {
      title: 'title 3',
      bodyValue: '456',
      color: 'red',
    };

    return newCard;
  }

  public onChangeClick() {
    this.cardShowcaseService.loadNewCard$().subscribe((item) => {
      this.card = item;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log('end delay');

      const newCard = this.getNewCard();

      //update value via store
      this.storeService.addItem(of<CardModel>(newCard));

      //update value changing object doesn't work
      //this.card = { ...newCard };
      //this.card = newCard;
    }, 5000);
  }
}
