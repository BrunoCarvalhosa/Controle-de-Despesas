import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastradespesaPageRoutingModule } from './cadastradespesa-routing.module';

import { CadastradespesaPage } from './cadastradespesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastradespesaPageRoutingModule
  ],
  declarations: [CadastradespesaPage]
})
export class CadastradespesaPageModule {}
