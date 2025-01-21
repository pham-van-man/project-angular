import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {User} from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:8080/api';
  jwtHelper: JwtHelperService = new JwtHelperService()

  constructor(private router: Router, private http: HttpClient) {
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/register", user);
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/login", user);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.createUrlTree(['/login']);
  }

  getRoles(): string[] {
    const token: string | null = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.roles || [];
    }
    return [];
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  isAuthenticated(): boolean {
    const token: string | null = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }
}
