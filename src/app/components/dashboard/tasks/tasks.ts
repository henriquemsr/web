import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks implements OnInit {
  customer!: any;
  public readonly activeRoute = inject(ActivatedRoute);
  public readonly service = inject(CustomerService);
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

}
