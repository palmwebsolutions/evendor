import { Router } from '@angular/router';
import { Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

import { url } from '../user/shared/url'


@Injectable()
export class AuthService {

  private url = url;
  public token;

  constructor(private http: HttpClient, private router: Router) { }


  setToken(token){
    localStorage.setItem('token', token);
    this.token = token;
    return true
  }

  logout(){
    localStorage.removeItem('token');
    //this.currentUser = null;
    this.token = null;
    this.router.navigate(['/home']);
  }

  isLoggedIn(){
    this.token = localStorage.getItem('token');
  
    return tokenNotExpired();
  }
}
