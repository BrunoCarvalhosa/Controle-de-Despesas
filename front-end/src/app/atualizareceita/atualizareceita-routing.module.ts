import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtualizareceitaPage } from './atualizareceita.page';

const routes: Routes = [
  {
    path: '',
    component: AtualizareceitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtualizareceitaPageRoutingModule {}
