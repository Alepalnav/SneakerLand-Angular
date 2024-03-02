import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ProductDTO } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnChanges{


  products: ProductDTO[]=[];
  numPage = 1; // Página por defecto
  order = 'id'; // Orden por defecto
  pageSize = 12;
  ad = false;

  error=false;

  currentFilterName: string | null = null;
  @Input() searchTerm: string='';

  constructor(
    private servicio: ProductService,
    private router: Router
  ){}

  ngOnChanges(): void {
  this.numPage=1;
  this.loadProducts();
  
}

loadProducts(): void {
      if(this.searchTerm){
        try{
          this.servicio.listProductsSearchs(this.numPage, this.pageSize, this.order, this.ad,this.searchTerm)
          .subscribe(
            response=>{
                this.products=response;
            }
          );
        }catch(error){
          this.products=[];
        };
      }else{
        this.servicio.listProducts(this.numPage, this.pageSize, this.order, this.ad)
        .subscribe(
          response => {
            this.products = response;
          }
          );
        }
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

  onSearch(searchTerm: string):void{
    this.searchTerm=searchTerm.trim().toLowerCase();
    this.loadProducts();
  }

 
  
}
