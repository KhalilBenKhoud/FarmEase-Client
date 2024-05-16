import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog'; // Import DialogService
import { Sinister } from 'src/app/model/Sinister';
import { InsuranceService } from 'src/app/services/insurance.service';
import { SinisterUpdateComponent } from '../../sinister-update/sinister-update.component';

@Component({
  selector: 'app-view-sinister',
  templateUrl: './view-sinister.component.html',
  styleUrls: ['./view-sinister.component.css'],
  providers: [MessageService, DialogService], // Include DialogService in providers
})
export class ViewSinisterComponent {

  myParam !: any ;
  constructor(private route : ActivatedRoute, private insuranceService : InsuranceService, 
              private messageService: MessageService, private dialogService: DialogService, // Inject DialogService
              private sinisterService: InsuranceService) {}

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

  deleteSinister(id: number): void {
    this.insuranceService.deleteSinister(id).subscribe(
      () => {
        console.log('Sinister deleted successfully');
        this.fetchSinisters(); // Refresh sinisters after deletion
      },
      (error) => {
        console.error('Error deleting sinister:', error);
        // Handle error appropriately
      }
    );
  }

  updateSinister(sinister: Sinister): void {
    const ref = this.dialogService.open(SinisterUpdateComponent, {
      data: {
        sinister: sinister // Pass the selected sinister to the dialog component
      },
      header: 'Update Sinister',
      width: '70%'
    });

    ref.onClose.subscribe((updatedSinister: Sinister) => {
      if (updatedSinister) {
        // Perform any action after updating the sinister
        this.fetchSinisters();
        this.showSuccess(); // Show success message if needed
      }
    });
  }
}
