import { Component, inject, OnInit, signal } from '@angular/core';
import { CustomerService } from '../service/customer.service';

import { CustomerModel } from '../models/customer.model'
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-customers',
  imports: [MatCardModule,MatIconModule,MatInputModule,MatFormFieldModule,FormsModule, CommonModule, MatButtonModule, MatTableModule, MatListModule, MatPaginatorModule],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers implements OnInit {

  public service = inject(CustomerService)
  public list!: CustomerModel[];
  public route = inject(Router);
  page = 1;
  limit = 12;
  totalResults = 0;
  search = "";

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.service.getListCustomer(this.page, this.limit, this.search).subscribe(
      (res: any) => {
        this.list = res.customers
        this.totalResults = res.totalResults;
        console.log(res.customers);

      }
    )
  }
  goToCustomers(id: string) {
    console.log(id);
    this.route.navigate([`/dash/view-customer/${id}`])
  }
  goToTasks(id: string) {
    console.log(id);
    this.route.navigate([`/dash/tasks/${id}`])
  }
  onPageChange(event: any) {
    this.page = event.pageIndex + 1; // Angular pageIndex começa em 0
    this.limit = event.pageSize;
    this.getList();
  }
  searching(event: any) {
  this.search = event.target.value;
  this.getList(); // chama o método que busca a lista no backend
}
}
