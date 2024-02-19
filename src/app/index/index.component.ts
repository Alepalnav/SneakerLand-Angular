import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { ProductDTO } from '../interfaces/product';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{
  
  products: ProductDTO[]=[];

  constructor(
    private servicio: ProductService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.servicio.getFirstThreeProducts().subscribe((productList) =>{
      this.products=productList;
    })      
  }

  goToDetails(id: number){
    this.router.navigate(['/products/product',id])
  }

}
