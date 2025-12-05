import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../service/task.service';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-view-dash',
  imports: [MatCardModule, MatButtonModule, CurrencyPipe, RouterLink],
  templateUrl: './view-dash.html',
  styleUrl: './view-dash.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewDash implements OnInit {

  resultsTaks: any;
  public readonly serviceTask = inject(TaskService);
  public readonly serviceCustomer = inject(CustomerService);
  public readonly route = inject(Router);
  totalCustomer!: number;
  totals!: any;
  schedule!:any;

  ngOnInit() {
    this.getResults();
  }

  getResults() {
    this.serviceTask.getResultTasks().subscribe(res => {
      this.resultsTaks = res
      console.log(res);
      this.getTotalCustomer();
      this.getTotal();
      this.getDashResults();
    });
  }
  goSchedule(n?: number) {
    this.route.navigate([`/dash/schedule/${n}`])
  }

  getTotalCustomer() {
    this.serviceCustomer.loadCustomers().subscribe();
  }

  getTotal() {
    this.serviceTask.getTotal().subscribe(res => {
      this.totals = res;
    })
  }

  getDashResults() {
    this.serviceTask.getSumaryPayments().subscribe(res => {
      console.log(res);
      this.schedule = res;
    },
      e => {
        console.log(e);
      })
  }

  goCustomer(){
    this.route.navigate(['/dash/customer'])
  }

}
