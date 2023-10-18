import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashPageComponent } from './splash-page/splash-page.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MeetingsComponent } from './meetings/meetings.component';

const routes: Routes = [
    { path:"", component: SplashPageComponent},
    { path:"Login", component: LoginComponent},
    { path:"Signin", component: SigninComponent},
    { path:"Dashboard", component: DashboardComponent},
    { path:"Meetings", component: MeetingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
