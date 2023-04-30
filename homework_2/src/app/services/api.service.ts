import { ISelectedUser } from './../user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../user';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API_url = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) {}

  getUsers_API(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.API_url).pipe((error) => {
      return error;
    });
  }
  deleteUsers_API(user: IUser): Observable<IUser> {
    return this.http
      .delete<IUser>(`${this.API_url}/${user.id}`)
      .pipe((value) => {
        return value;
      });
  }

  addUser_API(user: IUser): Observable<IUser> {
    return this.http
      .post<IUser>(this.API_url, user, httpOptions)
      .pipe((error) => {
        return error;
      });
  }
}
