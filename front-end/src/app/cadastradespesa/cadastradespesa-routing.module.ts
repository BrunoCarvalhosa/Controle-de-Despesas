import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastradespesaPage } from './cadastradespesa.page';

const routes: Routes = [
  {
    path: '',
    component: CadastradespesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastradespesaPageRoutingModule {}
