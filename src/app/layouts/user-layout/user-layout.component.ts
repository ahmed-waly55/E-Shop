import { Component } from '@angular/core';
import { UserNavComponent } from '../../components/user-nav/user-nav.component';
import { UserFooterComponent } from '../../components/user-footer/user-footer.component';
import { HomeComponent } from '../../pages/home/home.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [UserNavComponent, UserFooterComponent, HomeComponent, RouterOutlet],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
})
export class UserLayoutComponent {}
