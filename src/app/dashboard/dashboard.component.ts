import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    userName: string = "";
    constructor(public router: Router) { }
    logout(): void{
        sessionStorage.removeItem("userName");
        this.router.navigate(["Login"]);
    }
    ngOnInit(): void{
        let obj = sessionStorage.getItem("userName");
        console.log(obj);
        if(obj != null){
            console.log("Welcome to the Dashboard");
            this.userName = obj;
            
        }else{
            console.log("Please login");
            //this.router.navigate(["Login"]);
        }
        console.log("Dashboard");
    }
}
