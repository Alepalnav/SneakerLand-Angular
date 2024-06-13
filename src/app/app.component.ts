import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductService } from './services/product.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgxUiLoaderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sneakerLand';

  searchEvent: EventEmitter<string> = new EventEmitter<string>();
  searchTerm: string = '';

  constructor(
    private servicio: ProductService,
    private router: Router
  ){}

  onSearch(searchTerm: string):void {
    this.searchTerm=searchTerm;
    this.router.navigate(['/products'],{queryParams:{searchTerm:searchTerm}})
  }


}
