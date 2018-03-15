import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleviviendaPage } from './detallevivienda';


@NgModule({
  declarations: [
    DetalleviviendaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleviviendaPage)
  ],
})
export class DetalleviviendaPageModule {}
