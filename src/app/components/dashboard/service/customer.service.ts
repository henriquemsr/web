import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/customers';

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      })
    };
  }

  /** 📌 Buscar a lista de clientes */
  public getListCustomer(page:number, limit:number,search:string): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(`${this.apiUrl}?page=${page}&limit=${limit}&search=${search}`, this.getAuthHeaders());
  }
  public getCustomerId(id: string): Observable<CustomerModel> {
    return this.http.get<CustomerModel>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  /** 📌 Registrar cliente */
  public registerCustomer(customer: CustomerModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, customer, this.getAuthHeaders());
  }
  public updateCustomerId(id: string, customer:CustomerModel): Observable<CustomerModel> {
    return this.http.put<CustomerModel>(`${this.apiUrl}/${id}`,customer, this.getAuthHeaders());
  }
}
