import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, of, takeUntil } from 'rxjs';
import { MaterialModule } from '../material.module';
import { LetDirective } from '@ngrx/component';
import { MatChipListbox } from '@angular/material/chips';

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
export class ChipsComponent implements OnInit, AfterViewInit, OnDestroy {
  tag1: TagDto = {
    description: 'item 1',
    id: 1,
    key: 'item1',
    color: '',
  };
  tag2: TagDto = {
    description: 'item 2',
    id: 2,
    key: 'item2',
    color: '',
  };

  tags$ = of<TagDto[]>([this.tag1, this.tag2]);
  private tags: TagDto[] = [];
  selectedTags: TagDto[] = [];
  selectedTagsSubject = new Subject<TagDto[]>();
  selectedTags$ = this.selectedTagsSubject.asObservable();

  colorVar = 'red';
  private destroy$ = new Subject<boolean>();

  @ViewChild(MatChipListbox) chipListBox: MatChipListbox | undefined;
  /** Return selected tags key */
  @Output() OnSelectionTagsKeyChange = new EventEmitter<string[]>();

  ngOnInit(): void {
    this.tags$.pipe(takeUntil(this.destroy$)).subscribe((t) => {
      this.tags = t;
    });

    // this.tagsStore.getTags();
  }

  ngAfterViewInit(): void {
    this.chipListBox?.chipSelectionChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((c) => {
        const selectedTags = this.tags.find(
          (t) => t.description === c.source.value
        );
        if (!selectedTags) {
          console.error('tag not found for ' + c.source.value);
          return;
        }
        if (c.selected) {
          this.selectedTags = [...this.selectedTags, selectedTags];
        } else {
          const unselected = this.selectedTags.filter(
            (o) => o.description !== c.source.value
          );
          this.selectedTags = unselected;
        }
        this.selectedTagsSubject.next(this.selectedTags);
        this.OnSelectionTagsKeyChange.emit(this.selectedTags.map((k) => k.key));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
