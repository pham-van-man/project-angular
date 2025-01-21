import {Component} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
    FooterComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
