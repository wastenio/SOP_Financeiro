
# SOP Financeiro - Backend API

Este projeto é o backend da aplicação **SOP Financeiro**, desenvolvido em **Java com Spring Boot**, com persistência de dados via banco de dados relacional e integração com a ferramenta de testes **Postman**.

---

## 🔧 Tecnologias Utilizadas

- Java 17
- Spring Boot
- Spring Data JPA
- Banco de dados relacional (PostgreSQL ou outro)
- Maven ou Gradle
- Postman (para testes de API)
- Swagger (documentação da API)
- Lombok

---

## 📁 Estrutura do Projeto

- `controller`: Camada responsável por expor os endpoints REST.
- `service`: Contém as regras de negócio da aplicação.
- `repository`: Interface com o banco de dados usando Spring Data JPA.
- `model`: Entidades mapeadas com JPA.
- `dto`: Objetos de transferência de dados para entrada/saída.
- `config`: Configurações globais da aplicação.

---

## 📦 Funcionalidades Implementadas

### 📌 Cadastro e Gestão de Despesas

A aplicação permite o **CRUD completo** de despesas, com os seguintes campos:

- `numeroProtocolo`: Número identificador único da despesa.
- `tipoDespesa`: Tipo da despesa (Obra de Edificação, Obra de Rodovias, Outros).
- `dataProtocolo`: Data em que a despesa foi protocolada.
- `dataVencimento`: Data de vencimento.
- `credor`: Nome do credor.
- `descricao`: Descrição detalhada da despesa.
- `valor`: Valor monetário.
- `status`: Pendente, Pago, Cancelado, etc.

---

## 🔐 Autenticação

Autenticação do tipo **Basic Auth** é usada nos endpoints, com usuário `user` e senha gerada dinamicamente.

---

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

Desenvolvido por Wastenio da Silva Rocha para o projeto SOP Financeiro.
