import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'atualizareceita/:id',
    loadChildren: () => import('./atualizareceita/atualizareceita.module').then( m => m.AtualizareceitaPageModule)
  },
  {
    path: 'atualizadespesa/:id',
    loadChildren: () => import('./atualizadespesa/atualizadespesa.module').then( m => m.AtualizadespesaPageModule)
  },
  {
    path: 'cadastrareceita',
    loadChildren: () => import('./cadastrareceita/cadastrareceita.module').then( m => m.CadastrareceitaPageModule)
  },
  {
    path: 'cadastradespesa',
    loadChildren: () => import('./cadastradespesa/cadastradespesa.module').then( m => m.CadastradespesaPageModule)
  },
  {
    path: 'cadastrar-usuario',
    loadChildren: () => import('./cadastrar-usuario/cadastrar-usuario.module').then( m => m.CadastrarUsuarioPageModule)
  },
  {
    path: 'atualizar-usuario/:id',
    loadChildren: () => import('./atualizar-usuario/atualizar-usuario.module').then( m => m.AtualizarUsuarioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
