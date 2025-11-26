import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TaskModel } from '../models/task.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/task';

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      })
    };
  }

  public registerTask(task: TaskModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, task, this.getAuthHeaders());
  }

  public getListSchedule(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${this.apiUrl}`, this.getAuthHeaders());
  }
  public getScheduleById(id: string): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
  public editScheduleById(id: string, body: TaskModel): Observable<TaskModel[]> {
    return this.http.put<TaskModel[]>(`${this.apiUrl}/${id}`, body, this.getAuthHeaders());
  }
}
