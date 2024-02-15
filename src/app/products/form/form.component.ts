import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductDTO } from '../../interfaces/product';
import { Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{

  @Input('id') id: number=0;
  edit: boolean = false;
  exito: boolean = false;
  
  constructor(
    private router:Router,
    private service: ProductService
    ) { }
  
  product: Omit<ProductDTO, 'id'>={
    name: '',
    brand: '',
    descrip: '',
    size: 0,
    image: '',
    price: 0,
    stock: 0,
    remove: 0,
    details: []
  }
  

  ngOnInit(): void {
    if(this.id){
      this.service.getProduct(this.id)
      .subscribe({
        next: (producto) => {
          this.product=producto;
          this.edit=true;
        }
      })
    }
  }

  submit() {
    if (this.edit) {
      this.service.updateProduct(this.id, this.product)
      .subscribe({
        next: (product) => {this.exito = true,
        this.router.navigate(['/products'])
        }
      })
    }else {
      this.service.addProduct(this.product)
      .subscribe({
        next:(producto)=>{
          this.exito=true
          this.product={
            name: '',
            brand: '',
            descrip: '',
            size: 0,
            image: '',
            price: 0,
            stock: 0,
            remove: 0,
            details: []
          }
        }
      })
    }
  }

  goBack(){
    this.router.navigate(['/products'])
  }

}
