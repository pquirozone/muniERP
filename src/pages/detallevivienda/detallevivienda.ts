import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the DetalleviviendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detallevivienda',
  templateUrl: 'detallevivienda.html',
})
export class DetalleviviendaPage {

  item: any;
  registros: any;
  habitantes:any;
  public userProfile:firebase.database.Reference;
  public viviendaProfile: firebase.database.Reference;
  public currentUser:firebase.User;

  map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get('vivienda');
    this.item.zoom = 17;
    this.item.label = this.item.direccioncompleta;

    this.habitantes = [];





  }

  onMouseOver(infoWindow, gm) {

  if (gm.lastOpen != null) {
      gm.lastOpen.close();
  }

  gm.lastOpen = infoWindow;

  infoWindow.open();
}


buscaHabitantes(ev: any){
  let val = ev.target.value;
  this.userProfile = firebase.database().ref('/habitante');
  this.userProfile.child(val).on("value", snapshot => {
    if (snapshot.val()!==null){
      this.habitantes.push(snapshot.val());
        }
        console.log(this.habitantes);
  })


}
eliminarHabitante(hab){
  this.habitantes.forEach(h => {
    console.log(h.rut);
    console.log(hab.rut);
    if (h.rut===hab.rut){
      console.log("Aqui esta y lo eliimino");
      let indice = this.habitantes.indexOf(hab);
      console.log(indice);
      this.habitantes.splice(indice,1);
    }
  })
}

done(){
  this.userProfile = firebase.database().ref(`/vivienda/${this.item.key}/habitantes`);
  this.habitantes.forEach(h => {
    console.log(h.rut);
    this.userProfile.child(h.rut).set(h);

    this.viviendaProfile = firebase.database().ref(`/habitante/${h.rut}`);
    this.viviendaProfile.child('vivienda').set(this.item.key);


  })
}






}
