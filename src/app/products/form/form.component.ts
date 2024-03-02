import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductDTO } from '../../interfaces/product';
import { Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{

  @Input('id') id: number = 0;
  edit: boolean = false;
  exito: boolean = false;
  productForm: FormGroup;
  file: File | null = null;

  constructor(
    private router: Router,
    private service: ProductService
  ) {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      descrip: new FormControl('', Validators.required),
      size: new FormControl(0, Validators.required),
      image: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      stock: new FormControl(0, Validators.required),
      remove: new FormControl(0, Validators.required),
      details: new FormControl([])
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.service.getProduct(this.id)
        .subscribe({
          next: (producto) => {
            this.productForm.patchValue(producto);
            this.edit = true;
          }
        })
    }
  }

  submit() {
    if (this.edit) {
      if(this.file!=null){
      this.service.updateProduct(this.id, this.productForm.value,this.file)
        .subscribe({
          next: (product) => {
            this.exito = true;
            this.productForm.reset({
              name: '',
              brand: '',
              descrip: '',
              size: 0,
              image: '',
              price: 0,
              stock: 0,
              remove: 0,
              details: []
            });
          }
        })
        Swal.fire({
          title: "Good job!",
          text: "You edit the product!",
          icon: "success"
        });
        this.router.navigate(['/products']);
      }else{
        Swal.fire({
          title: "Oops...",
          text: "You must choose a image",
          icon: "error"
        });
      }
    } else {
      if(this.file===null){
        console.error('El archivo es nulo')
      }else {
        this.service.addProduct(this.productForm.value, this.file)
        .subscribe({
          next: (producto) => {
            this.exito = true;
            this.productForm.reset({
              name: '',
              brand: '',
              descrip: '',
              size: 0,
              image: '',
              price: 0,
              stock: 0,
              remove: 0,
              details: []
            });
          }
        })
        Swal.fire({
          title: "Good job!",
          text: "You add a new product!",
          icon: "success"
        });
        this.router.navigate(['/products'])
      }
    }
    }
    
    goBack(){
      this.router.navigate(['/products'])
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0]; 
    }
  }

}
