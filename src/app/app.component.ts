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
  
  autoGroupColumnDef = {
        headerName: 'Model',
        field: 'model',
        cellRenderer: 'agGroupCellRenderer',
        cellRendererParams: {
            checkbox: true
        }
    };

  columnDefs = [
    {headerName: 'Make', field: 'make', sortable: true, filter: true, checkboxSelection: true,rowGroup: true },
    {headerName: 'Model', field: 'model', sortable: true, filter: true },
    {headerName: 'Price', field: 'price', sortable: true, filter: true, editable: true}
];

rowData : any;


constructor(private http: HttpClient) {

}

ngOnInit() {
    //this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
    //this.rowData = this.http.get('http://localhost/websites/grid_api/objects/readMytable.php');
	 this.rowData = this.http.get('https://api.myjson.com/bins/ly7d1');
}

getSelectedRows() {
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map( node => node.data );
        const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
        alert(`Selected nodes: ${selectedDataStringPresentation}`);
    }
	
	
}
