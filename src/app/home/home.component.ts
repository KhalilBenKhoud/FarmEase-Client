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
  @ViewChildren('card') cards !: QueryList<ElementRef>;

  activeIndex: number | undefined = 0;

    activeIndexChange(index : number){
        this.activeIndex = index
    }
  

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

        let index = 0 ;
    setInterval(() => {
      this.cards.filter((c,i) => i != index).forEach(c => c.nativeElement.children[0].setAttribute('style','height : 0'))
      this.cards.get(index)?.nativeElement.children[0].setAttribute('style','height : 100%')
      if(index < 4) index++ ;
      else index = 0 ;
    },2000)
   
  }

  
}
