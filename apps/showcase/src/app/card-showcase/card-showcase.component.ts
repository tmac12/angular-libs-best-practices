import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Card1ObservableComponent,
  Card2StoreComponent,
  CardModel,
  StoreService,
} from '@angular-libs-best-practices/ui-kit';
import { CardShowcaseService } from './card-showcase.service';
import { LetModule } from '@ngrx/component';

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
export class CardShowcaseComponent {
  cardShowcaseService = inject(CardShowcaseService);

  cards$ = this.cardShowcaseService.loadCards$();

  public card: CardModel = {
    title: 'title 1',
    bodyValue: 'value 1',
  };
}
