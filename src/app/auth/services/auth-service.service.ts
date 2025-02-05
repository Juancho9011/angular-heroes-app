import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { User } from '../interface/User.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environments.baseUrl

  private user?: User

  constructor(private http: HttpClient) { }

  get currentUser(): User | undefined {

    if (!this.user) {

      return undefined

    }
    return structuredClone(this.user)
  }



  login(username: string, password: string): Observable<User> {

    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => {
        this.user = user
        localStorage.setItem("token", user.id.toString())
        return this.user
      }))

  }


  logout(): boolean {

    console.log("chao");

    this.user = undefined
    localStorage.clear()

    return true

  }


  checkAutentication(): Observable<boolean> {

    if (!localStorage.getItem('token')) {
      return of(false)
    }

    const token = localStorage.getItem('token')

    return this.http.get<User>(`${this.baseUrl}/users/${token}`).pipe(
      tap(data => { this.user = data; return this.user }),
      map(data => { return !!data.id }),
      catchError((e) => {
        console.error("... ", e);
        return of(false)
      })
    )
  }
}
