/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, OnInit } from '@angular/core'
import { ReactiveFormsModule, FormBuilder } from '@angular/forms'
import { AuthService } from '../../../services/auth.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm: any

  constructor (
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router) { }

  ngOnInit (): void {
    this.signupForm = this.formBuilder.group({
      username: [''],
      email: [''],
      password: [''],
      confirm_password: ['']
    })
  }

  signup (): void {
    const username: string = this.signupForm.get('username').value
    const email: string = this.signupForm.get('email').value
    const password: string = this.signupForm.get('password').value
    const confirmPassword: string = this.signupForm.get('confirm_password').value
    this.authService.signup(username, email, password, confirmPassword).subscribe({
      next: data => {
        void this.router.navigate(['/login'])
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
