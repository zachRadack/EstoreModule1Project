import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Signin } from './signin';
@Injectable({
    providedIn: 'root'
})
export class SigninService {

    constructor(public http: HttpClient) { }    // DI for HttpClient 

    pushClient(newClient: any) {
        console.log(newClient);
        let fakedata = {
            "id": 4,
            "email": "admin@t.com",
            "password": "admin",
            "firstname": "john",
            "lastname": "doe",
            "address": "new youk"
          };
          console.log(JSON.stringify(fakedata));
          console.log(JSON.stringify(newClient));

        
        return this.http.post("http://localhost:3000/accounts", JSON.stringify(newClient),{headers:{"Content-Type":"application/json"}})
    }
    log(msg: any) {
        console.log(msg);
      }
}
