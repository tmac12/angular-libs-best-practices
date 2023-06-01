import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'angular-libs-best-practices-store-common',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store-common.component.html',
  styleUrls: ['./store-common.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCommonComponent {}
