import { ChangeDetectorRef, Component,inject,OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TablaProductos } from '../tabla-productos/tabla-productos';
import { ProductoService } from '../producto-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatSelectModule,TablaProductos],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  private productoService = inject(ProductoService);
  private cdr = inject(ChangeDetectorRef);

  productosEnPantalla: any[] = [];
  productosOriginales: any[] = [];


  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (productos) => {
        this.productosEnPantalla = productos;
        this.productosOriginales = productos;
        
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  filtrarPorCategoria(categoria: string) {
    if(categoria === 'Todas') {
      this.productosEnPantalla = this.productosOriginales;
    } else {
      this.productosEnPantalla = this.productosOriginales.filter(p => p.categoria === categoria && p.categoria.trim().toLowerCase() === categoria.trim().toLowerCase()
    );
    }
        
}
}
