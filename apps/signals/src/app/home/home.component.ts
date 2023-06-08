import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../state/settings.service';
import { DynamicWidgetComponent } from '../dynamicWidget/dynamic-widget.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'angular-libs-best-practices-home',
  standalone: true,
  imports: [CommonModule, DynamicWidgetComponent, SettingsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  settingsService = inject(SettingsService);
  //backgroundColor = 'yellow';
  //backgroundColor = signal('yellow');
  backgroundColor = computed(() =>
    this.settingsService.widgetData().title == 'red' ? 'red' : 'yellow'
  ); //infer Signal<boolean>

  //widgetData = signal<WidgetData>({} as WidgetData);

  //carica i dati da un servizio e converte l'observable in signal
  // widgetData = toSignal(this.settingsService.getAll(), {
  //   initialValue: {} as WidgetData,
  // });

  constructor() {
    effect(() => {
      //VIENE RICALCOLATO AUTOMATICAMENTE + NOTATE () PER LEGGERE VALORE
      console.log(`Now title is ${this.settingsService.widgetData().title}`);
    });

    this.settingsService.loadData();
    // const widgetResult = this.settingsService.getAll();
    // this.widgetData.set(widgetResult); //converto il dato in un signal
  }
}
