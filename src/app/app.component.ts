import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
// import { HttpClient } from '@angular/common/http';
//  import { AgGridAngular } from 'ag-grid-angular';
// import 'ag-grid-enterprise/chartsModule';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
	
  
  





constructor(public auth: AuthService) {
  auth.handleAuthentication();
}

ngOnInit() {
  if (this.auth.isAuthenticated()) {
    this.auth.renewTokens();
  }
}


  
  
  
  
  
  
}
 
	

