import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: object = JSON.parse(localStorage.getItem("currentUser"));

  ngAfterContentChecked() {
     this.user = JSON.parse(localStorage.getItem("currentUser"));
  }
  
  ngOnInit() {
    // this.generateCredentials();
  }

 generateCredentials(){
  let apiKey = 'AIzaSyCK35x5jSnSEfukM5AtISDXjyODWbSaLcg'
}
  
}


  
