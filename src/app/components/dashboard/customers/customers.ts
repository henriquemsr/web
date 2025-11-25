import { Component, inject, OnInit, signal } from '@angular/core';
import { CustomerService } from '../service/customer.service';

import { CustomerModel } from '../models/customer.model'
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-customers',
  imports: [MatCardModule, CommonModule, MatButtonModule,MatTableModule,MatListModule],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers implements OnInit {

  public service = inject(CustomerService)
  public list!: CustomerModel[];
  public route = inject(Router);

  ngOnInit() {
    this.getLsit();
  }

  getLsit() {
    this.service.getListCustomer().subscribe(
      (res: any) => {
        this.list = res.customers
        console.log(res.customers);

      }
    )
  }
  goToCustomers(id: string) {
    console.log(id);
    this.route.navigate([`view-customer/${id}`])
  }
  goToTasks(id: string) {
    console.log(id);
    this.route.navigate([`tasks/${id}`])
  }
}
