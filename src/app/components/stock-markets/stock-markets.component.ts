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

  @ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'Stock Markets';

  // autoGroupColumnDef = {
  // headerName: 'Name',
  // field: 'name',
  // cellRenderer: 'agGroupCellRenderer',
  // cellRendererParams: {
  // checkbox: true
  // }
  // };

  columnDefs = [
    { headerName: 'Name', field: 'name', sortable: true, filter: true, checkboxSelection: true, rowGroup: true, hide: true, chartDataType: "excluded" },
    { headerName: 'Date', field: 'date', sortable: true, filter: true, editable: true, chartDataType: "category" },
    { headerName: 'Open', field: 'open', sortable: true, filter: true, editable: true, chartDataType: "series", cellRenderer: "agAnimateShowChangeCellRenderer", valueParser: "Number(newValue)" },
    { headerName: 'High', field: 'high', sortable: true, filter: true, editable: true, chartDataType: "series" },
    { headerName: 'Low', field: 'low', sortable: true, filter: true, editable: true, chartDataType: "series" },
    { headerName: 'Close', field: 'close', sortable: true, filter: true, editable: true, chartDataType: "series" },
    { headerName: 'Volume', field: 'volume', sortable: true, filter: true, editable: true, chartDataType: "series" },
    { headerName: 'Adjusted Volume', field: 'adj_volume', sortable: true, filter: true, editable: true, chartDataType: "series" },
    { headerName: 'Adjusted High', field: 'adj_high', sortable: true, filter: true, editable: true, chartDataType: "series" },
    { headerName: 'Adjusted low', field: 'adj_low', sortable: true, filter: true, editable: true, chartDataType: "series" }



  ];






  constructor(private http: HttpClient) {
    this.rowSelection = "multiple";
  }
  //baseUrl = environment.baseUrl;

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


  getSelectedRows() {
    const selectedRow = this.gridApi.getSelectedRows();
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


  getData() {
    this.rowData2 = this.http.get('http://localhost/websites/grid_api/objects/readStock.php');
    var OpenValues = [];
	var CloseValues = [];
	var data = [];
    this.rowData2.forEach(function (value) {


      //console.log(value);//array with all stockmarket values

      for (var i in value) {

        //console.log(value[i]["open"]); //open values
        OpenValues.push(value[i]["open"]);//array with open values
        CloseValues.push(value[i]["close"]);
       // console.log(itemsToUpdate);//array with open values
      }

    }); //end foreach
console.log(OpenValues);
    //return OpenValues;
data.push(OpenValues, CloseValues);
console.log(data);
    return data;
  }//end get data

  getRowNode() {

var rowNode;
    for (var i = 1; i < 11; i++) {
      // var row = Math.floor(10 * rowCount);//a random number
       rowNode = this.gridApi.getDisplayedRowAtIndex(i);//object object, Returns the displayed rowNode at the given index.




    }//end for
    return rowNode;

  }

  getSelectedRowNode() {
    var selectedRows = this.gridApi.getSelectedNodes();

    var selectedRowsString = [];

    selectedRows.forEach(function (selectedRow, index) {

      selectedRowsString.push(selectedRow.open);
    });

   
    //return selectedRowsString;

    return selectedRows;


  }



  updateColumn() {

    // for (var i = 0; i < 100; i++) {
    // var row = 100;
    // var rowNode = this.gridApi.getDisplayedRowAtIndex(1);
    // rowNode.setDataValue("bidPrice",Math.floor(Math.random() * 10000));
    // }


    this.rowNode = this.getRowNode();
    var itemsToUpdate = this.getData();


    // var itemsToUpdate2 = Object.values(itemsToUpdate[0][i]);

    this.rowNode.setDataValue("open", itemsToUpdate);







    //api.setRowData(itemsToUpdate);  




    // this.gridApi.updateRowData({ update: itemsToUpdate });
    //this.gridApi.setRowData(this.rowData2);

    // var newStore = [];
    // this.rowData2.forEach(function(item) {
    // newStore.push({
    // symbol: item.symbol,
    // group: item.group,
    // open: Math.floor(Math.random() * 100)
    // });
    // });
    // var  immutableStore = newStore;
    // this.gridApi.setRowData(immutableStore);






    // this.gridApi.forEachNodeAfterFilterAndSort(function(rowNode,rowData2, index) {
    // if (index >= 500) {
    // return;
    // }

    // var data = rowNode.data;
    // //data = rowNode.data;
    // //console.log(rowNode.data.symbol);
    // //data.bidPrice = Math.floor(Math.random() * 20000 + 20000);
    // data.high = rowData2.high;
    // itemsToUpdate.push(data);
    // });
    //var res = this.gridApi.updateRowData({ update: itemsToUpdate });



  }

  // var rowNode = this.gridApi.getDisplayedRowAtIndex(0);
  //  rowNode.setData(this.rowData2);


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




  setData() {

    this.rowData2 = this.http.get('http://localhost/websites/grid_api/objects/readStock.php');

    //var openArray = [];
	var closeArray = [];
    var rowNode = this.getRowNode();
    var data = this.getData();//array
console.log(data);

 var openArray = data[0];//open values array
 var closeArray= data[1];//close values array

console.log(openArray);


    for (var i = 0; i < 4; i++) {

      
      
      var openValues = openArray.0[i]; //undefined
	var closeValues = closeArray.0[i];//undefined
      
   console.log(openValues);   
    
	var newData = {
        open: openValues,
        close: closeValues
      };
	 
	   rowNode.setData(newData);
	
	}//end for
	
	

     

  }//end set data










  // chartLine() {
  // var cellRange = {
  // rowStartIndex: 1,
  // rowEndIndex: 20,
  // columns: ["name", "volume"]
  // };
  // var chartRangeParams = {
  // cellRange: cellRange,
  // chartType: "line"
  // };
  // this.gridApi.chartRange(chartRangeParams);
  // }

}
