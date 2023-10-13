import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-page',
  templateUrl: './splash-page.component.html',
  styleUrls: ['./splash-page.component.css']
})
export class SplashPageComponent {
    constructor(public router: Router) {}

    LoginButton(): void{
        this.router.navigate(['Login']);
    }

    SigninButton(): void{
        this.router.navigate(['Signin']);
    }
}
