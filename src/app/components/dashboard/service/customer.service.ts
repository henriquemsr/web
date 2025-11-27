import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CustomerModel } from '../models/customer.model';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/customers';
  customers = signal<CustomerModel[]>([]);
  loading = signal<boolean>(false);
  search = signal<string>('');
  page = signal<number>(1);
  limit = signal<number>(12);
  totalResults = signal<number>(0);
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      })
    };
  }
  loadCustomers() {
    this.loading.set(true);

    return this.http.get<CustomerModel[]>(
      `${this.apiUrl}?page=${this.page()}&limit=${this.limit()}&search=${this.search()}`,
      this.getAuthHeaders()
    )
      .pipe(
        tap((result: any) => {
          this.customers.set(result.customers);
          this.totalResults.set(result.totalResults);
          this.loading.set(false);
        })
      )
      .subscribe();
  }
  setSearch(value: string) {
    this.search.set(value);
    this.page.set(1);
    this.loadCustomers();
  }

  setPage(event: any) {
    this.page.set(event.pageIndex + 1); // paginator começa em 0
    this.limit.set(event.pageSize);
    this.loadCustomers();
  }
  /** 📌 Buscar a lista de clientes */

  public getCustomerId(id: string): Observable<CustomerModel> {
    return this.http.get<CustomerModel>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  /** 📌 Registrar cliente */
  public registerCustomer(customer: CustomerModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, customer, this.getAuthHeaders());
  }
  public updateCustomerId(id: string, customer: CustomerModel): Observable<CustomerModel> {
    return this.http.put<CustomerModel>(`${this.apiUrl}/${id}`, customer, this.getAuthHeaders());
  }

  public deleteCustomerId(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getAuthHeaders()).pipe(tap((result) => {
      console.log(result);
    }))
  }
  scheduleId(id: string): Observable<any> {
    return this.http.get<TaskModel[]>(`${this.apiUrl}/${id}`, this.getAuthHeaders())
  }
}
