import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-enterprise/chartsModule';
import { environment } from '../../../environments/environment';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-stock-markets',
  templateUrl: './stock-markets.component.html',
  styleUrls: ['./stock-markets.component.scss']
})
export class StockMarketsComponent implements OnInit {

  private rowData: any;
  private gridApi;
  private gridColumnApi;
  private rowData2: any;
  private rowSelection;
  private autoGroupColumnDef;

  @ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'Stock Markets';

  

  columnDefs = [
    { headerName: 'Name', field: 'name', sortable: true, filter: true, checkboxSelection: true, rowGroup: true, hide: true, chartDataType: "category" },
	{ headerName: 'Volume', field: 'volume', sortable: true, filter: true, editable: true, chartDataType: "series",valueFormatter: CurrencyCellRenderer, aggFunc: "sum"},
    { headerName: 'Date', field: 'date', sortable: true, filter: true, editable: true, chartDataType: "category" },
    { headerName: 'Open', field: 'open', sortable: true, filter: true, editable: true, chartDataType: "series", cellRenderer: "agAnimateShowChangeCellRenderer", valueParser: "Number(newValue)"},
    { headerName: 'High', field: 'high', sortable: true, filter: true, editable: true, chartDataType: "series" },
    { headerName: 'Low', field: 'low', sortable: true, filter: true, editable: true, chartDataType: "series" },
    { headerName: 'Close', field: 'close', sortable: true, filter: true, editable: true, chartDataType: "series"},
    
    { headerName: 'Adjusted Volume', field: 'adj_volume', sortable: true, filter: true, editable: true, chartDataType: "series",valueFormatter: CurrencyCellRenderer, aggFunc: "avg" },
    { headerName: 'Adjusted High', field: 'adj_high', sortable: true, filter: true, editable: true, chartDataType: "series",aggFunc: "avg" },
    { headerName: 'Adjusted low', field: 'adj_low', sortable: true, filter: true, editable: true, chartDataType: "series",aggFunc: "avg" }



  ];






  constructor(private http: HttpClient) {
    this.rowSelection = "multiple";
	
	 this.autoGroupColumnDef = {
      headerName: "Name",
      field: "",
      width: 200,
      cellRenderer: "agGroupCellRenderer"
	  // cellRendererParams: { checkbox: true }
     
    };
	
			
  }
  //baseUrl = environment.baseUrl;
  
  
 
    // we set the value cache in the function createGrid below
    // valueCache = true / false;
    
    

  
  
  

  ngOnInit() {
    //this.rowData = this.http.get('http://sbaibos.com/sotostheme/api/grid_api/objects/readStock.php');
    //this.rowData = this.http.get(this.baseUrl);
    //this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
    this.rowData = this.http.get('http://localhost/websites/grid_api/objects/readStock.php');
    // this.rowData = this.http.get('https://api.myjson.com/bins/ly7d1');


  }

  // getSelectedRows() {
  // const selectedNodes = this.agGrid.api.getSelectedNodes();
  // const selectedData = selectedNodes.map( node => node.data );
  // const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
  // alert(`Selected nodes: ${selectedDataStringPresentation}`);
  // }


  // chartGroupedColumn() {
  //   var cellRange = {
  //     rowStartIndex: 0,
  //     rowEndIndex: 100,
  //     columns: ["name","date", "volume"]
  //   };
  //   var chartRangeParams = {
  //     cellRange: cellRange,
  //     chartType: "line"
  //   };
  //   this.agGrid.api.chartRange(chartRangeParams);
  // }


  updateSelected() {
    var selectedRow = this.gridApi.getSelectedRows();
    console.log(selectedRow);
    //debugger;
    // console.log(this.agGrid);
    // const selectedNodes = this.agGrid.api.getSelectedNodes(); debugger;
    // const selectedData = selectedNodes.map(node => node.data);
    // const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
    // alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }



  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }


  updateColumn() {
    this.rowData2 = this.http.get('http://localhost/websites/grid_api/objects/readStock.php');
     
	var gridApi1 = this.gridApi;
    this.rowData2.forEach(function (value) {

	var gridApi2 = gridApi1;

      //console.log(value);//array with all stockmarket values

      for (var i in value) {
		  
 var rowNode = gridApi2.getDisplayedRowAtIndex(i);
  rowNode.setDataValue("open", value[i]["open"]);
      
      }

    }); //end foreach


  }//end update column 

  
    
  

  SetRandomData() {


    var rowCount = this.gridApi.getDisplayedRowCount();//8869
    for (var i = 1; i < 11; i++) {
      // var row = Math.floor(10 * rowCount);//a random number
      var rowNode = this.gridApi.getDisplayedRowAtIndex(i);//object object, Returns the displayed rowNode at the given index.
      rowNode.setDataValue("open", Math.floor(Math.random() * 10000));

      //console.log(rowNode);

      // console.log("row count is "+rowCount);
      // console.log("row is "+row);
      // console.log("rownode is "+ rowNode)

    }

  }




  // setData() {

   // this.rowData2 = this.http.get('http://localhost/websites/grid_api/objects/readStock.php');
	
	// var gridApi1 = this.gridApi;
    // this.rowData2.forEach(function (value) {

	// var gridApi2 = gridApi1;

      // //console.log(value);//array with all stockmarket values

      // for (var i in value) {
		  
 // var rowNode = gridApi2.getDisplayedRowAtIndex(i);
        
// var newData  = {
        // open: value[i]["open"],
        // close: value[i]["close"]
      // };
	  
	  // rowNode.setData(newData);
      // }

    // }); //end foreach
	 
     
  // }//end set data


 // setData2() {
  
// for (var i = 0; i < 3; i++) {
   // var array1 = [1,2,3,4];//array  1,2,3,4
   // var array2 = [5,6,7,8];
      // var rowNode = this.gridApi.getDisplayedRowAtIndex(i);

       
    
       // var openValues = array1[i];//array  values
      // var closeValues = array2[i];
	  // console.log(openValues);
    // var newData = {
        // open: openValues,
      // high: closeValues
    // };
// rowNode.setData(newData);
      // }//end for
	  
   // }//end set data 2



}//end class

function CurrencyCellRenderer(params:any) {

    var usdFormate = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });
    return usdFormate.format(params.value);
}

