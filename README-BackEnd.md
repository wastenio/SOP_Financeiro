
# SOP Financeiro - Backend API

Este projeto é o backend da aplicação **SOP Financeiro**, desenvolvido em **Java com Spring Boot**, com persistência de dados via banco de dados relacional e integração com a ferramenta de testes **Postman**.

---

## 🔧 Tecnologias Utilizadas

- Java 17
- Spring Boot
- Spring Data JPA
- Spring Security (autenticação e criptografia de senhas)
- Banco de dados relacional (PostgreSQL)
- Maven ou Gradle
- Postman (para testes de API)
- Swagger (documentação da API)
- Lombok
- MapStruct (para conversão entre entidades e DTOs)

---

## 📁 Estrutura do Projeto

- `controller/` - Camada responsável por expor os endpoints REST.
- `service/` - Camada onde estão as regras de negócio.
- `repository/` - Interfaces que interagem com o banco usando Spring Data JPA.
- `model/` - Entidades JPA que representam as tabelas no banco.
- `dto/` - Objetos de transferência de dados usados para comunicação entre camadas.
- `mapper/` - Conversores entre entidades e DTOs.
- `config/` - Configurações globais, como segurança e CORS.

---

## 📦 Funcionalidades Implementadas

### 📌 Cadastro e Gestão de Despesas

A aplicação permite o **CRUD completo** de despesas, com os seguintes campos:

- `numeroProtocolo`: Identificador único da despesa.
- `tipoDespesa`: Obra de Edificação, Obra de Rodovias, Outros.
- `dataProtocolo`: Data de protocolo da despesa.
- `dataVencimento`: Data de vencimento.
- `credor`: Nome do credor.
- `descricao`: Detalhes da despesa.
- `valor`: Valor da despesa.
- `status`: Pendente, Pago, Cancelado, etc.

---

## 🔐 Autenticação e Segurança

A autenticação foi implementada com **login via nome de usuário e senha (customizado)**. As senhas são **criptografadas com BCrypt** no momento do cadastro.

- O campo `password` no DTO é tratado como `WRITE_ONLY`, ou seja:
- Pode ser enviado nas requisições.
- **Não é exibido nas respostas JSON**, garantindo segurança.

## 👤 Cadastro e Login de Usuário

### ✅ Cadastro de Usuário

```http
POST /api/auth/register
Content-Type: application/json

{
  "userName": "seu_usuario",
  "password": "sua_senha",
  "email": "seu_email"
}

- A senha é automaticamente criptografada antes de ser salva.
- A resposta não retorna o campo password (por segurança).
```
## 🔐 Login de Usuário
```http
POST /api/auth/login
Content-Type: application/json

{
  "userName": "seu_usuario",
  "password": "sua_senha"
}

- O sistema verifica se o usuário existe e se a senha está correta.
- Se autenticado, retorna status 200 OK e os dados do usuário autenticado.

```

## 🧪 Testes via Postman

### 🔗 Base URL
```
http://localhost:8080
```

### ✅ Endpoints Disponíveis

#### 🔍 Listar Despesas (GET)
```http
GET /api/despesas/1
```
- Requer autenticação basic auth
- Retorna os dados de uma despesa com ID 1

#### 📝 Criar Despesa (POST)
```http
POST /api/despesas
Content-Type: application/json
```
Body de exemplo:
```json
{
  "credor": "Fornecedor ABC",
  "dataProtocolo": "2025-07-27T12:00:00",
  "dataVencimento": "2025-08-15",
  "descricao": "Descrição da despesa",
  "numeroProtocolo": "090909",
  "status": "Pendente",
  "tipoDespesa": "Obra de Edificação",
  "valor": 1000.50
}
```

#### ✏️ Atualizar Despesa (PUT)
```http
PUT /api/despesas/1
Content-Type: application/json
```
Body de exemplo:
```json
{
  "descricao": "Compra atualizada",
  "valor": 200.0,
  "data": "2025-07-28"
}
```

#### 🗑️ Deletar Despesa (DELETE)
```http
DELETE /api/despesas/1
```

---

## 🧾 Documentação

A documentação da API pode ser acessada via Swagger (se ativado em produção):
```
http://localhost:8080/swagger-ui/index.html
```

---

## 🚀 Execução Local

1. Clone o repositório
2. Configure seu banco de dados (application.properties ou application.yml)
3. Execute a aplicação:
```bash
./mvnw spring-boot:run
```
ou
```bash
./gradlew bootRun
```

---

## 🧑‍💻 Autor

Desenvolvido por Wastenio da Silva Rocha
Projeto profissional: SOP Financeiro
Contato: wastenio.silva@gmail.com
