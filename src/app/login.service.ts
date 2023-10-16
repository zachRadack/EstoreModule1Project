import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Login } from './login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http:HttpClient) { }    // DI for HttpClient 

  // this async function returns all the login details
  //THIS SHOULD NEVER EVER EVER BE ALLOWED TO EXIST HERE IN THE FINAL PRODUCT

  // THIS IS A MAJOR MAJOR MAJOR MAJOR SECURITY HAZARD AND SHOULD 1000% BE REPLACED LATER
  loadEmails(): Observable<Login[]> {
    loginDetails:Observable<Login[]>;
    const loginDetails = this.http.get<Login[]>("http://localhost:3000/accounts/");
    console.log("http://localhost:3000/accounts/");
    console.log(loginDetails);
    return loginDetails;
  }
}
