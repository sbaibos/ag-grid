import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StockExchangeComponent} from "./components/stock-exchange/stock-exchange.component";
import {StockMarketsComponent} from "./components/stock-markets/stock-markets.component";
import {StockExchangeLiveComponent} from "./components/stock-exchange-live/stock-exchange-live.component";
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
 { path: '', component: HomeComponent},
 { path: 'home', component: HomeComponent},
 {path: 'stock-exchange-live', component: StockExchangeLiveComponent, canActivate: [AuthGuard]},
 { path: 'stock-exchange', component: StockExchangeComponent, canActivate: [AuthGuard]},
 { path: 'stock-markets', component: StockMarketsComponent, canActivate: [AuthGuard] },
 { path: 'stock-exchange-live', component: StockExchangeLiveComponent },
 { path: 'stock-exchange', component: StockExchangeComponent },
 { path: 'stock-markets', component: StockMarketsComponent },
 { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
