import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Iproducts } from '../../../../core/interfaces/iproducts';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, ButtonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {


  @Input({ required: true }) isSmallCard: boolean = false;
  @Input({ required: true }) Products!: Iproducts[]





}
