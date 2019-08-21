import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-enterprise/chartsModule';

import { FormsModule } from "@angular/forms"; // <-- NgModel lives here

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
	FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
