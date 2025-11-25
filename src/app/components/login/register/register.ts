import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
form!: FormGroup;
  private fb = inject(FormBuilder);
  private service = inject(RegisterService);
  private router = inject(Router);
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]],

    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.service.register(this.form.value).subscribe({
      next: (res) => {
        console.log('Sucesso!', res)
        this.router.navigate(['login'])
      },
      error: (err) => console.error('Erro ao logar', err),
    });
  }

}
