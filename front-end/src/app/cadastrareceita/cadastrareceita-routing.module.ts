import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrareceitaPage } from './cadastrareceita.page';

const routes: Routes = [
  {
    path: '',
    component: CadastrareceitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrareceitaPageRoutingModule {}
