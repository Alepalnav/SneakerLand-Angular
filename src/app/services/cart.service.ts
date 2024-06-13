import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddToCart, Detail, DetailAdd, Order, ProductDTO } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url: string = 'https://proyectoapi-alepalnav.onrender.com';

  constructor(private http: HttpClient) {}

  getCart(): AddToCart[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  replaceCart(cart:AddToCart[]):void{
    return localStorage.setItem('cart',JSON.stringify(cart));
  }


  addToCart(product: AddToCart): void {
    const cart = this.getCart();
    const existingProduct = cart.find(item => item.product.id === product.product.id);
    console.log(existingProduct);
    if (existingProduct) {
      existingProduct.cant += 1;
    } else {

      cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addOrder(order:Omit<Order,'id_order'|'details'>):Observable<Order>{
    return this.http.post<Order>(`${this.url}/orders`,order)
  }

  addOrder_details(detail:DetailAdd):Observable<DetailAdd>{
    return this.http.post<DetailAdd>(`${this.url}/order_details`,detail)
  }


}
