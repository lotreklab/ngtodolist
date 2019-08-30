import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav, MatDrawer } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('drawer', { static: false }) public sidenav: MatDrawer;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  openNav() {
    this.sidenav.open();
  }

  closeNav() {
    this.sidenav.close();
  }
}
