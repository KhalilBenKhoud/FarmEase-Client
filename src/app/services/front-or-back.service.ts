import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FrontOrBackService {
   frontOffice : boolean = true ;

   set(isIt : boolean) {
    this.frontOffice = isIt ;
   }
  constructor() { }
}
