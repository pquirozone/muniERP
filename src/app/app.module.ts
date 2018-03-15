import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from './../providers/firebase/firebase';
import { AuthProvider } from '../providers/auth/auth';

import * as firebase from "firebase";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListaViviendas } from '../pages/listaviviendas/listaviviendas';
import { NuevaVivienda } from '../pages/nuevavivienda/nuevavivienda';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { NuevoHabitante } from '../pages/nuevohabitante/nuevohabitante';
import { ListaHabitantes } from '../pages/listahabitantes/listahabitantes';
import { DetallehabitantePage } from '../pages/detallehabitante/detallehabitante';
import { DetalleviviendaPage } from '../pages/detallevivienda/detallevivienda';
import { AgmCoreModule } from '@agm/core';
import { DatetimePickerModule } from 'ion-datetime-picker-sn';

var config = {
   apiKey: "AIzaSyAUB-ncEpeNejKh73qTNv2u-gOUaIp1-Fo",
   authDomain: "munierp-9143f.firebaseapp.com",
   databaseURL: "https://munierp-9143f.firebaseio.com",
   projectId: "munierp-9143f",
   storageBucket: "munierp-9143f.appspot.com",
   messagingSenderId: "1060959369408"
 };
 firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ListaViviendas,
    NuevaVivienda,
    LoginPage,
    SignupPage,
    NuevoHabitante,
    ListaHabitantes,
    DetallehabitantePage,
    DetalleviviendaPage
  ],
  imports: [
    BrowserModule,
    DatetimePickerModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA57jvj3Zpmx60Is1A50sF4WJJW-G_sAp0'
})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ListaViviendas,
    NuevaVivienda,
    LoginPage,
    SignupPage,
    NuevoHabitante,
    ListaHabitantes,
    DetallehabitantePage,
    DetalleviviendaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    AuthProvider,
    AngularFireDatabase
  ]
})
export class AppModule {}
