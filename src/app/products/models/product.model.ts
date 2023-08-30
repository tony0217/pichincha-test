export interface Product {
  id: string;
  description: string;
  name: string;
  logo: string;
  date_revision: string;
  date_release: string;
}

export type FieldErrorMessages = {
  required: string;
  minlength: string;
  maxlength: string;
  invalidDate: string;
  idExist: string;
};
