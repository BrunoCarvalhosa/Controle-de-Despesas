import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FinanceService } from '../services/finance.service';

@Component({
  selector: 'app-atualizadespesa',
  templateUrl: './atualizadespesa.page.html',
  styleUrls: ['./atualizadespesa.page.scss'],
})
export class AtualizadespesaPage {
  public despesa = {
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
  ) {}

  ngOnInit() {
    this.carregarDespesa();
  }

  private carregarDespesa() {
    const despesaId = this.route.snapshot.paramMap.get('id');
    if (despesaId) {
      this.financeService.getDespesaEspecifica(despesaId).subscribe(
        (dados) => (this.despesa = { ...dados }),
        () => this.exibirToast('Erro ao carregar a despesa.', 'danger')
      );
    } else {
      this.exibirToast('Despesa não encontrada.', 'danger');
      this.voltar();
    }
  }

  public async atualizarDespesa() {
    if (!this.despesa.descricao || !this.despesa.valor || !this.despesa.data) {
      this.exibirToast('Preencha todos os campos.', 'danger');
      return;
    }

    this.financeService.updateDespesa(this.despesa.id, this.despesa).subscribe(
      () => {
        this.exibirToast('Despesa atualizada com sucesso.');
        this.router.navigate(['/usuario']); // Retorna para a página de usuário
      },
      () => this.exibirToast('Erro ao atualizar despesa.', 'danger')
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
