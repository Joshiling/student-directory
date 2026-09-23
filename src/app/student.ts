import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface ApiUser {
  id: number;
  name: string;
  score:number,
  favourite:boolean
}


  



@Injectable({
  providedIn: 'root',
})
export class Student {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5295/Student';


  getStudents(): Observable<{ id: number; name: string; score: number }[]> {
    return this.http.get<ApiUser[]>(this.apiUrl).pipe(
      map((users) =>
        users.map((user) => ({
          id: user.id,
          name: user.name,
          // the mock API has no score field, so we fake one
          score: user.score,
          favourite:user.favourite
        }))
      )
    );
  }

  getStudentById(id: number) {
    return this.http.get<ApiUser>(`${this.apiUrl}/${id}`).pipe(
      map((user) => ({
        id: user.id,
        name: user.name,
        score: user.score,
        favourite:user.favourite
      }))
    );
  }

  addStudent(name:String, score:number){
    return this.http.post<ApiUser>(`${this.apiUrl}`,{"name":name, "score":score});
  }

  toggleFavourite(id:number){
    return this.http.put<ApiUser>(`${this.apiUrl}/${id}/favourite`,{});
  }
}
 