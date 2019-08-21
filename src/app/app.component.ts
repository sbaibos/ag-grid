import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

import "ag-grid-enterprise";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	//@ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'angularGrid';
  
  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private detailCellRendererParams;
  private rowData: any;
  
  // autoGroupColumnDef = {
        // headerName: 'Model',
        // field: 'model',
        // cellRenderer: 'agGroupCellRenderer',
        // cellRendererParams: {
            // checkbox: true
        // }
    // };



constructor(private http: HttpClient) {
	
	 this.columnDefs = [
      {
        field: "name",
        cellRenderer: "agGroupCellRenderer"
      },
      { field: "account" },
      { field: "calls" },
      {
        field: "minutes",
        valueFormatter: "x.toLocaleString() + 'm'"
      }
    ];
    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
          { field: "callId" },
          { field: "direction" },
          { field: "number" },
          {
            field: "duration",
            valueFormatter: "x.toLocaleString() + 's'"
          },
          { field: "switchCode" }
        ],
        onFirstDataRendered(params) {
          params.api.sizeColumnsToFit();
        }
      },
      getDetailRowData: function(params) {
        params.successCallback(params.data.callRecords);
      }
    };
	

}

ngOnInit() {
   // this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
    //this.rowData = this.http.get('http://localhost/websites/grid_api/objects/readMytable.php');
}

// getSelectedRows() {
        // const selectedNodes = this.agGrid.api.getSelectedNodes();
        // const selectedData = selectedNodes.map( node => node.data );
        // const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
        // alert(`Selected nodes: ${selectedDataStringPresentation}`);
    // }
	
	onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        "https://raw.githubusercontent.com/ag-grid/ag-grid-docs/latest/src/javascript-grid-master-detail/simple/data/data.json"
      )
      .subscribe(data => {
        this.rowData = data;
      });

    setTimeout(function() {
      var rowCount = 0;
      params.api.forEachNode(function(node) {
        node.setExpanded(rowCount++ === 1);
      });
    }, 500);
  }
	
}
