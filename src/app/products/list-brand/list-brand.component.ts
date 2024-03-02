import { Component, Input } from '@angular/core';
import { ProductDTO } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-brand',
  standalone: true,
  imports: [],
  templateUrl: './list-brand.component.html',
  styleUrl: './list-brand.component.css'
})
export class ListBrandComponent {

  @Input() brand: string='';
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
      this.servicio.listProductsBrand(this.numPage, this.pageSize, this.order, this.ad,this.brand)
      .subscribe(
        response => {
          this.products = response;
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
