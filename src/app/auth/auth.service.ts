import { LoginRequest } from './../shared/model/login-request';



import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser = new Subject<string>();
  constructor(private http: HttpClient,
    //private jwtService: Jwrvice
  ) { }

  base_url = environment.base_url_login;
  private JWT_TOKEN = 'DHI_JWT_TOKEN';

  logedUser: string;

  login(user: LoginRequest): Observable<boolean> {
    return this.http.post<any>(`${this.base_url}login`, user, { headers: { skip: 'true' } }).pipe(
      tap(token => this.loginInit(user, token)),
      mapTo(true),
      catchError(err => {
        return of(false);
      })
    );
  }

  loggedInUsername() {
    return localStorage.getItem("email");
  }

  private loginInit(user: LoginRequest, tokenObj: string) {
    this.logedUser = user.email;
    const token = tokenObj['token'];
    localStorage.setItem("email", user.email);
    this.storeJwtToken(token);
    this.currentUser.next(user.email);
  }

  private storeJwtToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  isUserLogedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    const token = localStorage.getItem(this.JWT_TOKEN);
    return token;
  }


  logOut() {
    this.logedUser = '';
    this.currentUser.next("");
    this.removeJwtToken();
  }

  private removeJwtToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }


}
