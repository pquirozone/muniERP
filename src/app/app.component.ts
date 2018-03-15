import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ListaViviendas } from '../pages/listaviviendas/listaviviendas';
import { LoginPage } from '../pages/login/login';
import { NuevoHabitante } from '../pages/nuevohabitante/nuevohabitante';
import { ListaHabitantes } from '../pages/listahabitantes/listahabitantes';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;
  public userProfile:firebase.database.Reference;
   public currentUser:firebase.User;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    platform.ready().then(()=> {
      let rootp;
      const unsusbribe = firebase.auth().onAuthStateChanged(user => {
        if (!user){
          this.rootPage = LoginPage;
          unsusbribe();
        }
        else{
          this.currentUser = user;
          this.rootPage = HomePage;
        }
      })
    })
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Viviendas', component: ListaViviendas },
      { title: 'Habitantes', component: ListaHabitantes},
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openpage(p) {
    console.log(p);
    this.rootPage = p;
  }
}
