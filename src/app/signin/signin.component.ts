import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { style } from '@angular/animations';
import { Signin } from '../signin';
import { SigninService } from '../signin.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
    msg: string = "";
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
    constructor(public router: Router,public SigninService: SigninService) { }

    async signinButton(): Promise<void> {
        // This is the function that is called when the signin button is pressed
        let signin = this.signinRef.value;
        if(signin.password == signin.confirmpassword){
            this.SigninService.pushClient(signin).subscribe(data =>console.log(data));
            sessionStorage.setItem("userName", signin.firstname);
            sessionStorage.setItem("userEmail", signin.email);
            this.router.navigate(["Login"]);

        } else {
            this.msg = "Passwords do not match";
        }
        this.signinRef.reset();
    }



    

}
