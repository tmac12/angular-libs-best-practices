import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Card1ObservableComponent,
  CardModel,
} from '@angular-libs-best-practices/ui-kit';

@Component({
  selector: 'angular-libs-best-practices-card-showcase',
  standalone: true,
  imports: [CommonModule, Card1ObservableComponent],
  templateUrl: './card-showcase.component.html',
  styleUrls: ['./card-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardShowcaseComponent {
  public card: CardModel = {
    title: 'title 1',
    bodyValue: 'value 1',
  };
}
