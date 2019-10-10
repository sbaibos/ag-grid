import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-enterprise/chartsModule';
import {formatDate} from '@angular/common';
import { Observable, Observer, Subscription, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
//import 'rxjs/add/observable/interval';



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
  private nasdaqueTime;
  private stockData;
  private newData;
	@ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'Stock Exchange';
  currentDate = new Date();
  myUtcDate: Date;
 
  observable: Observable<string>;
  observer: Observer<string>;
  subscription: Subscription;
  

//rowData : any;

constructor(private http: HttpClient) {

  

	this.columnDefs = [

   {headerName: 'Symbol', field: 'symbol', sortable: true, filter: true, chartDataType: "category" },
   {headerName: 'Sector', field: 'sector', sortable: true, filter: true, editable: true, chartDataType: "series"},
	{headerName: 'Security Type', field: 'securityType', sortable: true, filter: true, editable: true, chartDataType: "series"},
	{headerName: 'Bid Price', field: 'bidPrice', sortable: true, filter: true, editable: true, chartDataType: "series",cellRenderer: "agAnimateShowChangeCellRenderer", valueParser: "Number(newValue)"},
	{headerName: 'Bid Size', field: 'bidSize', sortable: true, filter: true, editable: true, chartDataType: "series",cellRenderer: "agAnimateShowChangeCellRenderer",valueParser: "Number(newValue)"},
	{headerName: 'Ask Price', field: 'askPrice', sortable: true, filter: true, editable: true, chartDataType: "series",cellRenderer: "agAnimateShowChangeCellRenderer",valueParser: "Number(newValue)"},
	{headerName: 'Ask Size', field: 'askSize', sortable: true, filter: true, editable: true, chartDataType: "series",cellRenderer: "agAnimateShowChangeCellRenderer",valueParser: "Number(newValue)"},
	{headerName: 'Last Updated Volume', field: 'lastUpdated', sortable: true, filter: true, editable: true , chartDataType: "series",cellRenderer: "agAnimateShowChangeCellRenderer",valueParser: "Number(newValue)"},
	{headerName: 'Last Sale Size', field: 'lastSaleSize', sortable: true, filter: true, editable: true, chartDataType: "series"},
	{headerName: 'Volume', field: 'volume', sortable: true, filter: true, editable: true, chartDataType: "series",cellRenderer: "agAnimateShowChangeCellRenderer",valueParser: "Number(newValue)"},
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
	this.testFunction();
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

testFunction(){

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
    //this.gridApi.refreshCells(params.api);
    this.gridColumnApi = params.columnApi;

   
// this.gridApi.setRowData(this.rowData);

// this.gridApi.forEachNodeAfterFilterAndSort(function (rowData) {

//   this.rowNode.setDataValue("bidPrice","data.bidPrice");
  
  
//   });
    //this.rowData = this.http.get('http://localhost/websites/grid_api/objects/readStock.php');
 //var rowData =  this.http.get('https://api.iextrading.com/1.0/tops');



 
  this.http.get("https://api.iextrading.com/1.0/tops").subscribe(data => {
   this.rowData = Object.values(data);
    
  //this.rowData = data;
    
  
 });


 

//    setInterval(()=>{
    
//     this.http.get("https://api.iextrading.com/1.0/tops").subscribe(data => {
//       this.rowData = Object.values(data);
   
  
//       this.gridApi.UpdateRowData(this.rowData) ;
  
//  });
  
    
  
  
//   },3000);



  
  }

  
  onBtForEachNode() {
  console.log("### api.forEachNode() ###");
  this.gridApi.forEachNode(this.printNode);
  
}

printNode(node, index) {
  if (node.group) {
    console.log(index + " -> group: " + node.key);
  } else {
    console.log(index + " -> data: " + node.data.symbol + ", " + node.data.bidPrice);
    
  }
  
  
  

}


  

bachUpdate(){

   // setInterval(()=>{
    
    // this.http.get("https://api.iextrading.com/1.0/tops").subscribe(data => {
      // this.rowData = Object.values(data);
   
  
      // this.gridApi.UpdateRowData(this.rowData) ;
  
 // });
  
    
  
  
  // },3000);
  
 
    
    this.http.get("https://api.iextrading.com/1.0/tops").subscribe(data => {
    var  newData = Object.values(data);;
   
  
      this.gridApi.UpdateRowData(newData) ;
	  
	 // this.gridApi.setDataValue(newData) ;
	  
	  
  
 });
  
    
  
  
    
  

}
  

onUpdateSomeValues() {
	
	
	
 

	
	
  var rowCount = this.gridApi.getDisplayedRowCount();
  for (var i = 0; i < 100; i++) {
    var row = Math.floor(Math.random() * rowCount);
    var rowNode = this.gridApi.getDisplayedRowAtIndex(row);
    rowNode.setDataValue("bidPrice",Math.floor(Math.random() * 10000));
    rowNode.setDataValue("bidSize", Math.floor(Math.random() * 10000));
  rowNode.setDataValue("askPrice", Math.floor(Math.random() * 10000));
  
 
}





 // this.columnDefs['bidSize'])
 for (var key in rowNode) {
    console.log(rowNode[key]);
}


  
}






}//end class



  //find the new york NASDAQ time--------------
var now = new Date();
var nowMs = now.getTime();
  var localOffset = now.getTimezoneOffset();
  //get usa offset to any local time

 var usaOffset =  -1* localOffset + 4 * 60

  //get usa date now,get hours minutes 

  var offsetTime = usaOffset * 60 * 1000; //in ms
  var usaDate = new Date(nowMs - offsetTime);
  var usaHour = usaDate.getHours();
  var usaMinutes = usaDate.getMinutes();
  


//alternate way of calculating usa time
  // usaDate2 = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
  // UsaTimeHours2 = new Date(this.usaDate2).getHours();
  //  UsaTimeMinutes2 =new Date(this.usaDate2).getMinutes();
  // UsaTimeSeconds2 =new Date(this.usaDate2).getSeconds();
  // usaTime = usaDate2.getTime();  //string cannot be converted into ms

 
  
  //---test time-------
//  var testUsaTime = usaDate;
//  testUsaTime.setHours(0);
// testUsaTime.setMinutes(0);
//  testUsaTime.setSeconds(0);
// var usaHour=testUsaTime.getHours();
// var usaMinutes = testUsaTime.getMinutes();
//  document.getElementById("testUsaHours").innerHTML = "Usa Hour is "  + usaHour +" hours " + usaMinutes +" minutes";
   //---test time-------

//usa time between  00 and 9 29

  if((0 <= usaHour && usaHour <= 8) || ( usaHour == 9 && 1 <=usaMinutes && usaMinutes <=29 ) ){
  var nasdaqueTime = new Date();
nasdaqueTime.setHours(9);
nasdaqueTime.setMinutes(30);
nasdaqueTime.setSeconds(0);
var nasdaquesMS = nasdaqueTime.getTime()


// Update the count down every 1 second
var x = setInterval(function() {


  
  //get usa ms now 

  var now = new Date();
var nowMs = now.getTime();
  var localOffset = now.getTimezoneOffset();
  //get usa offset to any local time

  var usaOffset =  -1* localOffset + 4 * 60

var offsetTime = usaOffset * 60 * 1000; //in ms
 var  usaDate = new Date(nowMs - offsetTime);
  var usaTime = usaDate.getTime();

   

 var  usaHour = usaDate.getHours();
 var usaMinutes = usaDate.getMinutes();
 var usaSeconds = usaDate.getSeconds();



  
    
  // Find the distance between now and the count down date
  var distance = nasdaquesMS - usaTime;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  document.getElementById("usaTime").innerHTML = "New York time now is  "  + usaHour + "h "
  + usaMinutes + "m " + usaSeconds + "s ";

  // Output the result in an element with id="demo"
  document.getElementById("timer").innerHTML = "NASDAQ will open in " + hours + "h "
  + minutes + "m " + seconds + "s ";


  
    
  
}, 1000);
  }
  // usa between 9 30 - 1700
  else if( (usaHour == 9 && 30 <=usaMinutes  && usaMinutes <=59) || (10 <= usaHour && usaHour <= 15) || ( usaHour == 16 && 1 <=usaMinutes  && usaMinutes >=59) ){
    var nasdaqueTime = new Date();
nasdaqueTime.setHours(17);
nasdaqueTime.setMinutes(0);
nasdaqueTime.setSeconds(0);
var nasdaquesMS = nasdaqueTime.getTime()


// Update the count down every 1 second
var x = setInterval(function() {

  //get usa ms now 
var now = new Date();

var nowMs = now.getTime();
  var localOffset = now.getTimezoneOffset();
  //get usa offset to any local time

 var usaOffset =  -1* localOffset + 4 * 60

var offsetTime = usaOffset * 60 * 1000; //in ms
 var usaDate = new Date(nowMs - offsetTime);
 var  usaTime = usaDate.getTime();

 var  usaHour = usaDate.getHours();
 var usaMinutes = usaDate.getMinutes();
 var usaSeconds = usaDate.getSeconds();


    
  // Find the distance between now and the count down date
  var distance = nasdaquesMS - usaTime;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  document.getElementById("usaTime").innerHTML = "New York time now is  "  + usaHour + "h "
  + usaMinutes + "m " + usaSeconds + "s ";

  // Output the result in an element with id="demo"
  document.getElementById("timer").innerHTML = "NASDAQ will close in "  + hours + "h "
  + minutes + "m " + seconds + "s " ;
  
    
  
}, 1000);
   
   }
  //usa time between 17 31 and 23 59
  else if( (usaHour == 17 && 0 <=usaMinutes && usaMinutes <= 59) || ( 18 <= usaHour && usaHour <= 22  ) || (usaHour == 23 && 1 <=usaMinutes && usaMinutes <= 59 )) {
  // Set the date we're counting down to
  var nasdaqueTime = new Date();
nasdaqueTime.setHours(21);
nasdaqueTime.setMinutes(30);
nasdaqueTime.setSeconds(0);
var nasdaquesMS = nasdaqueTime.getTime();


// Update the count down every 1 second
var x = setInterval(function() {
// Get today's date and time
var now = new Date();

var nowMs = now.getTime();
  var localOffset = now.getTimezoneOffset();
  //get usa offset to any local time

  var usaOffset =  -1* localOffset + 4 * 60

  var offsetTime = usaOffset * 60 * 1000; //in ms
  var usaDate = new Date(nowMs - offsetTime);
  var  usaTime = usaDate.getTime();

  var usaHour = usaDate.getHours();
  var usaMinutes = usaDate.getMinutes();
  var usaSeconds = usaDate.getSeconds();


 
    
  // Find the distance between now and the count down date
  var distance =  nasdaquesMS - usaTime ;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  document.getElementById("usaTime").innerHTML = "New York time now is  "  + usaHour + "h "
  + usaMinutes + "m " + usaSeconds + "s ";

  // Output the result in an element with id="demo"
  document.getElementById("timer").innerHTML = "NASDAQ will open in "  + hours + "h "
  + minutes + "m " + seconds + "s ";
  
    
  
}, 1000);
  
  }

