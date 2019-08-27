import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
    {headerName: 'Name', field: 'name', sortable: true, filter: true, checkboxSelection: true,rowGroup: true },
    {headerName: 'Date', field: 'date', sortable: true, filter: true, editable: true},
	{headerName: 'Open', field: 'open', sortable: true, filter: true, editable: true},
	{headerName: 'High', field: 'high', sortable: true, filter: true, editable: true},
	{headerName: 'Low', field: 'low', sortable: true, filter: true, editable: true},
	{headerName: 'Close', field: 'close', sortable: true, filter: true, editable: true},
	{headerName: 'Volume', field: 'volume', sortable: true, filter: true, editable: true},
	{headerName: 'Adjusted Volume', field: 'adj_volume', sortable: true, filter: true, editable: true},
	{headerName: 'Adjusted High', field: 'adj_high', sortable: true, filter: true, editable: true},
	{headerName: 'Adjusted low', field: 'adj_low', sortable: true, filter: true, editable: true}
	
	
	
];

rowData : any;


constructor(private http: HttpClient) {

}

ngOnInit() {
    //this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
    this.rowData = this.http.get('http://localhost/websites/grid_api/objects/readStock.php');
	// this.rowData = this.http.get('https://api.myjson.com/bins/ly7d1');
}

getSelectedRows() {
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map( node => node.data );
        const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
        alert(`Selected nodes: ${selectedDataStringPresentation}`);
    }
	
	
}
