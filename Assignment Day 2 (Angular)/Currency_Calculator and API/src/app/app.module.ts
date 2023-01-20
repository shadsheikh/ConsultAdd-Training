import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ApiComponent } from './api/api.component';
import { HttpClientModule } from "@angular/common/http";
import { CurrenyConverterComponent } from './curreny-converter/curreny-converter.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrenyConverterComponent,
    ApiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
