
import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Usuario } from 'src/usuario/usuario.entity';
import { AuthGuard } from './auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    const resposta = this.authService.signIn(signInDto.username, signInDto.password);
    //console.log(resposta)
    return resposta;   
  }

  @Get('profile')
  getProfile(@Request() req) {
    //console.log('Usuário na requisição:', req.user);
    return req.user;
  }
  
}
