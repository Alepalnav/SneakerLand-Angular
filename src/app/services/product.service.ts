import { Injectable } from '@angular/core';
import { ProductDTO } from '../interfaces/product';
import { Observable, catchError, forkJoin, map, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = 'https://proyectoapi-alepalnav.onrender.com';

  private products: ProductDTO[]=[];

  constructor(private http: HttpClient) {
    console.log('Servicio iniciado')
  }

  getProducts():Observable<ProductDTO[]>{
    return this.http.get<ProductDTO[]>(`${this.url}/products`);
  }

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

  getFirstProduct(): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(`${this.url}/product/1`);
  }

  getSecondProduct(): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(`${this.url}/product/2`);
  }

  getThirdProduct(): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(`${this.url}/product/3`);
  }

  //forkjoin para hacer tres llamadas simultaneas
  getFirstThreeProducts(): Observable<ProductDTO[]> {
    return forkJoin({
      first: this.getFirstProduct(),
      second: this.getSecondProduct(),
      third: this.getThirdProduct()
    }).pipe(
      map(response => [response.first, response.second, response.third])
    );
  }


  // addProduct(product: Omit<ProductDTO, 'id'>): Observable<ProductDTO>{
  //   return this.http.post<ProductDTO>(`${this.url}/product`,product)
  // }

  // updateProduct(id: number, product: Omit<ProductDTO,'id'>):Observable<ProductDTO>{
  //   return this.http.put<ProductDTO>(`${this.url}/product/${id}`,product)
  // }

  deleteProduct(id: number):Observable<Object>{
    return this.http.delete<Object>(`${this.url}/product/${id}`)
  }

  addProduct(product: Omit<ProductDTO, 'id'>, file: File): Observable<ProductDTO>{
    const productBlob = new Blob([JSON.stringify(product)], { type: 'application/json' });
  
    const formData: FormData = new FormData();
    formData.append('productDTO', productBlob);
    formData.append('file', file, file.name);

    return this.http.post<ProductDTO>(`${this.url}/product`,formData)
  }

  updateProduct(id: number,product: Omit<ProductDTO, 'id'>, file: File): Observable<ProductDTO>{
    const productBlob = new Blob([JSON.stringify(product)], { type: 'application/json' });
  
    const formData: FormData = new FormData();
    formData.append('productDTO', productBlob);
    formData.append('file', file, file.name);

    return this.http.put<ProductDTO>(`${this.url}/product/${id}`,formData)
  }

  listProductsBrand(numPage: number, pageSize: number, order: string, ad: boolean, brand:string): Observable<ProductDTO[]> {
    // Configura los parámetros para la petición GET
    const params = new HttpParams()
      .set('numPage', numPage.toString())
      .set('pageSize', pageSize.toString())
      .set('order', order)
      .set('ad', ad ? 'asc' : 'desc');

    return this.http.get<any>(`${this.url}/products/${brand}`, { params })
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

  listProductsSearchs(numPage: number, pageSize: number, order: string, ad: boolean, search:string): Observable<ProductDTO[]> {
    // Configura los parámetros para la petición GET
    const params = new HttpParams()
      .set('search', search)
      .set('numPage', numPage.toString())
      .set('pageSize', pageSize.toString())
      .set('order', order)
      .set('ad', ad ? 'asc' : 'desc');

    return this.http.get<any>(`${this.url}/products/filter`, { params })
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

}
