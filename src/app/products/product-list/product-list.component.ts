import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products = [
    {
      id: "trj-crs",
      name: "Tarjetas de Credito",
      description: "Tarjera de consumo la modalidad de credito",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2023-02-01T00:00:00.000+00:00",
      date_revision: "2024-02-01T00:00:00.000+00:00"
    },
    {
      id: "prod-2",
      name: "Producto 2",
      description: "Descripción del Producto 2",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2023-03-01T00:00:00.000+00:00",
      date_revision: "2024-03-01T00:00:00.000+00:00"
    },
    {
      id: "prod-3",
      name: "Producto 3",
      description: "Descripción del Producto 3",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2023-04-01T00:00:00.000+00:00",
      date_revision: "2024-04-01T00:00:00.000+00:00"
    },
    {
      id: "prod-4",
      name: "Producto 4",
      description: "Descripción del Producto 4",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2023-04-01T00:00:00.000+00:00",
      date_revision: "2024-04-01T00:00:00.000+00:00"
    },
    {
      id: "prod-5",
      name: "Producto 5",
      description: "Descripción del Producto 5",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2023-04-01T00:00:00.000+00:00",
      date_revision: "2024-04-01T00:00:00.000+00:00"
    },
    {
      id: "prod-6",
      name: "Producto 6",
      description: "Descripción del Producto 6",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2023-04-01T00:00:00.000+00:00",
      date_revision: "2024-04-01T00:00:00.000+00:00"
    },
    {
      id: "prod-7",
      name: "Producto 7",
      description: "Descripción del Producto 7",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2023-04-01T00:00:00.000+00:00",
      date_revision: "2024-04-01T00:00:00.000+00:00"
    },
    {
      id: "prod-8",
      name: "Producto 8",
      description: "Descripción del Producto 8",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2023-04-01T00:00:00.000+00:00",
      date_revision: "2024-04-01T00:00:00.000+00:00"
    },
    {
      id: "prod-9",
      name: "Producto 9",
      description: "Descripción del Producto 9",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2023-04-01T00:00:00.000+00:00",
      date_revision: "2024-04-01T00:00:00.000+00:00"
    },
    {
      id: "prod-10",
      name: "Producto 10",
      description: "Descripción del Producto 10",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2023-10-01T00:00:00.000+00:00",
      date_revision: "2024-10-01T00:00:00.000+00:00"
    }
  ];

  constructor(private router: Router) { }

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


  goToEditProduct(id: string) {
    console.log("🚀 ~ file: product-list.component.ts:114 ~ ProductListComponent ~ editProduct ~ id:", id)

  }

  goToDeleteProduct(id: string) {
    console.log("🚀 ~ file: product-list.component.ts:119 ~ ProductListComponent ~ deleteProduct ~ id:", id)

  }

}
