import { Routes } from '@angular/router';
import { Home } from './home/home';
import { DetalleProducto } from './detalle-producto/detalle-producto';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'detalle-producto/:id', component: DetalleProducto},
    {path: 'producto/:id', component: DetalleProducto},
    {path: 'dashboard', component: Dashboard},


];
