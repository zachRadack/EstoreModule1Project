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
        // This is the function that is called when the login button is pressed
        let login = this.loginRef.value;

        // this sends a command to check out current email password combos to see if they match
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

        // This is a for loop that creates an array of Login objects
        // While beign seperated is not exactly optimal, this is meant to make it easier to upgrade
        // later on if we want to add more fields to the login object
        for (let i = 0; i < returnEmails.length; i++) {
            Logins.push(new Login(returnEmails[i].id, returnEmails[i].email, returnEmails[i].password, returnEmails[i].userID));
        }

        console.log(Logins);


        for (let i = 0; i < Logins.length; i++) {
            // this checks to see if any of the passwords and emails match
            if (loginRef.emailid == Logins[i].email && loginRef.password == Logins[i].password) {
                this.flags = true;
                return true;
            }
        }
        // No matching email password combos
        return false;

    }
}

