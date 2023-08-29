import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

type FieldErrorMessages = {
  required: string;
  minlength: string;
  maxlength: string;
  invalidDate: string;
};

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  getFieldErrorMessage(
    fieldName: string,
    errorType: keyof FieldErrorMessages,
    registrationForm: AbstractControl
  ): string {
    const field = registrationForm.get(fieldName);

    if (field?.hasError(errorType)) {
      const errors: FieldErrorMessages = {
        required: `El ${fieldName} es requerido.`,
        minlength: `El ${fieldName} debe tener al menos ${field.errors?.['minlength']?.requiredLength ?? 0} caracteres.`,
        maxlength: `El ${fieldName} no debe tener más de ${field.errors?.['maxlength']?.requiredLength ?? 0} caracteres.`,
        invalidDate: `La fecha de lanzamiento debe ser igual o posterior a la fecha actual.`,
      };

      return errors[errorType];
    }

    return '';
  }

  isInvalid(controlName: string, registrationForm: AbstractControl): boolean {
    const control = registrationForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }

}
