import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';


import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BtnstyleDirective } from './Directives/btnstyle.directive';
import { FilterPipe } from '../app/Pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltertitlePipe } from './Pipes/filtertitle.pipe';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { HttpClientModule } from '@angular/common/http';
import { ApplyComponent } from './apply/apply.component';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BtnstyleDirective,
    FilterPipe,
    FiltertitlePipe,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    ApplyComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
