import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import RoutingModule from './routing/routing.module';
import MaterialModule from './material/material.module';

import AppComponent from './app.component';
import HomeComponent from './pages/home/home.component';
import HeaderComponent from './components/header/header.component';
import SidenavListComponent from './components/sidenav-list/sidenav-list.component';
import TextbookComponent from './pages/textbook/textbook.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    TextbookComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    RoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppModule { }
