import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { CustomerModel } from '../models/customer.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-view-customer',
  imports: [MatButtonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './view-customer.html',
  styleUrl: './view-customer.scss',
})
export class ViewCustomer implements OnInit {
  customer!: CustomerModel;
  public readonly service = inject(CustomerService);
  public readonly activeRoute = inject(ActivatedRoute);
  public readonly back = inject(Location);
  public route = inject(Router);
  showButton = false;
  showEditCustomer = false;
  form!: FormGroup;
  private fb = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id')!;
    this.getCustomer(id);
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      pet_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }
  getCustomer(id: string) {
    this.service.getCustomerId(id).subscribe((res: any) => {
      console.log(res);
      this.customer = res.data
      this.form.get("name")?.setValue(this.customer.name)
      this.form.get("pet_name")?.setValue(this.customer.pet_name)
      this.form.get("phone")?.setValue(this.customer.phone)
    })
  }

  goTasks() {
    this.route.navigate([`/dash/tasks/${this.customer._id}`])
  }
  goback() {
    this.back.back();
  }

  showDelete() {
    this.showButton = !this.showButton;
    this.showEditCustomer = false
  }
  showCustomerEdit() {
    this.showEditCustomer = !this.showEditCustomer;
    this.showButton = false;
  }
  edit() {
    this.service.updateCustomerId(this.customer._id, this.form.value).subscribe(()=>{
      this._snackBar.open(
        "Registro alterado com sucesso!",
        "Fechar",                        
        {
          duration: 5000,                
          horizontalPosition: 'right',   
          verticalPosition: 'top',       
        }
      ).onAction().subscribe(() => {
        this._snackBar.dismiss();        
      });
      this.goback();
    })
  }
}
