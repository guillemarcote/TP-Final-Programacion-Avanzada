import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

login() {
  if (this.username === 'admin' && this.password === 'admin') {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('role', 'admin');
    this.router.navigate(['/productos']);
  } else if (this.username === 'comprador' && this.password === 'comprador') {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('role', 'comprador');
    this.router.navigate(['/productos']);
  } else {
    this.error = 'Usuario o contraseña incorrectos';
  }
}

}
