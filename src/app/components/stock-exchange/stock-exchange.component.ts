import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-enterprise/chartsModule';


@Component({
  selector: 'app-stock-exchange',
  templateUrl: './stock-exchange.component.html',
  styleUrls: ['./stock-exchange.component.scss']
})
export class StockExchangeComponent implements OnInit {

   private gridApi;
  private gridColumnApi;
  
	@ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'Stock Exchange';
  
 

  columnDefs = [
    {headerName: 'Symbol', field: 'symbol', sortable: true, filter: true, chartDataType: "category" },
   {headerName: 'Price', field: 'price', sortable: true, filter: true, chartDataType: "series" },
   {headerName: 'Size', field: 'size', sortable: true, filter: true, chartDataType: "series" },
   {headerName: 'Time', field: 'time', sortable: true, filter: true, chartDataType: "excluded" },
  
	
	
	
];

rowData : any;

constructor(private http: HttpClient) {

}

ngOnInit() {
    
   
	
	this.rowData = this.http.get('https://api.iextrading.com/1.0/tops/last');
	
}




	



 


  

}
