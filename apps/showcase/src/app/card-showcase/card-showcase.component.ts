import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'angular-libs-best-practices-card-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-showcase.component.html',
  styleUrls: ['./card-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardShowcaseComponent {}
