import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ReceitaService } from './receita.service';
import { Receita } from './receita.entity';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('receita')
export class ReceitaController {

    constructor(private readonly receitaService: ReceitaService) { }
        
    @Public()
    @Post()
    async adicionarReceita(@Body() receita: Receita): Promise<Receita> {
        return this.receitaService.adicionarReceita(receita);
    }

    @Public()
    @Get()
    async listarReceitas(@Query('usuarioId') usuarioId: number): Promise<Receita[]> {
        return this.receitaService.listarReceitas(usuarioId);
    }

    @Public()
    @Get(':id')
    async obterReceitaPorId(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Receita> {
        return this.receitaService.obterReceitaPorId(id);
    }


    @Public()
    @Put(':id')
    async atualizarReceita(@Param('id') id: number, @Body() receita: Receita): Promise<Receita> {
        return this.receitaService.atualizarReceita(id, receita);
    }

    @Public()
    @Delete(':id')
    async excluirReceita(@Param('id') id: number): Promise<void> {
        return this.receitaService.excluirReceita(id);
    }


}
