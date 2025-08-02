import { Injectable, NotFoundException } from '@nestjs/common';
import { Despesa } from './despesa.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DespesaService {
  constructor(
    @InjectRepository(Despesa)
    private despesaRepository: Repository<Despesa>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) { }

  async adicionarDespesa(despesa: Despesa): Promise<Despesa> {
    const usuario = await this.usuarioRepository.findOne({ where: { id: despesa.usuario.id } });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    despesa.usuario = usuario;
    return this.despesaRepository.save(despesa);
  }

  /*   async listarDespesas(): Promise<Despesa[]> {
      return this.despesaRepository.find({
        relations: ['usuario'], 
      });
    } */

  async listarDespesas(usuarioId: number): Promise<Despesa[]> {
    return this.despesaRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: ['usuario'],
    });
  }


  async obterDespesaPorId(id: number): Promise<Despesa> {
    const despesa = await this.despesaRepository.findOne({
      where: { id },
      relations: ['usuario'], 
    });

    if (!despesa) {
      throw new NotFoundException(`Despesa com ID ${id} não encontrada.`);
    }

    return despesa;
  }

  async atualizarDespesa(id: number, despesa: Despesa): Promise<Despesa> {
    const despesaExistente = await this.despesaRepository.findOne({ where: { id }, relations: ['usuario'] });
    if (!despesaExistente) {
      throw new NotFoundException('Despesa não encontrada');
    }

    despesaExistente.valor = despesa.valor;
    despesaExistente.descricao = despesa.descricao;
    despesaExistente.data = despesa.data;

    return this.despesaRepository.save(despesaExistente);
  }

  async excluirDespesa(id: number): Promise<void> {
    const despesa = await this.despesaRepository.findOne({ where: { id } });
    if (!despesa) {
      throw new NotFoundException('Despesa não encontrada');
    }
    await this.despesaRepository.remove(despesa);
  }
}
