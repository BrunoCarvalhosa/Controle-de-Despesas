import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtualizadespesaPageRoutingModule } from './atualizadespesa-routing.module';

import { AtualizadespesaPage } from './atualizadespesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtualizadespesaPageRoutingModule
  ],
  declarations: [AtualizadespesaPage]
})
export class AtualizadespesaPageModule {}
