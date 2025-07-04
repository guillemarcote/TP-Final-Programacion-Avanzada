import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}productos/`);
  }

  // Opcionales para agregar/editar/eliminar después
  agregarProducto(producto: Producto) {
    return this.http.post<Producto>(`${this.apiUrl}productos/`, producto);
  }

  editarProducto(id: number, producto: Producto) {
    return this.http.put<Producto>(`${this.apiUrl}productos/${id}/`, producto);
  }

  eliminarProducto(id: number) {
    return this.http.delete(`${this.apiUrl}productos/${id}/`);
  }

  comprarProductos(carrito: Producto[]): Observable<any> {
    return this.http.post(`${this.apiUrl}comprar/`, carrito);
  }
}
