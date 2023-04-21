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
import { LetModule } from '@ngrx/component';
import { of } from 'rxjs';

@Component({
  selector: 'angular-libs-best-practices-card-showcase',
  standalone: true,
  imports: [
    CommonModule,
    LetModule,
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

  cards$ = this.cardShowcaseService.loadCards$();

  public card: CardModel = {
    title: 'title 1',
    bodyValue: 'value 1',
  };

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log('end delay');
      const newCard: CardModel = {
        title: 'title 3',
        bodyValue: '456',
        color: 'red',
      };

      //update value via store
      this.storeService.addItem(of<CardModel>(newCard));

      //update value changing object
      this.card = newCard;
    }, 5000);
  }
}
