import { Component, Input } from '@angular/core';
import { AddToCart, Order, ProductDTO } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-brand',
  standalone: true,
  imports: [CommonModule],
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

  isLogged=false;

  pedido!:Omit<Order,'id_order'|'details'>;
  id_pedido!:number;
  detail!:AddToCart;


  constructor(
    private servicio: ProductService,
    private cartServicio: CartService,
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void {

  //     this.servicio.getProducts().subscribe((productsList)=>{
  //       this.products=productsList;
  //     })
  // }
  this.isLogged = this.userService.getCurrentUser()!=null; 
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
