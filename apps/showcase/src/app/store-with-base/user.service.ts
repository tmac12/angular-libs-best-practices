import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserData {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  getUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>('/assets/userData.json');
  }
}
