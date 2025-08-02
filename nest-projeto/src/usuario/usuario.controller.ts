import { Put, Delete, Body, Controller, Get, Param, Post, NotFoundException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { Public } from 'src/auth/decorators/public.decorator';


@Controller('usuario')
export class UsuarioController {
  private users: any = {};

  constructor(private usuarioService: UsuarioService) {
    
  }

/*   @Get("/teste")
  public testando(): string {
    return 'FUNCIONANDO';
  } */


  @Public()
  @Post()
  public async criaUsuario(@Body() usuario: Usuario): Promise<Usuario> {
    return await this.usuarioService.inserir(usuario);
  }


  @Public()
  @Get()
  public retornaTodos(): any {
    this.users = this.usuarioService.buscarTodos();
    return this.users;
  }

  @Public()
  @Get(':id')
  public async retornaPeloId(@Param('id') iden: number): Promise<Usuario> {
    const usuario = await this.usuarioService.buscarPeloId(iden);
    
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${iden} não encontrado.`);
    }
  
    return usuario;
  }
  

  @Public()
  @Get('nome/:first_name')
  public retornaPeloNome(@Param('first_name') name: string): any {
    this.users = this.usuarioService.buscarPeloNome(name);
    return this.users;
  }

@Public()
@Put(':id')
public async atualizaUsuario(
  @Param('id') id: number,
  @Body() usuario: Partial<Usuario>
): Promise<Usuario> {
  return await this.usuarioService.atualizar(id, usuario);
}

@Public()
@Delete(':id')
public async removeUsuario(@Param('id') id: number): Promise<void> {
  await this.usuarioService.excluir(id);
}





}
