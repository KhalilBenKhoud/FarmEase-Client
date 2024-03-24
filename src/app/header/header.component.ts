import { Component, OnInit, HostListener, OnChanges } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {
  isScrolled: boolean = false; // Flag to track scroll state
  
  constructor( public authService : AuthService, private router: Router) {}
  
  

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollY = window.scrollY; // Get current scroll position
    this.isScrolled = scrollY > 5; // Update flag based on scroll position
  }

  ngOnInit() {
    this.onScroll(); // Call onScroll initially to set state on component load
  }


  logout() {
    this.authService.logout().subscribe(
      (data : any) => { localStorage.removeItem('accessToken') ;
      this.router.navigate(["/home"])},
      error => {  console.log(error) ;}
    )
  }

}
