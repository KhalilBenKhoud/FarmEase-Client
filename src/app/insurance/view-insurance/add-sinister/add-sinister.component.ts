import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InsuranceService } from 'src/app/services/insurance.service';
import * as L from "leaflet";

@Component({
  selector: 'app-add-sinister',
  templateUrl: './add-sinister.component.html',
  styleUrls: ['./add-sinister.component.css'],
  providers: [MessageService]
})
export class AddSinisterComponent implements OnInit{
  constructor(private route : ActivatedRoute, private messageService: MessageService, private insuranceService : InsuranceService, private router : Router) {}

myParam !: any ;

stateOptions: any[] = [{ label: 'drought', value: 'DROUGHT' },{ label: 'flood', value: 'FLOOD' },{ label: 'crop disease', value: 'CROP_DISEASE' },{ label: 'fishing accident', value: 'FISHING_ACCIDENT' }];
  
type !: any ;
description !: string ;
date !: Date ;
amount !: number ;
city!: string ;
state!: string ;
country!: string ;
postalCode!: string ;
latitude!:number;
longitude!:number;

address:any;
map: any;


  ngOnInit() {
      this.myParam = this.route.snapshot.params['id'];
      this.initMap();
  
  }
  initMap() {
    if (!this.map) {
      this.map = L.map('map').setView([36.9045944, 10.1874519], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(this.map);
      this.map.on('click', (e: any) => {
        this.updateMarker(e.latlng.lat, e.latlng.lng);
      });
    } else {
      this.map.setView([36.9045944, 10.1874519]);
    }
  }
  updateMarker(latitude: number, longitude: number) {
    if (!this.map) return;
    // Clear existing marker
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
    // Use a reverse geocoding service to get the address based on lat/lng
    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
      .then(response => response.json())
      .then(data => {
        let clickedAddress = data.display_name;
        let marker = L.marker([latitude, longitude]).addTo(this.map);
        marker.bindPopup(clickedAddress).openPopup();
        console.log(data);
        if(data.address.county==null){
        this.city=data.address.suburb;
        }
        else{
          this.city=data.address.county;
        }
        this.state=data.address.state;
        this.country=data.address.country;
        this.postalCode=data.address.postcode;
        this.latitude=data.lat;
        this.longitude=data.lon;
        console.log(data.address);
      })
      .catch(error => {
        console.error("Error fetching address:", error);
      });
  }

  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'fill all the fields' });
  }

showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Bravo !', detail: 'sinister added !' });
  }

  onSubmit() {
       if(this.type == null || this.amount == null || this.date == null || this.description == null || this.city == null|| this.state == null|| this.country == null|| this.postalCode == null)
      {  this.showWarn() ; return ; }
       this.address={};
       this.address.city=this.city;
       this.address.state=this.state;
       this.address.country=this.country;
       this.address.postalCode=this.postalCode
       this.address.latitude=this.latitude;
       this.address.longitude=this.longitude;
       const requestBody = {
        date_Sinister : this.date,
        description : this.description,
        amount : this.amount,
        type : this.type,
        address: this.address
       }

       this.insuranceService.assignSinister(this.myParam,requestBody).subscribe(
        data => { console.log(data) ;  this.showSuccess() ; setTimeout(() => {this.router.navigate(["viewInsurance"])},2500)},
        error => {console.log(error) ;}
       )
  }

}
