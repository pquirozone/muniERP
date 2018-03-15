
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { JsMapsProvider } from './../js-maps/js-maps';
import { NativeMapsProvider } from './../native-maps/native-maps';
import { GoogleMaps } from '@ionic-native/google-maps';
/*
  Generated class for the MapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapsProvider {

  map: any;

  constructor(public platform: Platform) {
  
  }

  init(location, element){
   this.map.init(location);
 }

}
