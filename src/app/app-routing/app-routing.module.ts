import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { AboutComponent } from '../components/about/about.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { AuthGuardService } from '../Guards/auth-guard.service';
import { ApplyComponent } from '../apply/apply.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'jobs/:id',
    component: AboutComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'apply/:id',
    component: ApplyComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule {}
