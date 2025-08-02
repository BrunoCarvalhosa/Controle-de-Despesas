// despesa.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty, Min } from 'class-validator';
import { Usuario } from 'src/usuario/usuario.entity';

@Entity()
export class Despesa {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @IsNotEmpty({ message: 'O valor da despesa não pode ser vazio' })
  @Min(0.1, { message: 'O valor da despesa deve ser maior que 0.1' })
  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @IsNotEmpty({ message: 'A descrição da despesa não pode ser vazia' })
  @Column({ length: 255 })
  descricao: string;

  @IsNotEmpty({ message: 'A data da despesa não pode ser vazia' })
  @Column('date')
  data: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.despesas, { onDelete: 'CASCADE' })
  usuario: Usuario;
}
