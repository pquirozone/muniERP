import { Component } from '@angular/core';

import { IonicPage,Loading,AlertController,NavController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { ListaViviendas } from '../listaviviendas/listaviviendas';
import { SignupPage } from '../signup/signup';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loginForm: FormGroup;
  public loading: Loading;
  public perfil: any;
constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public authProvider: AuthProvider, public AlertCtrl: AlertController,public formBuilder: FormBuilder){






  this.loginForm = formBuilder.group({
    email: ['',Validators.compose([Validators.required, EmailValidator.isValid])],
    password:['',Validators.compose([Validators.minLength(8),Validators.required])]
  });




}

loginUser():void {
  console.log("ENTRANDO A LOGIN USER");
    this.authProvider.loginUser(this.loginForm.value.email,this.loginForm.value.password)
    .then(authData => {
      this.loading.dismiss().then(()=> {
        if (authData.emailVerified===true){
          this.navCtrl.setRoot(ListaViviendas);





        }
        else {
          console.log("Email no verificado");
          this.navCtrl.setRoot(LoginPage);
        }

      });
    },error => {
      this.loading.dismiss().then(() => {
        let alert = this.AlertCtrl.create({
          message: error.message,
          buttons: [{
            text: "OK",
            role: 'cancel'
          }]
        });
        alert.present();
      });
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();

}

goToSignup(): void {
  this.navCtrl.push(SignupPage);
}

}
