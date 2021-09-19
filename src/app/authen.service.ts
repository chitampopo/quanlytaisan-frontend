import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenService implements CanActivate {
  private subject = new Subject<any>();

  constructor(public router: Router, private http: HttpClient) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!localStorage.getItem('isAuthen')) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    return true;
  }

  submitLogin(login: any): Observable<void> {
    return this.http.post<void>('/api/authen/login', login);
  }

  updateLogin() {
    this.subject.next();
  }

  observeLogin() {
    return this.subject.asObservable();
  }
}
