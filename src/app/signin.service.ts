import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Signin } from './signin';
@Injectable({
    providedIn: 'root'
})
export class SigninService {

    constructor(public http: HttpClient) { }    // DI for HttpClient 

    pushClient(newClient: any): boolean {
        try {
            let newClientData = new Signin(newClient.email, newClient.password, newClient.firstname, newClient.lastname, newClient.address);
            const ClientDetails = this.http.post<Signin[]>("http://localhost:3000/accounts/", newClientData, { responseType: 'json', headers: { 'Content-Type': 'application/json' } });
            console.log("http://localhost:3000/accounts/", Signin);
            console.log(ClientDetails);

            if (ClientDetails) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    log(msg: any) {
        console.log(msg);
      }
}
