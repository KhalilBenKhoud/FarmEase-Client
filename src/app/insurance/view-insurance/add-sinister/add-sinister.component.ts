import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-add-sinister',
  templateUrl: './add-sinister.component.html',
  styleUrls: ['./add-sinister.component.css'],
  providers: [MessageService]
})
export class AddSinisterComponent {
  constructor(private route : ActivatedRoute, private messageService: MessageService, private insuranceService : InsuranceService, private router : Router) {}

myParam !: any ;

stateOptions: any[] = [{ label: 'drought', value: 'DROUGHT' },{ label: 'flood', value: 'FLOOD' },{ label: 'crop disease', value: 'CROP_DISEASE' },{ label: 'fishing accident', value: 'FISHING_ACCIDENT' }];
  
type !: any ;
description !: string ;
date !: Date ;
amount !: number ;


  ngOnInit() {
      this.myParam = this.route.snapshot.params['id'];
  
  }

  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'fill all the fields' });
}

showSuccess() {
  this.messageService.add({ severity: 'success', summary: 'Bravo !', detail: 'sinister added !' });
}


  onSubmit() {
       if(this.type == null || this.amount == null || this.date == null || this.description == null)
      {  this.showWarn() ; return ; }
       const requestBody = {
        date_Sinister : this.date,
        description : this.description,
        amount : this.amount,
        type : this.type
       }

       this.insuranceService.assignSinister(this.myParam,requestBody).subscribe(
        data => { console.log(data) ;  this.showSuccess() ; setTimeout(() => {this.router.navigate(["viewInsurance"])},2500)},
        error => {console.log(error) ;}
       )
  }

}
