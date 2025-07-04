import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Verifica si hay sesión activa
  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  // Devuelve el rol actual (admin o comprador)
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Verifica si el usuario es admin
  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  // Verifica si el usuario es comprador
  isComprador(): boolean {
    return this.getRole() === 'comprador';
  }

  // Cierra sesión
  logout(): void {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('role');
  }
}
