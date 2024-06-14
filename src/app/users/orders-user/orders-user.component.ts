import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Order, OrderDelivered } from '../../interfaces/product';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-orders-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-user.component.html',
  styleUrl: './orders-user.component.css'
})
export class OrdersUserComponent implements OnInit{

  constructor(
    private userService:UserService
  ){}

  user!:User;
  orders:Order[]=[];
  id:number=0;
  admin:boolean=false;

  orderDelivered!:OrderDelivered;

  ngOnInit(): void {
    this.id=this.userService.getCurrentUser().id;
    this.userService.getUser(this.id).subscribe({
      next:(res)=>{
        this.user=res;
      }
    });
    this.userService.getOrders(this.id).subscribe({
      next:(res)=>{
        this.orders=res;
      },error:(err)=>{
        console.log('No se han podido obtener los pedidos',err);
      }
    })
    this.admin=this.userService.isAdmin();
  }

  delivered(order:Order){

    this.orderDelivered ={
      user:     order.user,
      date:     order.date,
      state:    'entregado'
    }

    this.userService.deliveredOrder(order.id_order,this.orderDelivered).subscribe({
      next:(res)=>{
        this.userService.getOrders(this.id).subscribe({
          next:(res)=>{
            this.orders=res;
          }
        })
      }
    });
    
  }

  delete(order:Order){

    this.userService.deleteOrder(order.id_order).subscribe({
      next:(res)=>{
        this.userService.getOrders(this.id).subscribe({
          next:(res)=>{
            this.orders=res;
          }
        })
      }
    })

  }

  
}
