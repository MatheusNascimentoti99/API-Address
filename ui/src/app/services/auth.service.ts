import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/interface/User';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  login(username: string, password: string) {
    return this.httpClient.post<{ token: string, user: User }>('api/auth', {
      name: username,
      password
    }, {
    }).pipe(tap(response => {
      if (response.token) {
        localStorage.setItem('user', JSON.stringify(response.user))
        localStorage.setItem('token', response.token);
      }
    }))
  }

  register(name: string, password: string) {
    return this.httpClient.post('api/register', { name, password });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    return (JSON.parse(localStorage.getItem('user') ?? '') as User);
  }
}
