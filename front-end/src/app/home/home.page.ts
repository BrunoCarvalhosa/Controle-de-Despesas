import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public usuario: any = {};

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastController: ToastController
  ) {}

  public async login() {
    try {
      const resposta = await this.authenticationService.login(this.usuario);
      if (resposta) {
        await this.exibirToast('Login realizado com sucesso!', 'success');
        this.router.navigate(['/usuario']);
        this.usuario.username = '';
        this.usuario.password = '';
      } else {
        await this.exibirToast('Usuário ou senha incorretos.', 'danger');
      }
    } catch (error) {
      console.error(error);
      await this.exibirToast('Erro ao tentar realizar login.', 'danger');
    }
  }

  public async cadastrarUsuario() {
    this.router.navigate(['/cadastrar-usuario']);
  }

  private async exibirToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color,
    });
    toast.present();
  }
}
