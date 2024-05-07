import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-view-sinister',
  templateUrl: './view-sinister.component.html',
  styleUrls: ['./view-sinister.component.css'],
  providers: [MessageService]
})
export class ViewSinisterComponent {

  myParam !: any ;
  constructor(private route : ActivatedRoute, private insuranceService : InsuranceService, private messageService: MessageService) {}
  cols : any = [
    { field: 'amount', header: 'Amount' },
    { field: 'description', header: 'Description' },
    { field: 'date', header: 'Date' },
    { field: 'type', header: 'Type' },
    { field: 'inventoryStatus', header: 'Status' },
    
  ]; 


  ngOnInit() {
    this.myParam = this.route.snapshot.params['id'];
    this.fetchSinisters() ;
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Bravo !', detail: 'sinister updated !' });
  }

  fetchSinisters() {
    this.insuranceService.getSinistersByInsurance(this.myParam).subscribe(
      data => {console.log(data) ; this.sinisters = data} ,
      error => console.log(error)
    )
  }


  sinisters !: any[] ;





  
  

getSeverity(status: string) {
switch (status) {
  case 'ClOSED':
      return 'success';
  case 'UNDER_REVIEW':
      return 'warning';
  case 'DENIED':
      return 'danger';
  default : 
  return 'test' ;
}
}


}
