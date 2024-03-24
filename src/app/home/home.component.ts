import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';

import { gsap } from 'gsap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChildren('title') title !: QueryList<ElementRef>;
  @ViewChild('container',{static : true}) container !: ElementRef ;


  
  ngAfterViewInit() {
    gsap.from(this.container.nativeElement.children, {
      delay : 1,
      autoAlpha: 0,
      y : -100 ,
      stagger: 0.5
    })
    gsap.to(this.title.get(0)?.nativeElement,
      {rotation: 360, duration: 5, ease: "elastic"}
      )
      gsap.to(this.title.get(1)?.nativeElement,
        {rotation: 360, duration: 5, ease: "elastic"}
        )
  }
}
