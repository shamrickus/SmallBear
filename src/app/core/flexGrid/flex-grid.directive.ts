import {AfterViewInit, Directive, ViewChild} from '@angular/core';
import {ObservableMedia} from '@angular/flex-layout';
import {MatGridList} from '@angular/material';

@Directive({
  selector: '[appFlexGrid]'
})
export class FlexGridDirective implements  AfterViewInit {
  constructor(private matGridList: MatGridList, private media: ObservableMedia) { }

  ngAfterViewInit() {
    this.update();
    this.media.subscribe(change => {
      this.update();
    })
  }

  update() {
    if (this.media.isActive     ('xl')) { this.matGridList.cols = 3; }
    else if (this.media.isActive('lg')) { this.matGridList.cols = 2; }
    else if (this.media.isActive('md')) { this.matGridList.cols = 1; }
    else if (this.media.isActive('sm')) { this.matGridList.cols = 1; }
    else if (this.media.isActive('xs')) { this.matGridList.cols = 1; }
    else { this.matGridList.cols = 1; }
  }
}
