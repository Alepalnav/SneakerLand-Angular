import { Injectable } from '@angular/core';
import { ProductDTO } from '../interfaces/product';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = 'http://localhost:8080';

  private products: ProductDTO[]=[];

  constructor(private http: HttpClient) {
    console.log('Servicio iniciado')
  }

  // getProducts():Observable<Product[]>{
  //   return this.http.get<Product[]>(`${this.url}/products`);
  // }

  listProducts(numPage: number, pageSize: number, order: string, ad: boolean): Observable<ProductDTO[]> {
    // Configura los parámetros para la petición GET
    const params = new HttpParams()
      .set('numPage', numPage.toString())
      .set('pageSize', pageSize.toString())
      .set('order', order)
      .set('ad', ad ? 'asc' : 'desc');

    return this.http.get<any>(`${this.url}/products`, { params })
      .pipe(
        map(response => response.content.map((product: any) => ({
          id: product.id,
          name: product.name,
          brand: product.brand,
          descrip: product.descrip,
          size: product.size,
          image: product.image,
          price: product.price,
          stock: product.stock,
          remove: product.remove
        }))),
        catchError(err => {
          console.error('Error al cargar los productos:', err);
          return throwError(err);
        })
      );
  }

  getProduct(id:Number): Observable<ProductDTO>{
    return this.http.get<ProductDTO>(`${this.url}/product/${id}`);
  }

  addProduct(product: Omit<ProductDTO, 'id'>): Observable<ProductDTO>{
    return this.http.post<ProductDTO>(`${this.url}/product`,product)
  }

  updateProduct(id: number, product: Omit<ProductDTO,'id'>):Observable<ProductDTO>{
    return this.http.put<ProductDTO>(`${this.url}/product/${id}`,product)
  }

  deleteProduct(id: number):Observable<Object>{
    return this.http.delete<Object>(`${this.url}/product/${id}`)
  }
}
