import { Routes } from '@angular/router';
import { LoginComponent } from './login';
import { ProductosComponent } from './components/producto/producto';
import { AuthGuard } from './services/auth/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
];
