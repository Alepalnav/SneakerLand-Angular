import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { AddToCart, Detail, DetailAdd, Order, ProductDTO } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit,OnChanges{

  pedido!:Omit<Order,'id_order'|'details'>;
  id_pedido!:number;
  order!: AddToCart[];
  detailAdd!:DetailAdd;
  price:number=0;

  isLogged = false;  

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.order=this.cartService.getCart();
      this.getPriceTotal(); 
  }
  ngOnChanges(): void {
      this.order=this.cartService.getCart();
      this.getPriceTotal();
  }
  
  buyCart() {
    this.pedido = {
      user: this.userService.getUserId(),
      date: new Date(),
      state: "pendiente"
    };
  
    this.cartService.addOrder(this.pedido).subscribe({
      next: (res) => {
        this.id_pedido = res.id_order;
  
        this.order.forEach(element => {
          this.detailAdd = {
            order: this.id_pedido,
            product: element.product.id,
            cant: element.cant,
            price: element.price*element.cant
          };
  
          this.cartService.addOrder_details(this.detailAdd).subscribe({
            next: () => {
              console.log(`Detalle añadido para el pedido ${this.id_pedido}`);
            },
            error: (err) => {
              console.error(`Error al añadir detalle para el pedido ${this.id_pedido}`, err);
            }
          });
        });
        this.router.navigate(['/products']);
        localStorage.setItem('cart', JSON.stringify([]));
      },
      error: (err) => {
        console.error('Error al crear el pedido', err);
      }
    });
  }

  minusCant(id:number){
    this.order=this.order.filter(element =>{
      if(element.product.id===id){
        if(element.cant>1){
          element.cant--;
          element.product.stock-element.cant;
          this.productService.updateProductNoImage(element.product.id,element.product).subscribe({
          next: (res)=>{
            element.product=res;
            }
          })
          return true;
        }else{
          return false;
        }
      }
      return true;
    })
    this.cartService.replaceCart(this.order);
    this.getPriceTotal();
  }

  maxCant(id:number){
    this.order=this.order.filter(element =>{
      if(element.product.id===id){
        if(element.cant<element.product.stock){
          element.cant++;
          element.product.stock-element.cant;
          this.productService.updateProductNoImage(element.product.id,element.product).subscribe({
          next: (res)=>{
            element.product=res;
            }
          })
          return true;
        }
      }
      return true;
    })
    this.cartService.replaceCart(this.order);
    this.getPriceTotal();
  }

  deleteCart(id:number){
    this.order=this.order.filter(element =>{
      if(element.product.id===id){
        element.product.stock+element.cant;
        this.productService.updateProductNoImage(element.product.id,element.product).subscribe({
          next: (res)=>{
            element.product=res;
            }
            })
          return false;
      }
      return true;
    })
    this.cartService.replaceCart(this.order);
    this.getPriceTotal();
  }

  getPriceTotal(){
    this.price=0;
    this.order.forEach(element => {
      this.price+=element.price*element.cant;
    });
  }
  

}
