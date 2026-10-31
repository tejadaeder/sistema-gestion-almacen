import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

export interface Producto {
    id: string;
    nombre: string;
    categoria: string;
    stock: number;
    precio?: number;
    valor_inventario?: number;
    estado_stock: string;
}

@Injectable({providedIn: 'root'})
export class ProductoService {

    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:5000/api/productos';


  obtenerProductos(): Observable<Producto[]> {
  return this.http.get<Producto[]>(this.apiUrl);
}

obtenerProductoPorId(id: string): Observable<Producto | undefined> {
  return this.obtenerProductos().pipe(
  map(productos => productos.find(producto =>
    String(producto.id).trim().toLowerCase() === String(id).trim().toLowerCase()
  ))
);
}
}