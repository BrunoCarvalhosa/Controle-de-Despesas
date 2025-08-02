import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FinanceService } from '../services/finance.service';

@Component({
  selector: 'app-cadastradespesa',
  templateUrl: './cadastradespesa.page.html',
  styleUrls: ['./cadastradespesa.page.scss'],
})
export class CadastradespesaPage {
  public novaDespesa = {
    descricao: '',
    valor: null,
    data: '',
  };

  constructor(
    private router: Router,
    private toastController: ToastController,
    private financeService: FinanceService
  ) { }

  ngOnInit() {
  }

  public async salvarDespesa() {
    if (!this.novaDespesa.descricao || !this.novaDespesa.valor || !this.novaDespesa.data) {
      this.exibirToast('Preencha todos os campos.', 'danger');
      return;
    }

    const usuarioId = localStorage.getItem('usuarioId');
    console.log(usuarioId);

    if (!usuarioId) {

      this.exibirToast('Erro ao identificar o usuário logado.', 'danger');
      return;
    }

    const despesaComUsuario = {
      ...this.novaDespesa,
      usuario: { id: parseInt(usuarioId) },
    };

    this.financeService.createDespesa(despesaComUsuario).subscribe(
      () => {
        this.exibirToast('Despesa cadastrada com sucesso.');
        this.router.navigate(['/usuario']);
      },
      (e) =>{
        this.exibirToast('Erro ao cadastrar despesa.', 'danger')
      console.log(e);
      
      } 
    
    );
  }


  public voltar() {
    this.router.navigate(['/usuario']);
  }

  private async exibirToast(mensagem: string, cor: string = 'success', duracao: number = 2000) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: duracao,
      color: cor,
    });
    toast.present();
  }
}
