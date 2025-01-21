import {Routes} from '@angular/router';
import {LoginComponent} from './controller/login/login.component';
import {RegistrationComponent} from './controller/registration/registration.component';
import {HomeComponent} from './controller/home/home.component';
import {MainLayoutComponent} from './controller/main-layout/main-layout.component';
import {authGuard} from './service/auth/auth.guard';
import {AdminComponent} from './controller/admin/admin.component';
import {roleGuard} from './service/auth/role.guard';

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {
    path: 'home', component: MainLayoutComponent, children: [{
      path: '', component: HomeComponent
    }], canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [roleGuard],
    data: {roles: ['ADMIN']}
  },
  {path: '**', redirectTo: '/home'}
];
