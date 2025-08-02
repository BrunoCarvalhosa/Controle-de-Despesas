import { Module } from '@nestjs/common';
import { ReceitaController } from './receita.controller';
import { ReceitaService } from './receita.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receita } from './receita.entity';
import { Usuario } from 'src/usuario/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receita, Usuario])],
  controllers: [ReceitaController],
  providers: [ReceitaService]
})
export class ReceitaModule {}
