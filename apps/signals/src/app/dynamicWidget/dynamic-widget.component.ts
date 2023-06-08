import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetData } from '../state/settings.service';

@Component({
  selector: 'angular-libs-best-practices-dynamic-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-widget.component.html',
  styleUrls: ['./dynamic-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicWidgetComponent {
  @Input() data?: WidgetData;
  @Output() clickEvent = new EventEmitter<WidgetData>();
  @Input() backgroundColor?: string;
}
