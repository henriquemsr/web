import { CurrencyPipe, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { TaskService } from '../service/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-tasks',
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter(), CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks implements OnInit {
  customer!: any;
  form!: FormGroup;
  value: number = 0;
  private fb = inject(FormBuilder);
  public readonly activeRoute = inject(ActivatedRoute);
  public readonly service = inject(CustomerService);
  public readonly taskService = inject(TaskService);
  public readonly back = inject(Location);
  private _snackBar = inject(MatSnackBar);
  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id')!;
    this.activeRoute.params.subscribe(params => {
      console.log(params);

    })
    this.getCustomer(id);
    this.form = this.fb.group({
      task_name: ['', [Validators.required]],
      value: ['', [Validators.required]],
      date: ['', [Validators.required]],
      id_user: ['', [Validators.required]],
    });
  }

  currencyToNumber(value: string): number {
    if (!value) return 0;

    return Number(
      value.replace(/\D/g, '')
        .replace(',', '.')
    ) / 100;
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

  getCustomer(id: string) {
    this.service.getCustomerId(id).subscribe((res: any) => {
      console.log(res);
      this.customer = res.data
      console.log(this.customer);
    })
  }

  save() {
    const formDate = new Date(this.form.get("date")?.value);
    const today = new Date();
    if (formDate < today) {
      this._snackBar.open(
        "Data precisa ser maior que hoje!",
        "Fechar",
        {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        }
      ).onAction().subscribe(() => {
        this._snackBar.dismiss();
      });
     return
    }

    

    console.log(this.form.value);
    const formattedValue = this.form.value.value;
    const numericValue = this.currencyToNumber(formattedValue); // 50.00
    console.log(numericValue);

    const payload = {
      ...this.form.value,
      value: numericValue,
      id_user: this.customer._id,
      name_tutor: this.customer.name
    };

    this.taskService.registerTask(payload).subscribe(res => {
      console.log(res);
      this.form.reset();
      this._snackBar.open(
        "Agenda registrada com sucesso!",
        "Fechar",
        {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        }
      ).onAction().subscribe(() => {
        this._snackBar.dismiss();
      });
      this.goBack();
    },
      e => {
        console.log(e);
      })

  }
  goBack() {
    this.back.back()
  }

}
