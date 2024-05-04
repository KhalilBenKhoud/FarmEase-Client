import { Component } from '@angular/core';
import { FrontOrBackService } from '../services/front-or-back.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.css']
})
export class BackOfficeComponent {
      constructor( private frontOrBack : FrontOrBackService) {}
      
      ngOnInit() {
         this.frontOrBack.set(false) ;
      }
      
}
