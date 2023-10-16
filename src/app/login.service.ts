import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  checkLoginDetails(loginRef: any): boolean {
    if (loginRef.emailid == "admin@t.com" && loginRef.password == "admin") {
      return true;
    }
    else {
      return false;
    }
  }
  
}
