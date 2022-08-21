import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import RoutingModule from './routing/routing.module';
import MaterialModule from './material/material.module';

import AppComponent from './app.component';
import HomeComponent from './pages/home/home.component';
import HeaderComponent from './components/header/header.component';
import SidenavListComponent from './components/sidenav-list/sidenav-list.component';
import PopUpComponent from './components/pop-up/pop-up.component';
import AuthComponent from './components/auth/auth.component';
import AuthService from './services/auth.service';
import { PreLoaderComponent } from './components/pre-loader/pre-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    PopUpComponent,
    AuthComponent,
    PreLoaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export default class AppModule { }
