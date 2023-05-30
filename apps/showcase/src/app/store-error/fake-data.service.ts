import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
