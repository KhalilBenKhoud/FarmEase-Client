import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, timeInterval, timeout } from 'rxjs';
import { FrontOrBackService } from './services/front-or-back.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  users : any ;
  isLoading !: boolean ;
  
  constructor(private http : HttpClient, public frontOrBack : FrontOrBackService) {}

  
}
