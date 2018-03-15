import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallehabitantePage } from './detallehabitante';

@NgModule({
  declarations: [
    DetallehabitantePage,
  ],
  imports: [
    IonicPageModule.forChild(DetallehabitantePage),
  ],
})
export class DetallehabitantePageModule {}
