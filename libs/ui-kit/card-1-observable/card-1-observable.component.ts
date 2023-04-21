import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'angular-libs-best-practices-card-1-observable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-1-observable.component.html',
  styleUrls: ['./card-1-observable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card1ObservableComponent {}
