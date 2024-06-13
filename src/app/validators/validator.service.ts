import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, delay, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  equalFields (field1: string, field2: string) : ValidatorFn{
    return (formControl: AbstractControl): ValidationErrors | null => {
      const control2 : FormControl = <FormControl>formControl.get(field2);
      const field1Input : string = formControl.get(field1)?.value;
      const field2Input : string = control2?.value;
  
      if (field1Input !== field2Input) {
        control2.setErrors({ nonEquals: true})
        return { nonEquals: true};
      }
      
      if(control2?.errors && control2.hasError('nonEquals')) {
        delete control2.errors['nonEquals'];
        control2.updateValueAndValidity();
      }
      // control2.setErrors(null)
      return null
    }
  }

}
