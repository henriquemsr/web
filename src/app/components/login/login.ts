import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  form!: FormGroup;
  private fb = inject(FormBuilder);
  private service = inject(LoginService);
  private router = inject(Router);
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;

    this.service.login(email, password).subscribe({
      next: (res) => {
        console.log('Sucesso!', res)
        this.router.navigate(['dash'])
      },
      error: (err) => console.error('Erro ao logar', err),
    });
  }

}
