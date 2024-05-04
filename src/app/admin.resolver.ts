import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { FrontOrBackService } from './services/front-or-back.service';

@Injectable({
  providedIn: 'root'
})
export class AdminResolver implements Resolve<boolean> {
 constructor(private frontOrBack : FrontOrBackService) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  | any {
    this.frontOrBack.set(false) ;
  }
}
