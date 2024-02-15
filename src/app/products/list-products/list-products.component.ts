import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ProductDTO } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit{

  products: ProductDTO[]=[];
  numPage = 1; // Página por defecto
  order = 'id'; // Orden por defecto
  pageSize = 12;
  ad = false;

  constructor(
    private servicio: ProductService,
    private router: Router
  ){}

  ngOnInit(): void {

  //     this.servicio.getProducts().subscribe((productsList)=>{
  //       this.products=productsList;
  //     })
  // }

  this.loadProducts();

  }
    loadProducts(): void {
      this.servicio.listProducts(this.numPage, this.pageSize, this.order, this.ad)
      .subscribe(
        response => {
          this.products = response;
        },
        error => {
          console.error('Error al cargar los productos:', error);
        }
      );
    }

  nextPage(): void {
    this.numPage++;
    this.loadProducts();
  }

  prevPage(): void {
    if (this.numPage > 1) {
      this.numPage--;
      this.loadProducts();
    }
  }
  
  orderBy(order: string): void {
    if (this.order === order) {
      this.ad = !this.ad;
    } else {
      this.order = order;
      this.ad = true;
    }
    this.loadProducts();
  }

  goToDetails(id: number){
    this.router.navigate(['/products/product',id])
  }
  
}
