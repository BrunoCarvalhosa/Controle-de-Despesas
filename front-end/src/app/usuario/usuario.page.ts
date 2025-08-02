import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FinanceService } from '../services/finance.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage {
  public receitas: any[] = [];
  public despesas: any[] = [];
  public total: number = 0;
  public somaRec: number = 0;
  public somaDesp: number = 0;
  public nome: string = '';
  public usuario: any;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private financeService: FinanceService
  ) {
    this.calcularTotal();
  }

  ngOnInit() {
    this.carregarReceitas();
    this.carregarDespesas();
    this.carregarNomeUsuario();
    this.carregarUsuarioId();
  }

  ionViewWillEnter() {
    this.carregarReceitas();
    this.carregarDespesas();
    this.carregarNomeUsuario();
    this.carregarUsuarioId();
  }

  private carregarUsuarioId() {
      const usuarioId = localStorage.getItem('usuarioId');
      if (!usuarioId) {
        this.exibirToast('Erro ao identificar o usuário logado.', 'danger');
        return;
      }
    
      this.financeService.getUsuario(usuarioId).subscribe(
        (dados) => {
          this.usuario = dados;
          console.log('Usuário carregado:', this.usuario);
        },
        (erro) => {
          console.error('Erro ao carregar usuário:', erro);
          this.exibirToast('Erro ao carregar usuário.', 'danger');
        }
      );    
  }
  

  private carregarNomeUsuario() {
    const username = localStorage.getItem('username'); 
    if (username) {
      this.nome = username.toUpperCase();
    } else {
      console.error('Usuário não encontrado no localStorage.');
    }
  }

  public somaReceitas(){
    const somaReceitas = this.receitas.reduce((acc, receita) => acc + parseFloat(receita.valor || '0'), 0);
    this.somaRec = somaReceitas;
  }

  public somaDespesas(){
    const somaDespesas = this.despesas.reduce((acc, despesa) => acc + parseFloat(despesa.valor || '0'), 0);
  this.somaDesp = somaDespesas; 
  }

  public calcularTotal() {
  
    const somaReceitas = this.receitas.reduce((acc, receita) => acc + parseFloat(receita.valor || '0'), 0);
    const somaDespesas = this.despesas.reduce((acc, despesa) => acc + parseFloat(despesa.valor || '0'), 0);
  
    this.total = somaReceitas - somaDespesas;
  }
  
  

  private async exibirToast(mensagem: string, cor: string = 'success', duracao: number = 2000) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: duracao,
      color: cor,
    });
    toast.present();
  }

  public desconectar() {
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('username');
    this.router.navigate(['/home']);
  }

/*   public carregarReceitas() {
    this.financeService.getReceitas().subscribe((dados) => {
      this.receitas = dados;
    });
  } */

    public carregarReceitas() {
      const usuarioId = localStorage.getItem('usuarioId');
      //console.log(usuarioId);
      
      if (!usuarioId) {
          this.exibirToast('Erro ao identificar o usuário logado.', 'danger');
          return;
      }
  
      this.financeService.getReceitas(usuarioId).subscribe(
          (dados) => {
              this.receitas = dados;
              this.calcularTotal();
              this.somaReceitas();
          },
          (erro) => {
              console.error('Erro ao carregar receitas:', erro);
              this.exibirToast('Erro ao carregar receitas.', 'danger');
          }
      );
  }

/*   public carregarDespesas() {
    this.financeService.getDespesas().subscribe((dados) => {
      this.despesas = dados;
    });
  } */

    public carregarDespesas() {
      const usuarioId = localStorage.getItem('usuarioId'); 
      console.log(usuarioId);
      
      if (!usuarioId) {
          this.exibirToast('Erro ao identificar o usuário logado.', 'danger');
          return;
      }
  
      this.financeService.getDespesas(usuarioId).subscribe(
          (dados) => {
              this.despesas = dados;
              this.calcularTotal();
              this.somaDespesas();
          },
          (erro) => {
              console.error('Erro ao carregar despesas:', erro);
              this.exibirToast('Erro ao carregar despesas.', 'danger');
          }
      );
  }
  

  public async cadastrarReceita() {
    const novaReceita = { descricao: 'Nova Receita', valor: 100 };
    this.financeService.createReceita(novaReceita).subscribe(
      () => {
        this.carregarReceitas();
        this.exibirToast('Receita cadastrada com sucesso.');
      },
      () => this.exibirToast('Erro ao cadastrar receita.', 'danger')
    );
  }

  public async deletarReceita(id: string) {
    this.financeService.deleteReceita(id).subscribe(
      () => {
        this.carregarReceitas();
        this.exibirToast('Receita excluída com sucesso.');
      },
      () => this.exibirToast('Erro ao excluir receita.', 'danger')
    );
  }

  public async deletarDespesa(id: string) {
    this.financeService.deleteDespesa(id).subscribe(
      () => {
        this.carregarDespesas();
        this.exibirToast('Despesa excluída com sucesso.');
      },
      () => this.exibirToast('Erro ao excluir despesa.', 'danger')
    );
  }

  public async atualizarReceita(id: string) {
    const receitaAtualizada = { descricao: 'Receita Atualizada', valor: 200 }; 
    this.financeService.updateReceita(id, receitaAtualizada).subscribe(
      () => {
        this.carregarReceitas();
        this.exibirToast('Receita atualizada com sucesso.');
      },
      () => this.exibirToast('Erro ao atualizar receita.', 'danger')
    );
  }

  public async atualizarDespesa(id: string) {
    const despesaAtualizada = { descricao: 'Despesa Atualizada', valor: 75 }; 
    this.financeService.updateDespesa(id, despesaAtualizada).subscribe(
      () => {
        this.carregarDespesas();
        this.exibirToast('Despesa atualizada com sucesso.');
      },
      () => this.exibirToast('Erro ao atualizar despesa.', 'danger')
    );
  }

  public atualizarDespesaRota(id: string) {
    this.router.navigate(['/atualizadespesa', id]);
  }

  public atualizarReceitaRota(id: string) {
    this.router.navigate(['/atualizareceita', id]);
  }

  public atualizarPerfilRota(id: string) {
    if (id) {
      this.router.navigate(['/atualizar-usuario', id]); 
    } else {
      console.error('ID do usuário não encontrado.');
      this.exibirToast('ID do usuário não encontrado.', 'danger');
    }
  }
  
  
  
}
