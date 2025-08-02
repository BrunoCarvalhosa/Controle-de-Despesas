import { Module } from '@nestjs/common';
import { DespesaController } from './despesa.controller';
import { DespesaService } from './despesa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Despesa } from './despesa.entity';
import { Usuario } from 'src/usuario/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Despesa, Usuario])],
  controllers: [DespesaController],
  providers: [DespesaService]
})
export class DespesaModule { }
