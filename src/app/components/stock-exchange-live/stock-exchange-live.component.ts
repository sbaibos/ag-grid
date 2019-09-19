import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-enterprise/chartsModule';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-stock-exchange-live',
  templateUrl: './stock-exchange-live.component.html',
  styleUrls: ['./stock-exchange-live.component.scss']
})
export class StockExchangeLiveComponent implements OnInit {

  private gridApi;
	private gridColumnApi;
	
	private columnDefs:any[];
  private defaultColDef;
  private rowSelection;
  private rowModelType;
  private getRowNodeId;
  private components;
  private rowData: any[];
	@ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'Stock Exchange';
  currentDate = new Date();
  myUtcDate: Date;
 

  

//rowData : any;

constructor(private http: HttpClient) {
	
	this.columnDefs = [

   {headerName: 'Symbol', field: 'symbol', sortable: true, filter: true, chartDataType: "category" },
   {headerName: 'Sector', field: 'sector', sortable: true, filter: true, editable: true, chartDataType: "series"},
	{headerName: 'Security Type', field: 'securityType', sortable: true, filter: true, editable: true, chartDataType: "series"},
	{headerName: 'Bid Price', field: 'bidPrice', sortable: true, filter: true, editable: true, chartDataType: "series",cellRenderer: "agAnimateShowChangeCellRenderer"},
	{headerName: 'Bid Size', field: 'bidSize', sortable: true, filter: true, editable: true, chartDataType: "series",cellRenderer: "agAnimateShowChangeCellRenderer"},
	{headerName: 'Ask Price', field: 'askPrice', sortable: true, filter: true, editable: true, chartDataType: "series",cellRenderer: "agAnimateShowChangeCellRenderer"},
	{headerName: 'Ask Size', field: 'askSize', sortable: true, filter: true, editable: true, chartDataType: "series",cellRenderer: "agAnimateShowChangeCellRenderer"},
	{headerName: 'Last Updated Volume', field: 'lastUpdated', sortable: true, filter: true, editable: true , chartDataType: "series",cellRenderer: "agAnimateShowChangeCellRenderer"},
	{headerName: 'Last Sale Size', field: 'lastSaleSize', sortable: true, filter: true, editable: true, chartDataType: "series"},
	{headerName: 'Volume', field: 'volume', sortable: true, filter: true, editable: true, chartDataType: "series",cellRenderer: "agAnimateShowChangeCellRenderer"},
	{headerName: 'Market Percent', field: 'marketPercent', sortable: true, filter: true, editable: true, chartDataType: "series"}
	
	
	
];


// this.columnDefs = [
    // {headerName: 'Name', field: 'name', sortable: true, filter: true, checkboxSelection: true,rowGroup: true, hide: true,chartDataType: "excluded" },
    // {headerName: 'Date', field: 'date', sortable: true, filter: true, editable: true, chartDataType: "category"},
	// {headerName: 'Open', field: 'open', sortable: true, filter: true, chartDataType: "series",
        // cellRenderer: "agAnimateShowChangeCellRenderer"},
	// {headerName: 'High', field: 'high', sortable: true, filter: true, editable: true, chartDataType: "series"},
	// {headerName: 'Low', field: 'low', sortable: true, filter: true, editable: true, chartDataType: "series"},
	// {headerName: 'Close', field: 'close', sortable: true, filter: true, editable: true, chartDataType: "series"},
	// {headerName: 'Volume', field: 'volume', sortable: true, filter: true, editable: true, chartDataType: "series"},
	// {headerName: 'Adjusted Volume', field: 'adj_volume', sortable: true, filter: true, editable: true , chartDataType: "series"},
	// {headerName: 'Adjusted High', field: 'adj_high', sortable: true, filter: true, editable: true, chartDataType: "series"},
	// {headerName: 'Adjusted low', field: 'adj_low', sortable: true, filter: true, editable: true, chartDataType: "series"}
	
	
	
// ];

this.defaultColDef = { resizable: true };
    this.rowSelection = "multiple";
    this.rowModelType = "viewport";
    this.getRowNodeId = function(data) {
      return data.code;
    };
    this.components = {
      rowIdRenderer: function(params) {
        return "" + params.rowIndex;
      }
    };
	

}
z;
timer;
ngOnInit() {
    this.myUtcDate = new Date(Date.UTC(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      this.currentDate.getDate(),
      this.currentDate.getHours(),
      this.currentDate.getMinutes(),
      this.currentDate.getSeconds()
    ));
	//this.rowData = this.http.get('https://api.iextrading.com/1.0/tops');
	
	this.nasdaq(this.UsaTimeHours);
	this.testFunction(this.z);
}

 usaTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
  UsaTimeHours = new Date(this.usaTime).getHours();
   UsaTimeMinutes =new Date(this.usaTime).getMinutes();
  UsaTimeSeconds =new Date(this.usaTime).getSeconds();

nasdaqCloseHours = (this.UsaTimeHours - 16) * -1 ;
nasdaqOpenHours = (24 + 9 -this.UsaTimeHours );
nasdaqOpenHours2 = (9-this.UsaTimeHours);


nasdaqMinutes = (60 - this.UsaTimeMinutes)  ;
nasdaqSeconds = (60 - this.UsaTimeSeconds ) ;

testFunction(z){

  let x: number = 10, y = 20;
  let z: string;

  if (x > y) 
  {
      console.log('x is greater than y.');
	  
  } 
  else if (x < y)
  {
      console.log('x is less than y.'); //This will be executed
	  this.z= "x is less than y."
	  return this.z;
  }
  else if (x == y) 
  {
      console.log('x is equal to y');
  }


}

nasdaq(UsaTimeHours){

  

  if (9 <= this.UsaTimeHours && this.UsaTimeHours<= 16) 
  {
      
	  this.timer =  "NASDAQ will close in " + this.nasdaqCloseHours +  " hours  " + this.nasdaqMinutes + " minutes " + this.nasdaqSeconds + " seconds"; 
	  console.log(this.timer);
	  return this.timer;
	  
  } 
   if (17 <= this.UsaTimeHours && this.UsaTimeHours <= 24)
  {
      
	  this.timer =  "NASDAQ will open in " + this.nasdaqOpenHours  + " hours  " + this.nasdaqMinutes + " minutes" + this.nasdaqSeconds + " seconds" ; 
	  console.log(this.timer);
	  return this.timer;
  }
   if (1 <= this.UsaTimeHours && this.UsaTimeHours <= 8) 
  {
      
	  this.timer =  "NASDAQ will open in " + this.nasdaqOpenHours2  + " hours  " + this.nasdaqMinutes + " minutes " + this.nasdaqSeconds + " seconds"; 
	  console.log(this.timer);
	  return this.timer;
  }


}


onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    //this.rowData = this.http.get('http://localhost/websites/grid_api/objects/readStock.php');
 // this.rowData =  this.http.get('https://api.iextrading.com/1.0/tops');

  this.http.get("https://api.iextrading.com/1.0/tops").subscribe(data => {
    this.rowData = Object.values(data);
    setTimeout(function() {
      params.api.sizeColumnsToFit();
    }, 100);
  });



  
  }

onUpdateSomeValues() {
    var rowCount = this.gridApi.getDisplayedRowCount();
    for (var i = 0; i < 100; i++) {
      var row = Math.floor(Math.random() * rowCount);
      var rowNode = this.gridApi.getDisplayedRowAtIndex(row);
      rowNode.setDataValue("bidPrice", Math.floor(Math.random() * 10000));
      rowNode.setDataValue("bidSize", Math.floor(Math.random() * 10000));
	  rowNode.setDataValue("askPrice", Math.floor(Math.random() * 10000));
    }
  }
  
  

}//end class
function numberFormatter(params) {
  if (typeof params.value === "number") {
    return params.value.toFixed(2);
  } else {
    return params.value;
  }
}
