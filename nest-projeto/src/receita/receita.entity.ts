import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty, Min } from 'class-validator';
import { Usuario } from '../usuario/usuario.entity';

@Entity()
export class Receita {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @IsNotEmpty({ message: 'O valor da receita não pode ser vazio' })
  @Min(0, { message: 'O valor da receita deve ser positivo' })
  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @IsNotEmpty({ message: 'A descrição da receita não pode ser vazia' })
  @Column({ length: 255 })
  descricao: string;

  @IsNotEmpty({ message: 'A data da receita não pode ser vazia' })
  @Column('date')
  data: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.receitas, { onDelete: 'CASCADE' })
  usuario: Usuario;
}
