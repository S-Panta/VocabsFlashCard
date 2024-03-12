/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, type OnInit } from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { AuthService } from '../../../services/auth.service'
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
    this.authService.logout()
  }

  login (): void {
    const username: string = this.loginForm.get('username').value
    const password: string = this.loginForm.get('password').value
    this.authService.login(username, password).subscribe({
      next: (data: any) => {
        localStorage.getItem('token')
        // add router to redirect
        // this.router.navigate(['signup']);
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
