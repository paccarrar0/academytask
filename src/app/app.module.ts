import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./home/home.component";
import { CardComponent } from "./card/card.component";
import { HeaderComponent } from "./header/header.component";
import { Router } from "express";
import { RouterOutlet } from "@angular/router";

@NgModule({
  imports:      [ BrowserModule, HttpClientModule, RouterOutlet],
  declarations: [ AppComponent, HomeComponent, CardComponent, HeaderComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }