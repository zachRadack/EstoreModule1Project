import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
    userName: string = "";
    userUnquiueId: any = "";
    constructor(public router: Router,private builder: FormBuilder) { }
    logout(): void{
        sessionStorage.removeItem("userName");
        this.router.navigate(["Login"]);
    }
    ngOnInit(): void{

        let obj = sessionStorage.getItem("userName");
        let objId =sessionStorage.getItem("userID");
        console.log(obj);
        if(obj != null){
            console.log("Welcome to the Dashboard");

            this.userName = obj;
            this.userUnquiueId = objId;
        }else{
            console.log("Please login");
            //this.router.navigate(["Login"]);
        }
        console.log("Dashboard");
    }

    meetingSetup(): void{
        this.router.navigate(["Meetings"]);
    }


}
