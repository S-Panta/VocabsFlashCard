/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, type OnInit } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../../api/services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  loginForm: any

  constructor (private readonly formBuilder: FormBuilder, private readonly authService: AuthService, private readonly router: Router) { }

  ngOnInit (): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    })
  }

  login (): void {
    const username: string = this.loginForm.get('username').value
    const password: string = this.loginForm.get('password').value
    this.authService.login(username, password).subscribe({
      next: (data: any) => {
        localStorage.getItem('token')
        this.router.navigate(['home'])
      },
      error: err => {
        throw new Error(err)
      }
    })
  }
}
