import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tabla-productos',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,MatChipsModule,RouterLink],
  templateUrl: './tabla-productos.html',
  styleUrl: './tabla-productos.css',
})
export class TablaProductos {

  @Input() set lista(value: any[]) {
    this.dataSource.data = value;
  }

  columnas: string[] = ['id', 'nombre', 'categoria', 'stock','precio','valor_inventario','acciones'];
  dataSource = new MatTableDataSource<any>([]);

}
