import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { style } from '@angular/animations';
import { Signin } from '../signin';
import { SigninService } from '../signin.service';
import { lastValueFrom } from 'rxjs';
import { Login } from '../login';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
    msg: string = "";
    flags: boolean = false;
    dataCreation: any;
    signinRef = new FormGroup({
        firstname: new FormControl(),
        lastname: new FormControl(),
        address: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        confirmpassword: new FormControl(),
        id: new FormControl()
    });
    constructor(public router: Router,public SigninService: SigninService,public loginService: LoginService) { }

    async signinButton(): Promise<void> {
        // This is the function that is called when the signin button is pressed
        let signin = this.signinRef.value;
        if(signin.password == signin.confirmpassword){
            this.SigninService.pushClient(signin).subscribe(data =>console.log(data));
            sessionStorage.setItem("userName", signin.firstname);
            sessionStorage.setItem("userEmail", signin.email);
            let login = {"emailid": signin.email, "password": signin.password}
            this.checkLoginDetails(login);
            this.router.navigate(["Login"]);

        } else {
            this.msg = "Passwords do not match";
        }
        this.signinRef.reset();
    }


    async checkLoginDetails(loginRef: any): Promise<boolean> {
      //Logins:Array<Login> = [];
      let Logins: Login[] = [];
      const returnEmails: any  = await lastValueFrom(this.loginService.loadEmails());

      // This is a for loop that creates an array of Login objects
      // While beign seperated is not exactly optimal, this is meant to make it easier to upgrade
      // later on if we want to add more fields to the login object
      let flag = returnEmails.find((element: any) => element.email == loginRef.emailid && element.password == loginRef.password);
      console.log(flag);
      if (flag != undefined) {
          this.flags = true;

          sessionStorage.setItem("userName", flag.firstname);
          sessionStorage.setItem("userEmail", flag.email);
          sessionStorage.setItem("userID", flag.id);
          return true;
      }

      // No matching email password combos
      return false;

  }




}
