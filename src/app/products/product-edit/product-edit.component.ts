import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productData!: Product;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.productData = history.state.product;
    if (!this.productData) {
      this.router.navigate(['/not-found']);
    }
  }

  onEditFormSubmit(formData: any) { }

}
