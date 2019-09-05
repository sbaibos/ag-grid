import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-enterprise/chartsModule';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	private gridApi;
	private gridColumnApi;
	@ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'angularGrid';
  
  // autoGroupColumnDef = {
        // headerName: 'Name',
        // field: 'name',
        // cellRenderer: 'agGroupCellRenderer',
        // cellRendererParams: {
            // checkbox: true
        // }
    // };

  columnDefs = [
    {headerName: 'Name', field: 'name', sortable: true, filter: true, checkboxSelection: true,rowGroup: true, hide: true,chartDataType: "excluded" },
    {headerName: 'Date', field: 'date', sortable: true, filter: true, editable: true, chartDataType: "category"},
	{headerName: 'Open', field: 'open', sortable: true, filter: true, editable: true, chartDataType: "series"},
	{headerName: 'High', field: 'high', sortable: true, filter: true, editable: true, chartDataType: "series"},
	{headerName: 'Low', field: 'low', sortable: true, filter: true, editable: true, chartDataType: "series"},
	{headerName: 'Close', field: 'close', sortable: true, filter: true, editable: true, chartDataType: "series"},
	{headerName: 'Volume', field: 'volume', sortable: true, filter: true, editable: true, chartDataType: "series"},
	{headerName: 'Adjusted Volume', field: 'adj_volume', sortable: true, filter: true, editable: true , chartDataType: "series"},
	{headerName: 'Adjusted High', field: 'adj_high', sortable: true, filter: true, editable: true, chartDataType: "series"},
	{headerName: 'Adjusted low', field: 'adj_low', sortable: true, filter: true, editable: true, chartDataType: "series"}
	
	
	
];

rowData : any;


constructor(private http: HttpClient) {

}

ngOnInit() {
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


  
  // onGridReady(params) {
    // this.gridApi = params.api;
    // this.gridColumnApi = params.columnApi;
// }
  
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
 
	

