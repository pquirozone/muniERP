import { Component } from '@angular/core';
import { Config, NavController,Platform, NavParams, ViewController,ModalController} from 'ionic-angular';
import { NuevaVivienda } from '../nuevavivienda/nuevavivienda';
import { DetalleviviendaPage } from '../detallevivienda/detallevivienda';
import firebase from 'firebase';

@Component({
  selector: 'page-listaviviendas',
  templateUrl: 'listaviviendas.html'
})

export class ListaViviendas {
  public userProfile:firebase.database.Reference;
  public currentUser:firebase.User;

  public items: any;
  item: any;
  public resultados: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,   public viewCtrl: ViewController, public modalCtrl: ModalController){

  }

  nuevaVivienda(){
    console.log("Nueva vivienda");
    this.navCtrl.push(NuevaVivienda);
  }


  onInput(ev: any){
    let val = ev.target.value;
    console.log(val);
      if (val===""){
        console.log("vacio");
      }
      else {

        this.userProfile = firebase.database().ref('/vivienda');
        this.userProfile.orderByChild("calle").equalTo(val).on("value",snapshot => {
          this.resultados = [];
          if (snapshot.val()===null){

            this.item ="";
            console.log("NO ENCONTRADO");
          }

          else{
            snapshot.forEach(calles => {
              console.log(calles.val());
              let cal = calles.val();
              cal.key = calles.key;
              this.resultados.push(cal);
              return false;
            });


          }
        })
      }
    }

detalleVivienda(item){
  this.navCtrl.push(DetalleviviendaPage,{'vivienda':item});
}

}
