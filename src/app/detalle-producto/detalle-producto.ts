import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Producto, ProductoService } from '../producto-service';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './detalle-producto.html'
})
export class DetalleProducto implements OnInit{
  productoSeleccionado: Producto | undefined;

  constructor(private route: ActivatedRoute,
    private productoService: ProductoService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const productoEnviado = history.state?.producto as Producto | undefined;

    if (productoEnviado) {
      this.productoSeleccionado = productoEnviado;
    } else if (id) {
      this.productoService.obtenerProductoPorId(id).subscribe({
        next: (producto) => {
          this.productoSeleccionado = producto;
        },
        error: (error) => {
          console.error('Error al obtener producto:', error);
        }
      });
    }
  }
}