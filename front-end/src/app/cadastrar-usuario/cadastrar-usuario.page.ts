import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.page.html',
  styleUrls: ['./cadastrar-usuario.page.scss'],
})
export class CadastrarUsuarioPage implements OnInit {

  private urlBase = 'http://localhost:3000';

  public novoUsuario = {
    nome: '',
    sobrenome: '',
    idade: null,
    email: '',
    senha: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  createUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.urlBase}/usuario`, usuario);
  }

  public async salvarUsuario() {
    if (!this.novoUsuario.nome || !this.novoUsuario.sobrenome || !this.novoUsuario.idade
      || !this.novoUsuario.email || !this.novoUsuario.senha) {
      this.exibirToast('Preencha todos os campos.', 'danger');
      return;
    }

    this.createUsuario(this.novoUsuario).subscribe(
      () => {
        this.exibirToast('Usuário cadastrado com sucesso.');
        this.router.navigate(['/home']);
      },
      () => this.exibirToast('Erro ao cadastrar usuário.', 'danger')
    );
  }


  public voltar() {
    this.router.navigate(['/home']);
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
