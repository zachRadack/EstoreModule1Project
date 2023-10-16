import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Login } from './login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http:HttpClient) { }    // DI for HttpClient 


  checkLoginDetails(loginRef: any): boolean {
    console.log(this.loadEmails());
    if (loginRef.emailid == "admin@t.com" && loginRef.password == "admin") {
      
        
      return true;
    }
    else {
      return false;
    }
  }
  
  loadEmails(): Observable<Login[]> {
    loginDetails:Observable<Login[]>;
    const loginDetails = this.http.get<Login[]>("http://localhost:3000/accounts/");
    console.log("http://localhost:3000/accounts/");
    console.log(loginDetails);
    return loginDetails;
  }
}
