import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

type FieldErrorMessages = {
  required: string;
  minlength: string;
  maxlength: string;
  invalidDate: string;
};

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      logo: ['', Validators.required],
      date_revision: [{ value: '', disabled: true }, Validators.required],
      date_release: ['', [Validators.required, this.dateReleaseValidator]],
    });
  }

  ngOnInit(): void {
  }

  private dateReleaseValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    return selectedDate >= currentDate ? null : { invalidDate: true };
  }

  getFieldErrorMessage(fieldName: string, errorType: keyof FieldErrorMessages): string {
    const field = this.registrationForm.get(fieldName);
  
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
  

  isInvalid(controlName: string): boolean {
    const control = this.registrationForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  setRevisionDate() {
    const releaseDateControl = this.registrationForm.get('date_release');
    const revisionDateControl = this.registrationForm.get('date_revision');

    if (releaseDateControl?.value && revisionDateControl) {
      const selectedDate = new Date(releaseDateControl.value);
      selectedDate.setFullYear(selectedDate.getFullYear() + 1);

      const formattedDate = selectedDate.toISOString().slice(0, 10);
      revisionDateControl.setValue(formattedDate);
    }
  }

  
  onSubmit() {
    if (!this.registrationForm.valid) {
      this.registrationForm.markAllAsTouched();
      return;
    }
  
    const dateRevisionValue = this.registrationForm.get('date_revision')?.value;
  
    const formValues = {
      ...this.registrationForm.value,
      date_revision: dateRevisionValue,
    };
  
    console.log(formValues);
  }
  


  resetForm() {
    this.registrationForm.reset();
  }

}
