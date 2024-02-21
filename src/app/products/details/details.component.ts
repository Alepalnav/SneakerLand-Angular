import { Component, OnInit, Input } from '@angular/core';
import { ProductDTO } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{

  product!: ProductDTO;
  @Input() id: number=0;
  cantidadElegida: number = 0;

  constructor(
    private servicio: ProductService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.servicio.getProduct(this.id).subscribe(response =>{
        this.product=response;
      })
  }

  goToEdit(id:number){
    this.router.navigate(['/products/edit',id])
  }

  delete(id:number){
    this.servicio.deleteProduct(id).subscribe({
      next: ()=> 
        this.router.navigate(['/products']),
      })
      Swal.fire({
        title: "Good job!",
        text: "You delete the product!",
        icon: "success"
      });
  }
}
