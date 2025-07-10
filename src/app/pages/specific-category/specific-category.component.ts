import { Component } from '@angular/core';
import { CategoryService } from '../../core/service/category.service';
import { ActivatedRoute } from '@angular/router';
import { Iproducts } from '../../core/interfaces/iproducts';
import { CardComponent } from "../../shared/module/card/card/card.component";

@Component({
  selector: 'app-specific-category',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './specific-category.component.html',
  styleUrl: './specific-category.component.scss'
})
export class SpecificCategoryComponent {
  products: Iproducts[] = []
  categoryType: string = ''
  constructor(private _categoryService: CategoryService, private _activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.categoryType = this._activatedRoute.snapshot.paramMap.get("type") ?? ""
    this.getSpecificCategory(this.categoryType)
  }

  getSpecificCategory(type: string) {
    this._categoryService.getSpecificCategory(type).subscribe((next) => { this.products = next.products })
  }
}
