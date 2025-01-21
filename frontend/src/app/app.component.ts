import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LoginComponent} from './controller/login/login.component';
import {RegistrationComponent} from './controller/registration/registration.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    LoginComponent,
    RegistrationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
}
