import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { style } from '@angular/animations';
import { Signin } from '../signin';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
    msg: string = "";
    signinRef = new FormGroup({
        firstname: new FormControl(),
        lastname: new FormControl(),
        address: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        confirmpassword: new FormControl()
    });
    constructor(public router: Router) { }

    async signinButton(): Promise<void> {
        // This is the function that is called when the signin button is pressed
        let signin = this.signinRef.value;
        if(signin.password == signin.confirmpassword){
            const didClientAdd: boolean = await this.addNewClient(signin);
            if(didClientAdd){
                this.msg = "Account created successfully";
                this.router.navigate(["Dashboard"], { skipLocationChange: true });
            } else {
                this.msg = "Account creation failed";
                console.log(didClientAdd);
            }
        } else {
            this.msg = "Passwords do not match";
        }
        this.signinRef.reset();
    }

    async addNewClient(SinginRef: any): Promise<boolean>{
        return false;
    }

    

}
