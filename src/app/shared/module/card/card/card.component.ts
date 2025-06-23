import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Iproducts } from '../../../../core/interfaces/iproducts';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {


  @Input({ required: true }) isSmallCard: boolean = false;
  @Input({ required: true }) Products!: Iproducts[]





}
