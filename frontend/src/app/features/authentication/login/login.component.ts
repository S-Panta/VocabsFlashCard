import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm: any;

constructor(private formBuilder: FormBuilder) { }

ngOnInit(): void {
  this.loginForm = this.formBuilder.group({
    email: [''],
    password: ['']
  });

}
login() {
throw new Error('Method not implemented.');
}

}
