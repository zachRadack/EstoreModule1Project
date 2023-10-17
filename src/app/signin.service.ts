import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Signin } from './signin';
@Injectable({
    providedIn: 'root'
})
export class SigninService {

    constructor(public http: HttpClient) { }    // DI for HttpClient 

    async pushClient(newClient: any): Promise<boolean> {
        try {
            let newClientData = new Signin(newClient.email, newClient.password, newClient.firstname, newClient.lastname, newClient.address);
            const ClientDetails = this.http.put("http://localhost:3000/accounts/4", JSON.stringify(newClientData));
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
        return false
    }
    log(msg: any) {
        console.log(msg);
      }
}
