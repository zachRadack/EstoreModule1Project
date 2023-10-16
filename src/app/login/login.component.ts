import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import { LoginService } from '../login.service';
import { style } from '@angular/animations';
import { Login } from '../login';
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
            console.log("Login successful")
            this.router.navigate(["Dashboard"],{skipLocationChange: true});
        }else{
            console.log("Login failed")
            this.msg = "Invalid login details";
        }
        this.loginRef.reset();

    }

    
    checkLoginDetails(loginRef: any) : boolean {
        //Logins:Array<Login> = [];
        let flag = false;
        let Logins:Login[] = [];
        this.loginService.loadEmails().subscribe({
            next:(result:any)=> {
                console.log(result);
                console.log("Test");

                if(loginRef.emailid == Logins[0].email && loginRef.password == Logins[0].password){
                    
                    flag = true;
                }else{
                    console.log("nahhhh");
                    

                }
                Logins=result;
            },
            error:(error:any)=> {
            console.log("error");
            console.log(error);
            return false;
            },
            complete:()=> {
            console.log("done!")
            if (flag == true){
                console.log("Test1");
            return true;
            }else{
                console.log("Test1.1");
                return false;   
            }}
        })
        console.log("Test2");
        return false;
    }
    }

    