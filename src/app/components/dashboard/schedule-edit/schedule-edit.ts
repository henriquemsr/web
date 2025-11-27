import { CurrencyPipe, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../service/task.service';
import { TaskModel } from '../models/task.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import Swal from 'sweetalert2'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-schedule-edit',
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter(), CurrencyPipe],
  templateUrl: './schedule-edit.html',
  styleUrl: './schedule-edit.scss',
})
export class ScheduleEdit implements OnInit {
  back = inject(Location);
  route = inject(ActivatedRoute);
  service = inject(TaskService)
  schedule!: any;
  form!: FormGroup;
  value: number = 0;
  private _snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      console.log(p);
      this.getSchedule(p.id);
      this.form = this.fb.group({
        task_name: ['', [Validators.required]],
        value: ['', [Validators.required]],
        date: ['', [Validators.required]],
        id_user: ['', [Validators.required]],
      });
    })
  }
  goBack() {
    this.back.back();
  }

  getSchedule(id: string) {
    this.service.getScheduleById(id).subscribe((res: any) => {
      console.log(res);
      this.schedule = res.result
      this.form.get("task_name")?.setValue(this.schedule.task_name);
      this.form.get("value")?.setValue(this.schedule.value);
      this.form.get("date")?.setValue(this.schedule.date);
    })
  }
  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });
  }
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;

    // Mantém somente números
    const numeric = input.value.replace(/\D/g, '');
    const number = Number(numeric) / 100;

    input.value = this.formatCurrency(number);

    this.form.get('value')?.setValue(input.value, { emitEvent: false });
  }
  currencyToNumber(value: any): number {
  if (!value) return 0;

  // Converte número para string no padrão BR
  if (typeof value === 'number') {
    value = value.toString().replace('.', ',');
  }

  return Number(
    value.replace(/\D/g, '').replace(',', '.')
  ) / 100;
}
  edit() {
    const formattedValue = this.form.get('value')?.value;
    const numericValue = this.currencyToNumber(formattedValue); // 50.00
    const payload = {
      ...this.form.value,
      value: numericValue,
    };

    this.service.editScheduleById(this.schedule._id, payload).subscribe(res => {
      console.log(res);
       this._snackBar.open(
        "Registro atualizado com sucesso!",
        "Fechar",                        
        {
          duration: 5000,                
          horizontalPosition: 'right',   
          verticalPosition: 'top',       
        }
      ).onAction().subscribe(() => {
        this._snackBar.dismiss();        
      });
    }, e => {
      console.log(e);
     
    })

  }
}
