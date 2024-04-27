/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component } from '@angular/core'
import { AuthService } from '../../api/services/auth.service'
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor (private readonly authService: AuthService) {}
  logout (): void {
    this.authService.logout()
  }
}