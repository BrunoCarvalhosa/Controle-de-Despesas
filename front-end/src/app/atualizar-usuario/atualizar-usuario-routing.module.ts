import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtualizarUsuarioPage } from './atualizar-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: AtualizarUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtualizarUsuarioPageRoutingModule {}
