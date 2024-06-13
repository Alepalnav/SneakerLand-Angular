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
    private formBuilder: FormBuilder,
    private service: ProductService
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      descrip: ['', Validators.required],
      size: [0, Validators.required],
      image: [''],
      price: [0, Validators.required],
      stock: [0, Validators.required],
      remove: [0, Validators.required],
      details: [[]]
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.service.getProduct(this.id)
        .subscribe({
          next: (product) => {
            this.productForm.patchValue(product);
            this.edit = true;
          },
          error: (error) => {
            console.error('Error fetching product:', error);
          }
        });
    }
  }

  submit(): void {
    if (this.productForm.valid) { // Validar si el formulario es válido antes de enviar
      if (this.edit) {
        this.service.updateProduct(this.id, this.productForm.value, this.file)
          .subscribe({
            next: (product) => {
              this.exito = true;
              this.productForm.reset();
              Swal.fire({
                title: 'Good job!',
                text: 'You edited the product!',
                icon: 'success'
              });
              this.router.navigate(['/products']);
            },
            error: (error) => {
              console.error('Error updating product:', error);
            }
          });
      } else {
        if (!this.file) {
          console.error('El archivo es nulo');
        } else {
          this.service.addProduct(this.productForm.value, this.file)
            .subscribe({
              next: (product) => {
                this.exito = true;
                this.productForm.reset();
                Swal.fire({
                  title: 'Good job!',
                  text: 'You added a new product!',
                  icon: 'success'
                });
                this.router.navigate(['/products']);
              },
              error: (error) => {
                console.error('Error adding product:', error);
              }
            });
        }
      }
    } else {
      // Manejar el caso donde el formulario no es válido (campos requeridos faltantes)
      Swal.fire({
        title: 'Error!',
        text: 'Please fill out all required fields.',
        icon: 'error'
      });
    }
  }

  
  goBack(): void {
    this.router.navigate(['/products']);
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0]; 
    }
  }

}
