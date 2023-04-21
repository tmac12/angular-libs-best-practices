import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { CardModel } from '../card-model/card-model';
@Component({
  selector: 'card-1-observable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-1-observable.component.html',
  styleUrls: ['./card-1-observable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card1ObservableComponent {
  // Item was changed action
  private itemChangedSubject = new BehaviorSubject<CardModel | undefined>(
    this.item
  );
  item$ = this.itemChangedSubject.asObservable();
  _item: CardModel | undefined;

  get item(): CardModel | undefined {
    return this._item;
  }

  @Input() set item(item: CardModel | undefined) {
    if (item) {
      this._item = item;
      this.itemChangedSubject.next(item);
    }
  }
}
