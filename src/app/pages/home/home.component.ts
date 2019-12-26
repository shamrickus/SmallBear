import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openPriv() {
    this.dialog.open(PrivComponent, {
      height: '75%',
      minWidth: '400px',
      width: '80%'
    });
  }

  openToS() {
    this.dialog.open(ToSComponent, {
      height: '75%',
      minWidth: '400px',
      width: '80%'
    });
  }
}

@Component({
  selector: 'dialog-tos',
  templateUrl: './tos.dialog.html'
})
export class ToSComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}

@Component({
  selector: 'dialog-priv',
  templateUrl: './priv.dialog.html'
})
export class PrivComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
