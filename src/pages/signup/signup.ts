import { Component } from '@angular/core';

import { IonicPage,Loading,AlertController,NavController, LoadingController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage} from '../login/login';
import { HomePage} from '../home/home';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
    public loading: Loading;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public authProvider: AuthProvider, public alertCtrl: AlertController,public formBuilder: FormBuilder){
    this.signupForm = formBuilder.group({
        email: ['',
          Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['',
          Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }


signupUser(){
  if (!this.signupForm.valid){
    console.log(this.signupForm.value);
  } else {
    this.authProvider.signupUser(this.signupForm.value.email,
      this.signupForm.value.password)
    .then(() => {
      this.loading.dismiss().then( () => {

        this.navCtrl.setRoot(HomePage);
      });
    }, (error) => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
}





}
