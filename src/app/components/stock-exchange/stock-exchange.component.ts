import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-enterprise/chartsModule';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-stock-exchange',
  templateUrl: './stock-exchange.component.html',
  styleUrls: ['./stock-exchange.component.scss']
})
export class StockExchangeComponent implements OnInit {

   private gridApi;
  private gridColumnApi;
  private rowData2: any;
   private transactionInterval;
   
  
	@ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'Stock Exchange';
  
 

  columnDefs = [
    {headerName: 'Symbol', field: 'symbol', sortable: true, filter: true, chartDataType: "category" },
   {headerName: 'Price', field: 'price', sortable: true, filter: true, editable: true, chartDataType: "series",cellRenderer: "agAnimateShowChangeCellRenderer", valueParser: "Number(newValue)",valueFormatter: CurrencyCellRenderer },
   {headerName: 'Size', field: 'size', sortable: true, filter: true, editable: true, chartDataType: "series",cellRenderer: "agAnimateShowChangeCellRenderer", valueParser: "Number(newValue)" },
   {headerName: 'Time', field: 'time', sortable: true, filter: true, chartDataType: "excluded"},
  
	
	
	
];

rowData : any;

constructor(private http: HttpClient) {

}

ngOnInit() {
    
   
	
	this.rowData = this.http.get('https://api.iextrading.com/1.0/tops/last');
	
}

onGridReady(params) {
    this.gridApi = params.api;
  
  }
  
  



// updateColumn() {
  // this.rowData2 = this.http.get('https://api.iextrading.com/1.0/tops/last');
   
// var gridApi1 = this.gridApi;
  // this.rowData2.forEach(function (value) {

// var gridApi2 = gridApi1;

    // //console.log(value);//array with all stockmarket values

    // for (var i in value) {
		
		
	    
// var rowNode = gridApi2.getDisplayedRowAtIndex(i);
// rowNode.setDataValue("price", value[i]["price"]);
// //rowNode.setDataValue("size", value[i]["size"]);

    
    // }

  // }); //end foreach


// }//end update column 


 SetRandomData() {


    var rowCount = this.gridApi.getDisplayedRowCount();//8869
    for (var i = 0; i < 11; i++) {
      // var row = Math.floor(10 * rowCount);//a random number
      var rowNode = this.gridApi.getDisplayedRowAtIndex(i);//object object, Returns the displayed rowNode at the given index.
      rowNode.setDataValue("price", Math.floor(Math.random() * 10000));

      //console.log(rowNode);

      // console.log("row count is "+rowCount);
      // console.log("row is "+row);
      // console.log("rownode is "+ rowNode)
    }
  }
  
  transactionUpdate2() {
		 var rowData2 = this.http.get('https://api.iextrading.com/1.0/tops/last');
    var itemsToUpdate = [];
	var arrayPrice2=[];
	var arrayPrice = [ 12,13,14,15,19];
	
	rowData2.forEach(function (value) {
			
			for(var i in value){
			//console.log(value[i]["price"]); //all price values
			arrayPrice2.push(value[i]["price"]);
			}
			});
	
console.log(arrayPrice2);
		
	this.gridApi.forEachNodeAfterFilterAndSort(function(rowNode, index) {
		 
      if (index >= 1) {
        return;
      }
	    var data = rowNode.data;//loop each array
	 		 //data.price = arrayPrice2[price];
			//console.log(arrayPrice2);
    	 	  
      itemsToUpdate.push(data);//array of 10 arrays
		  
    });
    this.gridApi.updateRowData({ update: itemsToUpdate });
	  	
  }//end get rowdata
  
  
  
 
  
  
  
transactionUpdate() {
  this.rowData2 = this.http.get('https://api.iextrading.com/1.0/tops/last');
   var itemsToUpdate = [];
var gridApi1 = this.gridApi;

  this.rowData2.forEach(function (value) {

var gridApi2 = gridApi1;

    //console.log(value);//array with all stockmarket values

    for (var i in value) {
    
var rowNode = gridApi2.getDisplayedRowAtIndex(i);

var data = rowNode.data;
	  
      data.price = value[i]["price"];
	  
      itemsToUpdate.push(data);
    
    }
	
	 

  }); //end foreach

  
this.gridApi.updateRowData({ update: itemsToUpdate });
}//end function
  
  
   startAlert(){
	   window.alert("transaction update started");
	    this.transactionInterval = setInterval(()=> {
	

this.transactionUpdate();



}, 3000);



	
}//end start alert interval

stopAlert(){

	clearInterval(this.transactionInterval);
	window.alert("transaction update stoped");
}

 


  

}//end class

function CurrencyCellRenderer(params:any) {

    var usdFormate = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });
    return usdFormate.format(params.value);
}



