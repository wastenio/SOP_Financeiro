# 💰 Sistema de Controle Financeiro - SOP

Este projeto tem como objetivo desenvolver um sistema completo de controle financeiro para a Secretaria de Obras Públicas (SOP), permitindo a gestão das entidades **Despesa**, **Empenho** e **Pagamento**, respeitando todas as regras de negócio propostas.

---

## 📌 Descrição Geral

A gestão financeira da SOP é baseada em três entidades principais:

- **Despesa**: Representa os processos financeiros registrados.
- **Empenho**: Registra o comprometimento oficial do valor de uma Despesa.
- **Pagamento**: Efetiva a quitação da dívida registrada.

Este sistema web permite **cadastrar, visualizar, editar e excluir** cada uma dessas entidades, com as devidas validações de negócio.

---

## ⚙️ Funcionalidades

### 🧾 Despesa
- Cadastro com os campos:
  - Número de protocolo (único e no formato `#####.######/####-##`)
  - Tipo de despesa (Obra de Edificação, Obra de Rodovias, Outros)
  - Datas de protocolo e vencimento
  - Credor, descrição e valor
  - (Opcional) Status automático com base nos empenhos/pagamentos
- Pode conter vários empenhos.
- Regras:
  - Não pode ser excluída se houver empenhos vinculados.
  - Valor total empenhado e pago não pode ultrapassar o valor da despesa.

### 📑 Empenho
- Cadastro com os campos:
  - Número do empenho (único no formato `AAAANE####`)
  - Data, valor e observação
- Pertence obrigatoriamente a uma única despesa.
- Pode conter vários pagamentos.
- Regras:
  - Não pode ser excluído se houver pagamentos vinculados.
  - Soma dos pagamentos não pode exceder o valor empenhado.

### 💳 Pagamento
- Cadastro com os campos:
  - Número do pagamento (único no formato `AAANP####`)
  - Data, valor e observação
- Pertence obrigatoriamente a um único empenho.

### 🔄 Status automático da Despesa (Opcional)
- **Aguardando Empenho**: Nenhum empenho associado.
- **Parcialmente Empenhada**: Valor empenhado < valor da despesa.
- **Aguardando Pagamento**: Totalmente empenhada, nenhum pagamento.
- **Parcialmente Paga**: Empenhada, pagamentos incompletos.
- **Paga**: Valor pago = valor da despesa.

---

## 🧪 Regras de Negócio

- Protocolo, número de empenho e número de pagamento devem ser **únicos**.
- Empenhos e pagamentos devem respeitar o **limite do valor da despesa**.
- Exclusões são **restritas** se houver dependências.

---

## 🧩 Tecnologias Utilizadas

### 🖥️ Front-End
- [React.js]([https://nextjs.org/](https://react.dev/))
- [React Redux](https://redux.js.org/)
- [Axios](https://axios-http.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Vite](https://vitejs.dev/)
- [JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

### ⚙️ Back-End
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [PostgreSQL](https://www.postgresql.org/)
- [Lombok](https://projectlombok.org/) (opcional)
- Arquitetura MVC
- DTOs e mapeamento com ModelMapper

---

## 🧱 Banco de Dados

- **SGBD:** PostgreSQL
- **Script SQL:** `/backend/scripts/database.sql`
- **Modelo ER:** `/docs/diagrama_ER.drawio`

---

## 🚀 Como Executar o Projeto

### 📦 Backend (Spring Boot)

```bash
# Acesse a pasta do backend
cd backend

# Configure o banco no application.properties

# Execute o projeto
./mvnw spring-boot:run
```
### 🌐 Frontend (React.js + Vite)
```bash
# Acesse a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

- A aplicação estará disponível em: http://localhost:5173
```

### 📁 Estrutura de Diretórios
```bash
src/
├── main/
│   ├── java/com/sop/financeiro
│   │   ├── controllers/
│   │   ├── dtos/
│   │   ├── entities/
│   │   ├── repositories/
│   │   ├── services/
│   │   └── FinanceiroApplication.java
│   └── resources/
│       ├── application.properties
│       └── data.sql
```

### 📁 Frontend /frontend
```bash
src/
├── app/              # Redux Store
├── components/       # Navbar, layout
├── features/
│   ├── despesas/
│   ├── empenhos/
│   └── pagamentos/
└── App.jsx
```

### ✅ Status do Projeto

- ✅ Cadastro, edição e exclusão das entidades
- ✅ Validação das regras de negócio
- ✅ Integração total entre frontend e backend
- ✅ Aplicação responsiva e funcional

### 👨‍💻 Autor
Desenvolvido por [Wastenio da Silva Rocha]

LinkedIn: www.linkedin.com/in/wastenio-da-silva-rocha
