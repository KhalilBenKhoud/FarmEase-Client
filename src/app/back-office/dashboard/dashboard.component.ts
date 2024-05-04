import { Component, AfterViewInit } from '@angular/core';
import { FrontOrBackService } from 'src/app/services/front-or-back.service';
//declare var require: any;

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;
  constructor( private frontOrBack : FrontOrBackService ) {
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() { }
   
}
