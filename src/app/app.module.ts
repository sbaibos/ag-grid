import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import 'ag-grid-enterprise';
import { StockExchangeComponent } from './components/stock-exchange/stock-exchange.component';
import { StockMarketsComponent } from './components/stock-markets/stock-markets.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { StockExchangeLiveComponent } from './components/stock-exchange-live/stock-exchange-live.component';

@NgModule({
  declarations: [
    AppComponent,
    StockExchangeComponent,
    StockMarketsComponent,
    HomeComponent,
    StockExchangeLiveComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
	AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
