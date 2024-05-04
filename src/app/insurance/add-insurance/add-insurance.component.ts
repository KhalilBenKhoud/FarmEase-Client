import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-add-insurance',
  templateUrl: './add-insurance.component.html',
  styleUrls: ['./add-insurance.component.css'],
  providers: [MessageService]
})
export class AddInsuranceComponent {

  stateOptions: any[] = [{ label: 'agricultural', value: 'AGRICULTURAL' },{ label: 'fishing', value: 'FISHING' }];
  durationOptions: any[] = [{ name: '3 months', value: 3 },{ name: '6 months', value: 6 }, { name: '1 year', value: 12 } ];
   type !: string  ;
   premium : number = 100 ;
  duration !: number  ;

  coverage !: number ;

  constructor(private messageService: MessageService, private insuranceService : InsuranceService , private router : Router) {}

  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'fill all the fields' });
}



  onSubmit() {
     if( this.type == null ||  this.coverage == null|| this.duration == null ) {
      this.showWarn() ;
      console.log(this.type + '  ' + this.coverage + '  ' + this.duration) ;
      return ;
     }
    
     this.insuranceService.addInsurance({
      coverage_amount : this.coverage ,
      premium : this.premium ,
      type : this.type 
     },this.duration).subscribe(
      data => {
        console.log(data) ;
        this.router.navigate(["/viewInsurance"]) ;
      },
      (error) => {
      console.log(error) ;
      }

     )


  }


}
