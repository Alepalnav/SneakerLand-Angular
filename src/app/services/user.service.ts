import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginCredentials } from '../interfaces/login-credentials';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users:User[]=[];

  private currentUser: any;
  private url: string = 'https://proyectoapi-alepalnav.onrender.com';

  constructor(private http: HttpClient) {
    this.currentUser = this.getCurrentUserFromToken();
    console.log('Servicio iniciado')
  }

  register(user: Omit<User,'id'>):Observable<User>{
    return this.http.post<User>(`${this.url}/auth/register`,user)
  }

  login(loginCredentials: LoginCredentials): Observable<string> {
    return this.http.post(`${this.url}/auth/login`, loginCredentials, { responseType: 'text' }).pipe(
      map(response => {
        const token = response.split('Bearer ')[1]; // Extraer token JWT
        return token;
      })
    );
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  getUserRole():string {
    if(this.currentUser!=null){
      return this.currentUser.role;
    }else{
      return '';
    }
  }

  

  private getCurrentUserFromToken(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token) // Decodificar el token
      return decodedToken;
    }
    return null;
  }

  logout():void {
    localStorage.removeItem('token');
    this.setCurrentUser(null);
  }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/users`);

  }

}
