import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FinanceService } from '../services/finance.service';

@Component({
  selector: 'app-atualizar-usuario',
  templateUrl: './atualizar-usuario.page.html',
  styleUrls: ['./atualizar-usuario.page.scss'],
})
export class AtualizarUsuarioPage implements OnInit {

  public usuario = {
    id: '',
    nome: '',
    sobrenome: '',
    idade: null,
    email: '',
    senha: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private financeService: FinanceService
  ) {}

  ngOnInit() {
    this.carregarUsuarioId();
  }

  private carregarUsuarioId() {
    const usuarioId = this.route.snapshot.paramMap.get('id');
    if (usuarioId) {
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
    } else {
      this.exibirToast('ID do usuário não encontrado.', 'danger');
    }
  }

  public async atualizarUsuario() {
    if (!this.usuario.nome || !this.usuario.sobrenome || !this.usuario.idade
      || !this.usuario.email || !this.usuario.senha) {
      this.exibirToast('Preencha todos os campos antes de atualizar.', 'danger');
      return;
    }

    this.financeService.updateUsuario(this.usuario.id, this.usuario).subscribe(
      () => {
        this.exibirToast('Usuário atualizado com sucesso.');
        this.router.navigate(['/usuario']); 
      },
      (erro) => {
        console.error('Erro ao atualizar usuário:', erro);
        this.exibirToast('Erro ao atualizar usuário.', 'danger');
      }
    );
  }

  public excluirConta() {
    if (this.usuario.id) {
      this.financeService.deleteUsuario(this.usuario.id).subscribe(
        () => {
          this.exibirToast('Conta excluída com sucesso. Você será redirecionado para a página inicial.', 'success');
          this.router.navigate(['/home']); 
        },
        (erro) => {
          console.error('Erro ao excluir conta:', erro);
          this.exibirToast('Erro ao excluir conta.', 'danger');
        }
      );
    } else {
      this.exibirToast('Usuário não encontrado.', 'danger');
    }
  }
  

  private async exibirToast(mensagem: string, cor: string = 'success', duracao: number = 2000) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: duracao,
      color: cor,
    });
    toast.present();
  }

  public voltar() {
    this.router.navigate(['/usuario']);
  }
}
