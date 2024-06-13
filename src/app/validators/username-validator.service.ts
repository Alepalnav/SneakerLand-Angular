import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map,  delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsernameValidatorService implements AsyncValidator {

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
   
      if (!control.value) {
        return of(null);
      }
      const username = control.value;
      return this.http.get<any[]>(`https://proyectoapi-alepalnav.onrender.com/userByUsername?username=${username}`)
    .pipe(
      delay(3000),
      map( resp => {
        return (resp.length === 0) ? null : { usernameTaken: true}
      })

    )
    
    
  }

}
