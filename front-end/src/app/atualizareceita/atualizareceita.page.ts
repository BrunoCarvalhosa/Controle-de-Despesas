import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FinanceService } from '../services/finance.service';

@Component({
  selector: 'app-atualizareceita',
  templateUrl: './atualizareceita.page.html',
  styleUrls: ['./atualizareceita.page.scss'],
})
export class AtualizareceitaPage implements OnInit {

  public receita = {
    id: '',
    descricao: '',
    valor: null,
    data: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private financeService: FinanceService
  ) { }

  ngOnInit() {
    this.carregarReceita();
  }

  private carregarReceita() {
    const receitaId = this.route.snapshot.paramMap.get('id');
    if (receitaId) {
      this.financeService.getReceitaEspecifica(receitaId).subscribe(
        (dados) => (this.receita = { ...dados }),
        () => this.exibirToast('Erro ao carregar a receita.', 'danger')
      );
    } else {
      this.exibirToast('Receita não encontrada.', 'danger');
      this.voltar();
    }
  }

  public async atualizarReceita() {
    if (!this.receita.descricao || !this.receita.valor || !this.receita.data) {
      this.exibirToast('Preencha todos os campos.', 'danger');
      return;
    }

    this.financeService.updateReceita(this.receita.id, this.receita).subscribe(
      () => {
        this.exibirToast('Receita atualizada com sucesso.');
        this.router.navigate(['/usuario']); // Retorna para a página de usuário
      },
      () => this.exibirToast('Erro ao atualizar receita.', 'danger')
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
