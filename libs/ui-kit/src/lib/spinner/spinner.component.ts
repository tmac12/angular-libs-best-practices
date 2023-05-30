import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoadingService } from './loading.service';

@Component({
  selector: 'angular-libs-best-practices-spinner',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  loader = inject(LoadingService);
  loading$ = this.loader.loading$;
}
