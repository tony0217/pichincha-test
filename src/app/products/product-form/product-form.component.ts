import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, tap } from 'rxjs/operators';
import { DateService } from '../../shared/services/date-service.service';
import { FormValidationService } from '../../shared/services/form-validation-service.service';
import { FieldErrorMessages, Product } from 'src/app/products/models/product.model';
import { ProductService } from 'src/app/products/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() isEdit = false;
  @Input() initialValues!: Product;

  @Output() submitForm: EventEmitter<any> = new EventEmitter();

  isSubmitting = false;

  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dateService: DateService,
    private formValidationService: FormValidationService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registrationForm = this.fb.group({
      id: [
        { value: '', disabled: this.isEdit },
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10)
          ],
          asyncValidators: !this.isEdit ? [this.formValidationService.validateExistID(this.productService)] : []
        }
      ],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      logo: ['', Validators.required],
      date_revision: [{ value: '', disabled: true }, Validators.required],
      date_release: ['', [Validators.required, this.dateService.validateDateIsBeforeOrToday]],
    });


    if (this.isEdit) {
      this.registrationForm.patchValue({
        ...this.initialValues,
        date_release: this.dateService.formatDate(this.initialValues.date_release),
        date_revision: this.dateService.formatDate(this.initialValues.date_revision)
      });
    }
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

  getFieldErrorMessage(fieldName: string, errorType: keyof FieldErrorMessages): string {
    return this.formValidationService.getFieldErrorMessage(fieldName, errorType, this.registrationForm);
  }

  isInvalid(controlName: string): boolean {
    return this.formValidationService.isInvalid(controlName, this.registrationForm);
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const formValues: Product = {
      ...this.registrationForm.value,
      date_revision: this.registrationForm.get('date_revision')?.value,

    };

    const action$ = this.isEdit
      ? this.productService.updateProduct({ ...formValues, id: this.initialValues.id })
      : this.productService.createProduct(formValues);

    action$.pipe(
      finalize(() => {
        this.isSubmitting = false;
        this.isEdit ? this.router.navigate(['/']) : this.resetForm();
      }),
      tap({
        next: (result) => {
          console.log(this.isEdit ? 'Producto actualizado:' : 'Producto creado:', result);
          this.submitForm.emit(result);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      })
    ).subscribe();
  }

  resetForm() {
    this.registrationForm.reset();
  }

}
