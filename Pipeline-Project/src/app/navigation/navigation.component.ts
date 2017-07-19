import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Output() navToggle = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  navOpen() {
    this.navToggle.emit(true);
  }

}
