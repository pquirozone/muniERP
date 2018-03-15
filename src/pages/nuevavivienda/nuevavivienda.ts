import { Component } from '@angular/core';
import { Config, NavController,Platform, NavParams, ViewController,ModalController, AlertController} from 'ionic-angular';
import firebase from 'firebase';
import { NuevoHabitante } from '../nuevohabitante/nuevohabitante';
@Component({
  selector: 'page-nuevavivienda',
  templateUrl: 'nuevavivienda.html'
})

export class NuevaVivienda {
  public userProfile:firebase.database.Reference;
  public currentUser:firebase.User;
 

  public items: any;
  item: any;
  public refresher: any;
  vivienda: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,   public viewCtrl: ViewController, public modalCtrl: ModalController, public alertCtrl: AlertController){
    this.item = {
      'viviendaId': navParams.get('viviendaId')
    };
    this.vivienda = "direccion";
    this.getNuevoHabitante();
  }
  refreshData(refresher) {
    this.refresher = refresher;
    this.getNuevoHabitante();
  }


done(){
  firebase.auth().onAuthStateChanged(user =>{
    console.log("DONE");
    if (user){
      this.currentUser = user;
      var calle = this.item.calle;
      var numero = this.item.numero;
      var dpto = this.item.dpto;
      var sector = this.item.sector;
      var propietario = this.item.propietario;
      var year = this.item.year;
      var avaluo = this.item.avaluo;
      var situacion = this.item.situacion;
      var material = this.item.material;
      var dimensiones = this.item.dimensiones;
      var pisos = this.item.pisos;
      var habitaciones = this.item.habitaciones;
      var banos = this.item.banos;
      var agua = this.item.agua;
      var electricidad = this.item.electricidad;
      var gas = this.item.gas;

      if (gas===undefined){
        console.log("GAS FALSO");
        gas = "false";
      }
      if (agua===undefined){
        agua = "false";
      }
      if(electricidad===undefined){
        electricidad="false";
      }
      if (dpto===undefined){
        dpto = "";
      }

      console.log(gas);
      var created = (new Date().getTime());
      var usuario = user.uid;
      var comuna = "San Miguel";
      var direccioncompleta = calle+" "+numero+" "+dpto+" "+comuna;
      var lat = "";
      var lng = "";
      var direccion = calle+" "+numero+","+comuna;
      var googleClient = require('@google/maps').createClient({
        key:'AIzaSyC3VuTVyXWQmk6G7UHEPSkI-7Vm4EnUrgk'
      });


      var coordenadas = [lat,lng].map(function(direccion){
        return new Promise(function(resolve,reject){
          googleClient.geocode({
            address: calle+" "+numero+","+comuna
          }, function(err, response) {
            if (!err) {
              let geoloc = response.json.results[0].geometry.location;
              console.log(geoloc);
               lat = geoloc.lat;
               lng = geoloc.lng;
              resolve();
            }
          });
        });
      });


      Promise.all(coordenadas).then(function(){
        try{


          var newKey = firebase.database().ref().child('/vivienda').push().key;
          let userProfile = firebase.database().ref('/vivienda');
          console.log(newKey);
          userProfile.child(newKey).set({calle,numero,sector,direccioncompleta,dpto,lat,lng,propietario,year,avaluo,situacion,material,dimensiones,pisos,habitaciones,banos,agua,electricidad,gas,created,usuario});
          console.log("Ingresando");





        //this.setRoot(ListaViviendas);

      }catch(ex){
        console.log(ex);
        /*
        let alert = alertCtrl1.create({
          title: 'ERROR',
          subTitle: 'El Usuario ha sido guardo exitosamente',
          buttons: ['OK']
        });
        alert.present();
*/
      }
      }).catch(console.error);






    }
  })
  this.navCtrl.pop();
}



  nuevoHabitante(){
    let addModal = this.modalCtrl.create(NuevoHabitante);
    addModal.onDidDismiss(item => {
      if (item){
        firebase.auth().onAuthStateChanged(user => {
          if (user){
            this.currentUser = user;
            var newKey = firebase.database().ref().child('habitante').push().key;
              this.userProfile = firebase.database().ref(`/habitante/${newKey}`);
            var nombres = item.nombres;
            var apellidop = item.apellidop;
            var apellidom = item.apellidom;
            var rut = item.rut;
            var nacionalidad = item.nacionalidad;
            var fechanacimiento = item.fechanacimiento;
            var rutpadre = item.rutpadre;
            var rutmadre = item.rutmadre;
            let created = (new Date().getTime());
            this.userProfile.set({nombres,apellidop,apellidom,rut,nacionalidad,fechanacimiento,rutpadre,rutmadre,created});

          //  this.getNuevoHabitante();

          }
        })
      }
    });
    addModal.present()
  }

  getNuevoHabitante(){
    firebase.auth().onAuthStateChanged(user => {
      this.currentUser = user;
      this.userProfile = firebase.database().ref('/habtemps');
      this.userProfile.child(`/${user.uid}`).on("value",snapshot => {
        this.items = [];
        snapshot.forEach(hab => {
          let habt = hab.val();
          this.items.push(habt);
          return false;
        });
        console.log(this.items);
      });
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }




}
