import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';
@Component({
  selector: 'app-view-customer',
  imports: [MatButtonModule],
  templateUrl: './view-customer.html',
  styleUrl: './view-customer.scss',
})
export class ViewCustomer implements OnInit {
  customer!: any;
  public readonly service = inject(CustomerService);
  public readonly activeRoute = inject(ActivatedRoute);
  public readonly back = inject(Location);
  public route = inject(Router);
  
  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id')!;
    this.getCustomer(id)
  }
  getCustomer(id: string) {
    this.service.getCustomerId(id).subscribe((res: any) => {
      console.log(res);
      this.customer = res.data

    })
  }

  goTasks(){
    this.route.navigate([`/dash/tasks/${this.customer._id}`])
  }
  goback() {
    this.back.back();
  }
}
