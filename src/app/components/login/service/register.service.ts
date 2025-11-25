import { inject, Injectable, signal } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  user = signal<UserModel | null>(null)
  private service = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/auth/register';

  public register(body:UserModel): Observable<UserModel> {
    

    return this.service.post<UserModel>(this.apiUrl, body).pipe(
      tap((response) => {
        this.user.set(response)
        
      })
    );
  }
}
