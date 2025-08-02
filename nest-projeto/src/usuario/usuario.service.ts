import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) { }

  public inserir(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.save(usuario);
  }

  public buscarTodos(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  public buscarPeloId(iden: any): Promise<Usuario> {
    return this.usuarioRepository.findOne({
      select: ['id', 'nome', 'sobrenome', 'idade', 'email', 'senha'],
      where: { id: iden },
    });
  }
  

  public async buscarPeloNome(nome: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({
      where: { nome: nome },
      select: ['id', 'nome', 'senha'], 
    });
  }
  


  public async atualizar(id: number, usuario: Partial<Usuario>): Promise<Usuario> {
    await this.usuarioRepository.update(id, usuario);
    return this.usuarioRepository.findOneBy({ id });
  }

  public async excluir(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }




}
