import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../service/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private _snackBar = inject(MatSnackBar);

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
      this._snackBar.open(
        "Registro efetuado com sucesso!",
        "Fechar",                        
        {
          duration: 5000,                
          horizontalPosition: 'right',   
          verticalPosition: 'top',       
        }
      ).onAction().subscribe(() => {
        this._snackBar.dismiss();        
      });
    })
  }
}
