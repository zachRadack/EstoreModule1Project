import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';
import { style } from '@angular/animations';
import { Login } from '../login';
import { lastValueFrom } from 'rxjs';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    msg: string = "";
    flags: boolean = false;
    loginRef = new FormGroup({
        emailid: new FormControl(),
        password: new FormControl()
    });
    constructor(public loginService: LoginService, public router: Router) { }

    async LoginButton(): Promise<void> {

        let login = this.loginRef.value;
        if (await this.checkLoginDetails(login)) {
            console.log("Login successful")
            this.router.navigate(["Dashboard"], { skipLocationChange: true });
        } else {
            console.log("Login failed")
            this.msg = "Invalid login details";
        }
        this.loginRef.reset();

    }


    async checkLoginDetails(loginRef: any): Promise<boolean> {
        //Logins:Array<Login> = [];
        let Logins: Login[] = [];
        const returnEmails: any  = await lastValueFrom(this.loginService.loadEmails());

        console.log(returnEmails);
        console.log("Test");
        for (let i = 0; i < returnEmails.length; i++) {
            Logins.push(new Login(returnEmails[i].id, returnEmails[i].email, returnEmails[i].password, returnEmails[i].userID));
        }

        console.log(Logins);

        for (let i = 0; i < Logins.length; i++) {
            if (loginRef.emailid == Logins[i].email && loginRef.password == Logins[i].password) {
                this.flags = true;
                console.log("yay");
                return true;
            } else {
                console.log("nah");
                console.log(loginRef.emailid);
                console.log(Logins[i].email);
                console.log(loginRef.password);
                console.log(Logins[i].password);
            }
        }
        return false;

    }
}

