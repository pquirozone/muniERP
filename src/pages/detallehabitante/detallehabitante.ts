import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the DetallehabitantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detallehabitante',
  templateUrl: 'detallehabitante.html',
})
export class DetallehabitantePage {

  habitante: any;
  item: any;
  registros: any;
  public userProfile:firebase.database.Reference;
  public currentUser:firebase.User;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get('habitante');
    this.registros = this.item.registro;
    console.log(this.registros);


  }


guardaRegistro(rut){
  console.log(rut);
  let registro = this.item.nregistro;
  console.log(registro);

    firebase.auth().onAuthStateChanged(user => {
      if (user){
          var newKey = firebase.database().ref().child(`/habitante/${rut}/registro`).push().key;
        this.userProfile = firebase.database().ref(`/habitante/${rut}/registro`);
        let created = (new Date().getTime());
        let usuario = user.uid;
        this.userProfile.child(newKey).set({registro,usuario,created});

      }
    })






}
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallehabitantePage');
  }

}
