import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SettingsService } from '../state/settings.service';

export const initFrm = <T extends {}>(ctrls: T) =>
  inject(FormBuilder).nonNullable.group<T>(ctrls);

@Component({
  selector: 'angular-libs-best-practices-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  settingService = inject(SettingsService);

  checkoutForm = initFrm({
    title: ['', Validators.required],
    status: '',
  }); // automatic infer Typed Form

  onSubmit(): void {
    this.settingService.updateTitle(this.checkoutForm.value.title ?? '');
    if (this.checkoutForm.value.status)
      this.settingService.updateStatus(this.checkoutForm.value.status ?? '');
  }
}
