import { Injectable } from '@angular/core';

/*
  Generated class for the JsMapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

declare var google;

@Injectable()
export class JsMapsProvider {
  map: any;
  constructor() {
    console.log('Hello JsMapsProvider Provider');
  }


  init(location){
    let latLng = new google.maps.LatLng(location.latitude, location.longitude);

   let opts = {
     center: latLng,
     zoom: 11,
     mapTypeId: google.maps.MapTypeId.ROADMAP
   };

   this.map = new google.maps.Map('map', opts);
  }

}
