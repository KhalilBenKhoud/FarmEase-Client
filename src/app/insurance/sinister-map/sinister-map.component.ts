import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-sinister-map',
  templateUrl: './sinister-map.component.html',
  styleUrls: ['./sinister-map.component.css']
})
export class SinisterMapComponent implements OnInit{
  map: any;

  constructor(private insuranceService:InsuranceService){
  }

  ngOnInit(): void {
      this.insuranceService.countSinistersByLocation().subscribe((data: any) => {
      this.renderMap(data);
    });
  }

  renderMap(data:any){
    this.map = L.map('map').setView([36.8188, 10.1658], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(this.map);
    console.log(data);
    for (let i = 0; i < data.length; i++) {

      L.marker([data[i][0], data[i][1]]).addTo(this.map);
    }
  }
}
