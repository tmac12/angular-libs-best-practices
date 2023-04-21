import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { StoreService } from '../card-store/store.service';
import { of } from 'rxjs';
import { CardModel } from '../card-model/card-model';

@Component({
  selector: 'card-2-store',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './card-2-store.component.html',
  styleUrls: ['./card-2-store.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [StoreService], //de-comment this if you want to have a store service for every instance of card-2
})
export class Card2StoreComponent {
  vm$ = this.store.vm$;

  @Input() set item(value: CardModel) {
    this.store.addItem(of<CardModel>(value));
  }

  constructor(private store: StoreService) {}
}
