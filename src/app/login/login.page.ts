import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = {
    usuario: '',
    password: ''
  };

  constructor(private router: Router) { }

  ingresar() {
    if (this.user.usuario.length >= 3 && this.user.usuario.length <= 8 && this.user.password.length === 4) {
      const navigationExtras: NavigationExtras = {
        state: {
          user: this.user
        }
      };
      this.router.navigate(['/home'], navigationExtras);
    } else {
      alert('Campos no son validos');
    }
  }
}