import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtualizareceitaPageRoutingModule } from './atualizareceita-routing.module';

import { AtualizareceitaPage } from './atualizareceita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtualizareceitaPageRoutingModule
  ],
  declarations: [AtualizareceitaPage]
})
export class AtualizareceitaPageModule {}
