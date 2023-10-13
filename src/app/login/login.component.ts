import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import { LoginService } from '../login.service';
import { style } from '@angular/animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    msg: string = "";
    loginRef = new FormGroup({
        emailid: new FormControl(),
        password: new FormControl()
    });
    constructor(public loginService: LoginService, public router: Router) {}

    LoginButton(): void{
        let login = this.loginRef.value;
        if(this.loginService.checkLoginDetails(login)){
            this.router.navigate(["Dashboard"],{skipLocationChange: true});
        }else{
            this.msg = "Invalid login details";
        }
        this.loginRef.reset();

    }
}
