// src/app/components/productos/productos.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto, ProductoService } from '../../services/producto/producto.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto.html',
  styleUrls: ['./producto.css'],
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productosPagina: Producto[] = [];
  cargando = false;
  error: string | null = null;

  carrito: any[] = [];
  defaultImage = 'https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/o-que-e-produto-no-mix-de-marketing-1024x538.png.webp';

  // Paginación
  paginaActual = 1;
  productosPorPagina = 5;
  totalPaginas = 1;

  productoModel: Producto = { nombre: '', descripcion: '', precio: 0, stock: 0 };
  editando = false;

  constructor(private productoService: ProductoService, private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.cargando = true;
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.totalPaginas = Math.ceil(this.productos.length / this.productosPorPagina);
        this.cambiarPagina(1);
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error cargando productos';
        this.cargando = false;
      },
    });
  }

  cambiarPagina(pagina: number) {
    if (pagina < 1) pagina = 1;
    if (pagina > this.totalPaginas) pagina = this.totalPaginas;

    this.paginaActual = pagina;

    const inicio = (pagina - 1) * this.productosPorPagina;
    const fin = inicio + this.productosPorPagina;
    this.productosPagina = this.productos.slice(inicio, fin);
  }

  // Métodos editarProducto, guardarProducto, eliminarProducto, limpiarFormulario quedan igual...
  editarProducto(producto: Producto) {
    this.productoModel = { ...producto };
    this.editando = true;
  }

  guardarProducto() {
    if (this.editando && this.productoModel.id != null) {
      this.productoService.editarProducto(this.productoModel.id, this.productoModel).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.cargarProductos();
        },
        error: () => (this.error = 'Error al actualizar producto'),
      });
    } else {
      this.productoService.agregarProducto(this.productoModel).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.cargarProductos();
        },
        error: () => (this.error = 'Error al agregar producto'),
      });
    }
  }

  eliminarProducto(id: number | undefined) {
    if (id == null) return;
    if (confirm('¿Estás seguro que querés eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe({
        next: () => this.cargarProductos(),
        error: () => (this.error = 'Error al eliminar producto'),
      });
    }
  }

  limpiarFormulario() {
    this.productoModel = { nombre: '', descripcion: '', precio: 0, stock: 0 };
    this.editando = false;
    this.error = null;
  }


  agregarAlCarrito(producto: any): void {
    this.carrito.push(producto);
  }

  getTotalCarrito(): number {
    return this.carrito.reduce((total, item) => total + parseFloat(item.precio), 0);
  }

  vaciarCarrito(): void {
    this.carrito = [];
  }

  quitarDelCarrito(index: number): void {
    this.carrito.splice(index, 1);
  }

comprar() {
  this.productoService.comprarProductos(this.carrito).subscribe({
    next: () => {
      alert('¡Compra realizada con éxito!');
      this.vaciarCarrito();
      this.cargarProductos(); // refrescar lista con stock actualizado
    },
    error: (err) => {
      console.error(err);
      alert('Ocurrió un error al realizar la compra.');
    }
  });
}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}