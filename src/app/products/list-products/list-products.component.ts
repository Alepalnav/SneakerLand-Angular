import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ProductDTO, Detail, Order, AddToCart } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { User } from '../../interfaces/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnChanges{

  pedido!:Omit<Order,'id_order'|'details'>;
  id_pedido!:number;
  detail!:AddToCart;

  products: ProductDTO[]=[];
  numPage = 1; // Página por defecto
  order = 'id'; // Orden por defecto
  pageSize = 12;
  ad = false;

  error=false;

  isLogged=false;

  currentFilterName: string | null = null;
  @Input() searchTerm: string='';

  constructor(
    private servicio: ProductService,
    private cartServicio: CartService,
    private userService: UserService,
    private router: Router
  ){}

  ngOnChanges(): void {
    this.isLogged = this.userService.getCurrentUser()!=null; 
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

  buy(product:ProductDTO):void{

    this.detail = {
      product: product,
      cant:    1,
      price:   product.price
    }

    this.cartServicio.addToCart(this.detail);
    product.stock--;
    this.servicio.updateProductNoImage(product.id,product).subscribe({
      next: (res)=>{
        product=res;
      }
    })

    Swal.fire({
      title: "Good job!",
      text: "Added product to cart!",
      icon: "success"
    });
  }
  
}
