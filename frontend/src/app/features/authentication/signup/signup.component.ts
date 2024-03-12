/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, OnInit } from '@angular/core'
import { ReactiveFormsModule, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm: any

  constructor (private readonly formBuilder: FormBuilder) { }

  ngOnInit (): void {
    this.signupForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  signup (): Error {
    throw new Error('Method not implemented.')
  }
}
