import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './features/authentication/signup/signup.component';
import { LoginComponent } from './features/authentication/login/login.component';

export const routes: Routes = [
  {
    path: '', component: AppComponent
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
];
