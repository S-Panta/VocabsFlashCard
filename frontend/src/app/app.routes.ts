import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './features/authentication/signup/signup.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { FlashcardComponent } from './features/flashcard/flashcard.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'flashcard', component: FlashcardComponent },
];
