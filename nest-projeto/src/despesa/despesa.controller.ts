import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Request } from '@nestjs/common';
import { DespesaService } from './despesa.service';
import { Despesa } from './despesa.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { GlobalExceptionFilter } from 'src/exception/global-exception-filter';

@Controller('despesa')
export class DespesaController {
    constructor(private readonly despesaService: DespesaService) { }


    @Public()
    @Post()
    async adicionarDespesa(@Body() despesa: Despesa): Promise<Despesa> {
        if (!despesa.valor || despesa.valor <= 0) {
            throw new BadRequestException('O valor da despesa deve ser maior que zero.');
        }

        if (!despesa.descricao || despesa.descricao.trim() === '') {
            throw new BadRequestException('A descrição da despesa é obrigatória.');
        }

        return this.despesaService.adicionarDespesa(despesa);
    }

    
    /*    @Public()
       @Post()
       async adicionarDespesa(@Body() despesa: Despesa): Promise<Despesa> {
           return this.despesaService.adicionarDespesa(despesa);
       } */

    @Public()
    @Get()
    async listarDespesas(@Query('usuarioId') usuarioId: number): Promise<Despesa[]> {
        //console.log('UsuarioId passado:', usuarioId);
        return this.despesaService.listarDespesas(usuarioId);
    }

    /* async listarDespesas(): Promise<Despesa[]> {
    return this.despesaService.listarDespesas();
} */

    @Public()
    @Get(':id')
    async obterDespesaPorId(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Despesa> {
        return this.despesaService.obterDespesaPorId(id);
    }



    /*   @Get(':id')
      async obterDespesaPorId(@Param('id') id: string): Promise<Despesa> {
        const idNumero = parseInt(id, 10); // Converte o parâmetro para número
    
        if (isNaN(idNumero)) {
          throw new BadRequestException('O ID deve ser um número válido.');
        }
    
        return this.despesaService.obterDespesaPorId(idNumero);
      } */

    @Public()
    @Put(':id')
    async atualizarDespesa(@Param('id') id: number, @Body() despesa: Despesa): Promise<Despesa> {
        return this.despesaService.atualizarDespesa(id, despesa);
    }

    @Public()
    @Delete(':id')
    async excluirDespesa(@Param('id') id: number): Promise<void> {
        return this.despesaService.excluirDespesa(id);
    }

}
