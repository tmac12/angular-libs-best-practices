import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FakeData {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class FakeDataService {
  http = inject(HttpClient);

  getFakeDataErrors(): Observable<string[]> {
    return this.http.get<string[]>('/fakerror.json');
  }
  getFakeDatas(): Observable<string[]> {
    return this.http.get<string[]>('/assets/fakedata.json');
  }
  getFakeDatasTyped(): Observable<FakeData[]> {
    return this.http.get<FakeData[]>('/assets/fakedata.json');
  }
}
