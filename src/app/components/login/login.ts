import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from './service/login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  form!: FormGroup;
  private fb = inject(FormBuilder);
  private service = inject(LoginService);
  private router = inject(Router);
  showButton = false;
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.showButton = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;

    this.service.login(email, password).subscribe({
      next: (res:any) => {
        console.log('Sucesso!', res)
        localStorage.setItem("id", res.id_user)
        this.router.navigate(['dash'])
        this.showButton = false;
      },
      error: (err) => console.error('Erro ao logar', err),
    });
  }

}
