import { Component } from '@angular/core';
import { Config, NavController,Platform, NavParams, ViewController,ModalController} from 'ionic-angular';
import { NuevoHabitante } from '../nuevohabitante/nuevohabitante';
import { DetallehabitantePage } from '../detallehabitante/detallehabitante';

import firebase from 'firebase';

@Component({
  selector: 'page-listahabitantes',
  templateUrl: 'listahabitantes.html'
})

export class ListaHabitantes {
  public userProfile:firebase.database.Reference;
  public currentUser:firebase.User;

  public items: any;
  item: any;
  habitante: any;
  registros: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,   public viewCtrl: ViewController, public modalCtrl: ModalController){

  }
  verificaRut(rut){


    if (rut.target.value===""){
      console.log("VACIO");
      this.item.iconorut = "md-close-circle";
      this.item.colorrut = "danger";
    }
    else {
    this.userProfile = firebase.database().ref(`/habitante`);
    this.userProfile.child(rut.target.value).on("value", snapshot => {
      if (snapshot.val()===null){
        this.item.iconorut = "md-checkmark-circle";
        this.item.colorrut = "secondary";
      }
      else{

        this.item.iconorut = "md-close-circle";
        this.item.colorrut = "danger";
      }
    });
  }
  }
detalleHabitante(rut){
  console.log(rut);
  this.registros = [];
  this.userProfile = firebase.database().ref('/habitante');
  this.userProfile.child(rut).on("value",snapshot => {
    let habitante = snapshot.val();
    console.log(habitante);
    this.userProfile.child(`/${rut}/registro`).on("value",regs => {
      regs.forEach(r => {
        this.registros.push(r.val());
        return false;
      });
    });
    habitante.registro = this.registros;
    console.log(habitante);

      this.navCtrl.push(DetallehabitantePage, {'habitante':habitante});
  })



}
onInput(ev: any){
  let val = ev.target.value;
  console.log(val);
  if (val===""){
    console.log("VACIO");
  }
  else {
  this.userProfile = firebase.database().ref(`/habitante`);
  this.userProfile.child(val).on("value", snapshot => {
    if (snapshot.val()===null){
  this.item = "";
    }
    else{
console.log(snapshot.val());
  this.item = snapshot.val();
    }
  });
}


}


nuevoHabitante(){

    this.navCtrl.push(NuevoHabitante);

}

}
