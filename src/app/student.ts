import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface ApiUser {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class Student {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  getStudents(): Observable<{ id: number; name: string; score: number }[]> {
    return this.http.get<ApiUser[]>(this.apiUrl).pipe(
      map((users) =>
        users.map((user) => ({
          id: user.id,
          name: user.name,
          // the mock API has no score field, so we fake one
          score: Math.floor(Math.random() * 41) + 60,
        }))
      )
    );
  }

  getStudentById(id: number) {
    return this.http.get<ApiUser>(`${this.apiUrl}/${id}`).pipe(
      map((user) => ({
        id: user.id,
        name: user.name,
        score: Math.floor(Math.random() * 41) + 60,
      }))
    );
  }
}
 