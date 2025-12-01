import { CurrencyPipe, DatePipe, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { CustomerModel } from '../models/customer.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../service/task.service';
@Component({
  selector: 'app-view-customer',
  imports: [MatButtonModule, ReactiveFormsModule, MatInputModule, DatePipe, CurrencyPipe],
  templateUrl: './view-customer.html',
  styleUrl: './view-customer.scss',
})
export class ViewCustomer implements OnInit {
  customer!: CustomerModel;
  public readonly service = inject(CustomerService);
  public readonly serviceTask = inject(TaskService);
  public readonly activeRoute = inject(ActivatedRoute);
  public readonly back = inject(Location);
  public route = inject(Router);
  showButton = false;
  showEditCustomer = false;
  form!: FormGroup;
  private fb = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);
  showSchedule = false;

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id')!;
    this.getCustomer(id);
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      pet_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      raca: ['', [Validators.required]],
      idade: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
    });
  }
  getCustomer(id: string) {
    this.service.getCustomerId(id).subscribe((res: any) => {
      console.log(res);
      this.customer = res.data
      this.form.get("name")?.setValue(this.customer.name)
      this.form.get("pet_name")?.setValue(this.customer.pet.name)
      this.form.get("phone")?.setValue(this.customer.phone)
      this.form.get("peso")?.setValue(this.customer.pet.peso)
      this.form.get("raca")?.setValue(this.customer.pet.raca)
      this.form.get("idade")?.setValue(this.customer.pet.idade)
      this.form.get("sexo")?.setValue(this.customer.pet.sexo)
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
    this.showSchedule = false;

  }
  showCustomerEdit() {
    this.showEditCustomer = !this.showEditCustomer;
    this.showButton = false;
    this.showSchedule = false;
  }


  edit() {
    const body = {
      _id: this.customer._id,
      name: this.form.get("name")?.value,
      phone: this.form.get("phone")?.value,
      pet: {
        name: this.form.get("pet_name")?.value,
        peso: this.form.get("peso")?.value,
        raca: this.form.get("raca")?.value,
        idade: this.form.get("idade")?.value,
        sexo: this.form.get("sexo")?.value,
      }
    }
    this.service.updateCustomerId(this.customer._id, body).subscribe(() => {
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

  deleteCustomer() {
    this.service.deleteCustomerId(this.customer._id).subscribe(res => {
      this._snackBar.open(
        "Cliente deletado com sucesso!",
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
    },
      e => {
        this._snackBar.open("Erro ao deletar cliente", "Fechar", { duration: 3000 });
      })
  }
  viewSchedule() {
    this.showSchedule = true;
    this.showButton = false;
    this.showEditCustomer = false;
    console.log(this.customer._id);
    this.serviceTask.getScheduleByIdCustomer(this.customer._id).subscribe(
      () => {
        console.log(this.serviceTask.scheduleClient());
      }
    );



  }
}
