import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { MaterialModule } from '../material.module';
import { LetDirective } from '@ngrx/component';

export interface EntityWithDescriptionDto {
  description: string;
  key: string;
  id: number;
  lastUpdate?: Date;
}

export interface TagDto extends EntityWithDescriptionDto {
  // color: string | object | [klass: string] | undefined;
  // color: string | { [klass: string]: any } | undefined;
  color: any | undefined;
}

@Component({
  selector: 'angular-libs-best-practices-chips',
  standalone: true,
  imports: [CommonModule, MaterialModule, LetDirective],
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsComponent {
  tag1: TagDto = {
    description: 'item 1',
    id: 1,
    key: 'item1',
    color: '',
  };
  tags$ = of<TagDto[]>([this.tag1]);
  colorVar = 'red';
}
