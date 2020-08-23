import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';

import { ConfigService } from './config.service';

import { BaseService } from './base.service';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import { Credentials } from '../models/credentials.interface';
import { LoginResult } from '../models/LoginResult';
import { Router } from '@angular/router';


@Injectable()

export class UserService extends BaseService {

  baseUrl = '';

  // Observable navItem source
  private authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this.authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: HttpClient, configService: ConfigService, private router: Router) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this.authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
  }

  login(user: Credentials): Observable<LoginResult> {
    return this.http.post(this.baseUrl + '/auth/login',
      {
        username: user.email,
        password: user.password
      }, { headers: new HttpHeaders({ 'No-Auth': 'True' }) }) as Observable<LoginResult>;
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this.authNavStatusSource.next(false);
    this.router.navigate(['landing-page'], { replaceUrl: true });
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
