import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  signup() {
    throw new Error('Method not implemented.');
  }

}
