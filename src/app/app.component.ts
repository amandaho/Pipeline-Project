import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: object = JSON.parse(localStorage.getItem("currentUser"));

  ngAfterContentChecked() {
     this.user = JSON.parse(localStorage.getItem("currentUser"));
  }
  
}
  
