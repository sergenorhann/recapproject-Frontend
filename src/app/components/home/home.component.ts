import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  route: string;
  constructor(location: Location, router: Router) {
    // router.events.subscribe((val) => {
    //   if(location.path() != ''){
    //     this.route = location.path();
    //   } else {
    //     this.route = 'Home'
    //   }
    // });
  }
  ngOnInit(): void {
  }
}
