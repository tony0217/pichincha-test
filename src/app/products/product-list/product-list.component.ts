import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from './../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  displayedProducts: Product[] = [];
  searchTerm: string = '';
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;

  private productsSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productsSubscription = this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.updateDisplayedProducts();
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  onSearchChange() {
    this.currentPage = 1;
    this.updateDisplayedProducts();
    this.calculateTotalPages();
  }

  updateDisplayedProducts() {
    const filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedProducts = filteredProducts.slice(startIndex, endIndex);
  }

  onPageSizeChange(event: Event) {
    const newSize = (event.target as HTMLSelectElement).value;
    this.pageSize = newSize === 'all' ? this.products.length : Number(newSize);
    this.updateDisplayedProducts();
    this.calculateTotalPages();
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.products.length / this.pageSize);
  }

  showOptions(event: Event, productId: string) {
    const target = event.target as HTMLElement;
    const productRow = target.closest('tr') as HTMLElement;
    const optionsDialog = productRow.querySelector('.options-dialog') as HTMLElement;

    if (optionsDialog) {
      optionsDialog.style.display = 'block';
    }

    window.addEventListener('click', (e: Event) => {
      const clickedElement = e.target as HTMLElement;
      if (!optionsDialog.contains(clickedElement) && clickedElement !== target) {
        optionsDialog.style.display = 'none';
      }
    });

    event.stopPropagation();
  }

  goToAddProduct() {
    this.router.navigate(['/products/create']);
  }


  goToEditProduct(product: Product) {
    this.router.navigate([`/products/edit/${product.id}`], { state: { product } });
  }

  goToDeleteProduct(id: string) {
    console.log("🚀 ~ file: product-list.component.ts:119 ~ ProductListComponent ~ deleteProduct ~ id:", id)
  }

}
