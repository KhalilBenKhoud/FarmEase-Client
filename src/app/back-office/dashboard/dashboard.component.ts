import { Component, AfterViewInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdminUserService } from 'src/app/services/admin-user.service';
import { FrontOrBackService } from 'src/app/services/front-or-back.service';
import {topcard,topcards} from './dashboard-components/top-cards/top-cards-data';


@Component({
  templateUrl: './dashboard.component.html',
  styleUrls : ['./dashboard.component.css'],
  

})
export class DashboardComponent  {
  subtitle: string;
  topcards !: topcard[];
  wealthIndex : number = 0 ;
  totalWallets : number = 0 ;
  
  constructor( private frontOrBack : FrontOrBackService, 
    private adminService : AdminUserService) {
      this.subtitle = 'This is some text within a card block.';
      this.topcards=topcards;

    }
  
    
 
  
  allUsers !: any[] ;
  listStatus : number = 1 ;
  

ngOnInit() {
  this.getAll();
   this.wealthDistribution() ;
   setTimeout(() => {
    this.totalWallets = this.allUsers.length - 1
   },2000)
  
}   

   getAll() {
         this.adminService.getAll().subscribe(
          (data : any) => { this.allUsers = data ;  console.log(data), this.listStatus = 1 ;},
          error => console.log(error)
         )
   }

   sortByDate() {
    this.adminService.sortByRegistrationDate().subscribe(
      (data : any) => { this.allUsers = data ;  console.log(data) ; this.listStatus = 2 ;},
      error => console.log(error)
    )
   }

   sortByBalance() {
    this.adminService.sortByBalance().subscribe(
      (data : any) => { this.allUsers = data ;  console.log(data) ; this.listStatus = 3 ;},
      error => console.log(error)
    )
   }

   ban(id : number) {
      this.adminService.banUser(id).subscribe(
        data => {console.log(data);

          switch(this.listStatus){
             case 1 : this.getAll() ; break ;
             case 2 : this.sortByDate() ; break ;
             case 3 : this.sortByBalance() ; break ;
             default : this.getAll ; break ;
          }
          
         },
         error => console.log(error)

      )
   }
   permit(id : number) {
    this.adminService.permitUser(id).subscribe(
      data => {console.log(data);

        switch(this.listStatus){
           case 1 : this.getAll() ; break ;
           case 2 : this.sortByDate() ; break ;
           case 3 : this.sortByBalance() ; break ;
           default : this.getAll ; break ;
        }
        
       },
       error => console.log(error)

    )
 }
  wealthDistribution() {
    this.adminService.wealthDistributionIndex().subscribe(
      (data : any) => { this.wealthIndex = data  },
        (error) => { console.log(error) ; }
      
    )
  }

}
