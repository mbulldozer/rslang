import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import GlobalConstants from '../common/global-constants';
import {
  LoginType, RefreshToken, RegistrationType, ResponseLogin,
} from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  private isShowFormSubject = new BehaviorSubject<boolean>(false);

  public isShowForm$ = this.isShowFormSubject.asObservable();

  private loginDataSubject = new BehaviorSubject<ResponseLogin | null>(null);

  public loginData$ = this.loginDataSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) {
    const loginData = JSON.parse((localStorage.getItem('login') as string));
    this.setLoginData(loginData);
  }

  toggleFormAuth(value: boolean) {
    this.isShowFormSubject.next(value);
  }

  login(data: LoginType): Observable<ResponseLogin> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<ResponseLogin>(`${GlobalConstants.urlPath}/signin`, data, { headers });
  }

  logout() {
    localStorage.setItem('login', 'null');
    localStorage.setItem('page', 'null');
    this.loginDataSubject.next(null);
    document.location.reload();
  }

  registration(data: RegistrationType): Observable<RegistrationType> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<RegistrationType>(`${GlobalConstants.urlPath}/users`, data, { headers });
  }

  setLoginData(data: ResponseLogin | null) {
    localStorage.setItem('login', JSON.stringify(data));
    this.loginDataSubject.next(data);
  }

  private refreshToken() {
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.loginDataSubject.getValue()?.refreshToken}`);
    this.http.get<RefreshToken>(`${GlobalConstants.urlPath}/users/${this.loginDataSubject.getValue()?.userId}/tokens`, { headers }).subscribe((res) => {
      const data = this.loginDataSubject.getValue();
      if (data) {
        data.refreshToken = res.refreshToken as string;
        data.token = res.token as string;
        this.loginDataSubject.next(data);
      }
    });
  }
}
