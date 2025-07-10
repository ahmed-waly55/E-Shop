import { Component } from '@angular/core';
import { CategoryService } from '../../core/service/category.service';
import { Iproducts } from '../../core/interfaces/iproducts';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  allCategory: string[] = []
  constructor(private _categoryService: CategoryService) {

  }
  ngOnInit() {
    this.displayAllCategory()
  }
  displayAllCategory() {
    this._categoryService.getAllCategory().subscribe((next) => {
      this.allCategory = next.categories
    })
  }
  getImageCategory(type: string): string {
    return `./assets/category/${type}.jpg`
  }
}
