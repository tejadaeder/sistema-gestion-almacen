import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProductoService } from '../producto-service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements AfterViewInit {

  @ViewChild('graficoBarras') barrasRef!: ElementRef;
  @ViewChild('graficoTorta') tortaRef!: ElementRef;
  @ViewChild('graficoLineas') lineasRef!: ElementRef;

  chartBarras: any;
  chartTorta: any;
  chartLineas: any;

  constructor(private productoService: ProductoService) {
  }

  ngAfterViewInit(): void {
     
    this.productoService.obtenerProductos().subscribe({
      next: (productos) => {
    this.dibujarGraficoBarras(productos);
    this.dibujarGraficoTorta(productos);
    this.dibujarGraficoLineas();
  },
  error: (error) => {
    console.error('Error al obtener productos:', error);
  }
    });
  }

  dibujarGraficoBarras(productos: any[]){
    const categorias = ['Ferretería','Electricidad','Pinturas','Construcción','Seguridad Industrial'];
    const stockPorCategoria = categorias.map(cat => {
      return productos.filter(p => p.categoria === cat)
      .reduce((suma,p)=> suma + p.stock,0);
    })

    this.chartBarras = new Chart(this.barrasRef.nativeElement, {
      type: 'bar',
      data: {
        labels: categorias,
        datasets: [{
          label: 'Unidades',
          data: stockPorCategoria,
          backgroundColor: ['#3f51b5', '#ff4081', '#4caf50', '#ff9800', '#b02727'],
          borderRadius: 6
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }

  dibujarGraficoTorta(productos: any[]){
    const cantBajoStock = productos.filter(p => p.stock < 20).length;
    const cantStockBueno = productos.length- cantBajoStock;

    this.chartTorta = new Chart(this.tortaRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Stock Crítico', 'Stock Saludable'],
        datasets: [{
          data: [cantBajoStock, cantStockBueno],
          backgroundColor: ['#f44336', '#4caf50'],
          borderWidth: 2
        }]
      },
      options: { responsive: true }
    });

}

  dibujarGraficoLineas(){
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'];
    const ingresos = [120, 150, 180, 200, 170, 220, 250, 300, 280, 320];
    const salidas = [80, 100, 90, 120, 110, 130,120, 140, 150, 160];

    this.chartLineas = new Chart(this.lineasRef.nativeElement, {
      type: 'line',
      data: {
        labels: meses,
        datasets: [
          {
            label: 'Ingresos al Almacén',
            data: ingresos,
            borderColor: '#4caf50', // Verde
            backgroundColor: 'rgba(76, 175, 80, 0.1)', // Sombra verde
            tension: 0.4, // Curva suave (moderno)
            fill: true
          },
          {
            label: 'Salidas del Almacén',
            data: salidas,
            borderColor: '#f44336', // Rojo
            backgroundColor: 'rgba(244, 67, 54, 0.1)', // Sombra roja
            tension: 0.4, // Curva suave
            fill: true
          }
        ]
      },
      options: { 
        responsive: true,
        maintainAspectRatio: false
      }
    });


  }
  }
