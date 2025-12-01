import { inject, Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user!: UserModel;
  private service = inject(HttpClient);
  private route = inject(Router)
  private apiUrl = 'http://localhost:3000/auth/login';
  private apiUser = 'http://localhost:3000';
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      })
    };
  }
  public login(email: string, password: string): Observable<UserModel> {
    const body = { email, password };

    return this.service.post<UserModel>(this.apiUrl, body).pipe(
      tap((response) => {
        // Salva o token no LocalStorage
        localStorage.setItem('token', response.token);
      })
    );
  }

  public getUser(id: string): Observable<UserModel> {
    return this.service.get<UserModel>(`${this.apiUser}/user/${id}`, this.getAuthHeaders()).pipe(tap((res:any) => {
      this.user = res.user
    }))

  }


  public logout() {
    localStorage.clear();
    this.route.navigate(['/login'])
  }

}
