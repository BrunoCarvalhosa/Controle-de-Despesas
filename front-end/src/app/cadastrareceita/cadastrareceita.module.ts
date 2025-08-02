import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrareceitaPageRoutingModule } from './cadastrareceita-routing.module';

import { CadastrareceitaPage } from './cadastrareceita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrareceitaPageRoutingModule
  ],
  declarations: [CadastrareceitaPage]
})
export class CadastrareceitaPageModule {}
