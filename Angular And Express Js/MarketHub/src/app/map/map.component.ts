import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

   L: any;
    map: any;
    result;
  constructor() {


   
      window.onload = function() {
        this.L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

        this.L.mapquest.geocoding().geocode('Boston, MA', createMap);

        function createMap(error, response) {
          var location = response.results[0].locations[0];
          var latLng = location.displayLatLng;
          var map = this.L.mapquest.map('map', {
            center: latLng,
            layers: this.L.mapquest.tileLayer('map'),
            zoom: 14
          });
        }
      }
  
  }

  ngOnInit(): void {


  }



}
