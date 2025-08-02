import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtualizadespesaPage } from './atualizadespesa.page';

const routes: Routes = [
  {
    path: '',
    component: AtualizadespesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtualizadespesaPageRoutingModule {}
