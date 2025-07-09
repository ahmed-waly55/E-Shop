import { Component } from '@angular/core';
import { ProductService } from '../../core/service/product.service';
import { Iproducts } from '../../core/interfaces/iproducts';
import { CardComponent } from "../../shared/module/card/card/card.component";
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SearchNamePipe } from '../../core/pipes/search-name.pipe';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent, InputIconModule, IconFieldModule, InputTextModule, FormsModule, SearchNamePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  constructor(private _ProductService: ProductService) { }
  allProduct: Iproducts[] = []
  searchKey: string = ''

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct() {
    this._ProductService.allProduct().subscribe((next) => {
      this.allProduct = next
    })
  }
}

