# 📊 Controle de Despesas Pessoal

**Trabalho final da disciplina de Ferramentas de Programação III (6º semestre)**  
Full-stack com NestJS (backend) e Ionic (frontend) para gerenciar receitas, despesas e usuários.

## Funcionalidades
- Cadastro/login de usuário (JWT)
- CRUD de receitas e despesas
- Resumo de saldo (receitas – despesas)

## Tecnologias
- **Backend**: NestJS, TypeORM, MySQL, @nestjs/config, JWT  
- **Frontend**: Ionic, Angular, TypeScript, Ionic Storage

## Como rodar

### Backend
```bash
npm install
# crie .env com DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, JWT_SECRET
npm run start:dev

npm install
# ajuste apiUrl em src/environments/environment.ts (ex.: http://localhost:3000)
ionic serve
