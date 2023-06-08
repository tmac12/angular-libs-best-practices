import { Injectable, signal } from '@angular/core';
export interface WidgetData {
  title: string;
  items: Array<WidgetItem>;
}

export interface WidgetItem {
  description: string;
  value: string;
}

const FAKE_WIDGET_DATA: WidgetData = {
  title: 'title',
  items: [
    {
      description: 'Card #',
      value: '1',
    },
    {
      description: 'Detail',
      value: 'This is a detail row',
    },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  widgetData = signal({} as WidgetData);

  public loadData() {
    const all = FAKE_WIDGET_DATA;
    this.widgetData.set(all);
  }

  public getAll() {
    return FAKE_WIDGET_DATA;
  }

  public update(newData: WidgetData) {
    this.widgetData.update((w) => {
      return { ...w, title: newData.title, items: newData.items };
    });
  }

  public updateTitle(newTitle: string) {
    this.widgetData.update((w) => {
      return { ...w, title: newTitle };
    });
  }

  public updateStatus(newStatus: string) {
    this.widgetData.update((w) => {
      const statusItem = w.items[0];
      // statusItem.description = 'ho cambiato description';
      statusItem.value = newStatus;
      return { ...w, items: w.items };
    });
  }
}
