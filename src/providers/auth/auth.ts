import { Injectable } from '@angular/core';
import firebase from 'firebase';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public userProfile:firebase.database.Reference;
  public userData: firebase.database.Reference;
   public currentUser:firebase.User;
  constructor() {
    firebase.auth().onAuthStateChanged(user =>{
      if (user){
        this.currentUser = user;
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);

      }
    })


  }


  loginUser(email:string, password:string){
    return firebase.auth().signInWithEmailAndPassword(email,password);

  }

  signupUser(email:string,password:string): Promise<any>{
    return firebase.auth().createUserWithEmailAndPassword(email,password).then( newUser  => {
      if (newUser && newUser.emailVerified === false){
        newUser.sendEmailVerification().then(function(){
          console.log("Envio de Mail de verificacion")
        });
      }
      else{
          firebase.database().ref('/userProfile').child(newUser.uid).set({email:email});
        //  firebase.database().ref('/userOptions').child(newUser.uid);
      }

    })
  }

createOpcionesMenu(): Promise<any>{
  let opciones = {
    'Ofertas': 'OfertasPage',
    'Mis Ofertas': 'MisofertasPage',
    'Mis Trabajos': 'MistrabajosPage'
  }
  return this.userProfile.update(opciones);

}
updateProfile(nombre:string,apellido:string,dni:string,fechanacimiento:string,telefono:string): Promise<any>{
let opciones = 971
  return this.userProfile.update({nombre,apellido,dni,fechanacimiento,telefono,opciones});
}

getUserProfile(): firebase.database.Reference{
  return this.userProfile;
}

getUsData(){
  return new Promise((resolve,reject) =>{
    this.getUserProfile
  })
}

getUserOptions(){
  return new Promise((resolve,reject) => {

  })
}


getUserdata(){
  return new Promise((resolve,reject) =>{
    this.userProfile.on("value",snapshot => {
      console.log(snapshot);
      if (snapshot.val()===undefined){
        return reject();
      }
      if (!snapshot.val()){
        return reject();
      }


      return resolve(snapshot.val());
    });
  });
}


  resetPassword(email: string): Promise<void> {
  return firebase.auth().sendPasswordResetEmail(email);
}

logoutUser(): Promise<void> {
  return firebase.auth().signOut();
}

}
