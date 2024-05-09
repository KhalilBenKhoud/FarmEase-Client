import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NonauthGuard implements CanActivate, CanActivateChild,  CanLoad {
 
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    return this.checkNonAuth() ;
  }
  canActivateChild() {
    return this.checkNonAuth() ;
  }
    
  
canLoad() : boolean {
  return this.checkNonAuth() ;
}
  

  private checkNonAuth(): boolean {
    if (!this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
