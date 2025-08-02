import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Receita } from './receita.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/usuario.entity';

@Injectable()
export class ReceitaService {
  constructor(
    @InjectRepository(Receita)
    private receitaRepository: Repository<Receita>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) { }

  async adicionarReceita(receita: Receita): Promise<Receita> {
    const usuario = await this.usuarioRepository.findOne({ where: { id: receita.usuario.id } });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    receita.usuario = usuario;
    return this.receitaRepository.save(receita);
  }

  async listarReceitas(usuarioId: number): Promise<Receita[]> {
    return this.receitaRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: ['usuario'],
    });
  }


  async obterReceitaPorId(id: number): Promise<Receita> {
    const receita = await this.receitaRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });

    if (!receita) {
      throw new NotFoundException(`Receita com ID ${id} não encontrada.`);
    }

    return receita;
  }

  async atualizarReceita(id: number, receita: Receita): Promise<Receita> {
    const receitaExistente = await this.receitaRepository.findOne({ where: { id }, relations: ['usuario'] });
    if (!receitaExistente) {
      throw new NotFoundException('Receita não encontrada');
    }

    receitaExistente.valor = receita.valor;
    receitaExistente.descricao = receita.descricao;
    receitaExistente.data = receita.data;

    return this.receitaRepository.save(receitaExistente);
  }

  async excluirReceita(id: number): Promise<void> {
    const receita = await this.receitaRepository.findOne({ where: { id } });
    if (!receita) {
      throw new NotFoundException('Receita não encontrada');
    }
    await this.receitaRepository.remove(receita);
  }
}
