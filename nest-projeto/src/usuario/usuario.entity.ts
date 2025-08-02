import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, Length, Min } from 'class-validator';
import { Receita } from 'src/receita/receita.entity';
import { Despesa } from 'src/despesa/despesa.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @Length(3, 10, { message: 'Nome precisa ter entre 3 e 10 caracteres' })
  @Column({ name: "nome", length: 50 })
  nome: string;

  @Column({ name: "sobrenome", length: 25 })
  sobrenome: string;

  @Column({ name: "idade", nullable: true })
  @IsNotEmpty()
  @Min(18, { message: "A idade deve ser maior ou igual a 18 anos" })
  idade: number;

  @IsEmail({}, { message: 'Email inválido' })
  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ name: "senha", nullable: true })
  @IsNotEmpty()
  senha: string;

  @OneToMany(() => Receita, (receita) => receita.usuario, { cascade: true })
  receitas: Receita[];

  @OneToMany(() => Despesa, (despesa) => despesa.usuario, { cascade: true })
  despesas: Despesa[];

}
