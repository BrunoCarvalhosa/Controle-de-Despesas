import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtualizarUsuarioPageRoutingModule } from './atualizar-usuario-routing.module';

import { AtualizarUsuarioPage } from './atualizar-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtualizarUsuarioPageRoutingModule
  ],
  declarations: [AtualizarUsuarioPage]
})
export class AtualizarUsuarioPageModule {}
