import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-register-customer',
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './register-customer.html',
  styleUrl: './register-customer.scss',
})
export class RegisterCustomer implements OnInit {
  back = inject(Location);
  form!: FormGroup;
  private fb = inject(FormBuilder);
  public service = inject(CustomerService);

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      pet_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }
  goBack() {
    this.back.back();
  }

  save() {
    this.service.registerCustomer(this.form.value).subscribe(res => {
      console.log(res);
      this.form.reset();
    })
  }
}
