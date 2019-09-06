import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import 'ag-grid-enterprise';
import { StockExchangeComponent } from './components/stock-exchange/stock-exchange.component';
import { StockMarketsComponent } from './components/stock-markets/stock-markets.component';


@NgModule({
  declarations: [
    AppComponent,
    StockExchangeComponent,
    StockMarketsComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
