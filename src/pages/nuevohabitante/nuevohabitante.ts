import { Component } from '@angular/core';
import { Config, NavController,Platform, NavParams, ViewController,ModalController, AlertController} from 'ionic-angular';
import { NuevaVivienda } from '../nuevavivienda/nuevavivienda';
import firebase from 'firebase';
import moment from 'moment';
@Component({
  selector: 'page-nuevohabitante',
  templateUrl: 'nuevohabitante.html'
})

export class NuevoHabitante {
  public userProfile:firebase.database.Reference;
  public currentUser:firebase.User;

  public items: any;
  item: any;
  habitante: any;
  colegiosbasica: any;
  colegiosmedia: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,   public viewCtrl: ViewController, public modalCtrl: ModalController, public alertCtrl: AlertController){
    this.item = {
      'habitanteId': navParams.get('habitanteId')
    };
    this.habitante = "personales";
    console.log(this.item.nivelestudio);

  }

validarut(rut){
  return new Promise((resolve,reject) => {
    this.userProfile = firebase.database().ref('/habitante');
    this.userProfile.child(rut).on("value",snapshot => {
      if (snapshot.val()===null){
        resolve();
      }
      else{
        reject();
      }
    })
  })
}
   
escolaridad(){
  let escolaridad = this.item.escolaridad;
  console.log(escolaridad);
  if (escolaridad===true){
    this.item.estudio = true;
  }
  else{
    this.item.estudio = false;
  }
}


empleabilidad(){
  let empleabilidad = this.item.empleo;
  if (empleabilidad===true){
    this.item.empleabilidad = true;
  }
  else{
    this.item.empleabilidad = false;
  }

}

nivelestudio(){
  let nivelestudio = this.item.nivelestudio;
console.log(this.item.nivelestudio);
this.item.niveledudacion = nivelestudio;
console.log(this.item.niveleducacion);
  if (nivelestudio==="basica"){
    //Cargar Colegios Comuna basica

    this.userProfile = firebase.database().ref('/colegiosbasica');
    this.userProfile.on("value",snapshot => {
      this.colegiosbasica = [];
      snapshot.forEach(cole => {

        let colegio = cole.val();
        colegio.nombre = cole.key;
        console.log(colegio);
        this.colegiosbasica.push(colegio);
        return false;
      });
      console.log(this.colegiosbasica);
    });
  }

  if(nivelestudio==="media"){
    this.userProfile = firebase.database().ref('/colegiosmedia');
    this.userProfile.on("value",snapshot => {
      this.colegiosmedia = [];
      snapshot.forEach(cole => {
        let colegio = cole.val();
        colegio.nombre = cole.key;
        this.colegiosmedia.push(colegio);
        return false;
      });
      console.log(this.colegiosmedia);
    });
  }
}

getDatosrut(rut){
  return new Promise((resolve,reject) => {
    this.userProfile = firebase.database().ref('/habitante');
    this.userProfile.child(rut).on("value", snapshot => {
      if (snapshot.val()===null){
        reject();
      }
      else{
        resolve(snapshot.val());
      }
    })
  })
}
verificaRut(rut){
  console.log("En el evento");
  console.log(rut.target.value);
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
  cancel() {
    this.viewCtrl.dismiss();
  }


  step1(){
    var rut = this.item.rut;
    this.validarut(rut).then(validacion => {
      //aqui si pasa
      console.log("RUT VALIDO");
        this.habitante = "familiares";
    }).catch((err) => {
      //aqui si no pasa
      console.log("RUT INVALIDO");
      this.habitante = "personales";
    })

  }

  step2(){
  this.habitante = "escolaridad";
  }

calculaEdad(){
  this.item.edad = moment().diff(this.item.fechanacimiento,'years');

}


  done() {
    console.log(this.item);
    if (this.item){
      firebase.auth().onAuthStateChanged(user => {
        if (user){
          this.currentUser = user;
          console.log(this.item.rut);

          var nombres = this.item.nombres;
          var apellidop = this.item.apellidop;
          var apellidom = this.item.apellidom;
          var rut = this.item.rut;
          var nacionalidad = this.item.nacionalidad;
          var fechanacimiento = this.item.fechanacimiento;
          var conyuge = this.item.conyuge; //buscar conyuge
          var hijos = this.item.hijos;

          var padre = this.item.padre;
          var madre = this.item.madre;
          var escolaridad = this.item.escolaridad;
          var empleo = this.item.empleo;
          var tipoempleo = this.item.tipoempleo;
          var ingreso = this.item.ingreso;
          var created = (new Date().getTime());
          var usuario = user.uid;
          var rutc = this.item.rut;


          try {
            this.userProfile = firebase.database().ref(`/habitante/`);
            //this.userProfile.child(rut).set({nombres,apellidop,apellidom,rut,nacionalidad,fechanacimiento,conyuge,hijos,padre,madre,escolaridad,empleo,tipoempleo,ingreso,created,usuario});
            this.item.habitanteId = rut;
            console.log(this.item);
            this.userProfile.child(rut).set(this.item);
            let alert = this.alertCtrl.create({
              title: 'Usuario Registrado',
              subTitle: 'El Usuario ha sido guardo exitosamente',
              buttons: ['OK']
            });
            alert.present();
            this.navCtrl.pop();
            //this.setRoot(ListaViviendas);

          }catch(ex){
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Se deben completar todos los datos',
              buttons: ['OK']
            });
            alert.present();
            console.log(ex);
          }

          //this.userProfile.child(rut).set({nombres,apellidop,apellidom,rut,nacionalidad,fechanacimiento,conyuge,hijos,padre,madre,escolaridad,empleo,tipoempleo,ingreso,created,usuario});
          //this.setRoot(ListaViviendas);
        }
      })
    }
  }

}
