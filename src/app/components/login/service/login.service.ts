import { inject, Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public readonly user!: UserModel;
  private service = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/auth/login';

  public login(email: string, password: string): Observable<UserModel> {
    const body = { email, password };

    return this.service.post<UserModel>(this.apiUrl, body).pipe(
      tap((response) => {
        // Salva o token no LocalStorage
        localStorage.setItem('token', response.token);
      })
    );
  }

}
