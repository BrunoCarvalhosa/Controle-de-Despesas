import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { APP_GUARD } from '@nestjs/core';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    UsuarioModule,
    JwtModule.registerAsync({
       imports:[ConfigModule],
       useFactory: async (configService: ConfigService) => ({
         secret: configService.get("SECRET"),
         signOptions: { expiresIn: '60s' },
       }),
       inject: [ConfigService],
       global: true,
     }),
  ],
  providers: [AuthService,{
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
  exports:[AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
  
  