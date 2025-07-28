# Projeto Backend - Gestão de Despesas Públicas (SOP)

Este projeto foi desenvolvido como parte do processo seletivo para a vaga de Analista na Superintendência de Obras Públicas do Ceará (SOP). O objetivo é construir uma API RESTful para gerenciar despesas públicas, permitindo o cadastro, edição, listagem e remoção de registros de forma eficiente e estruturada.

---

## 🛠 Tecnologias Utilizadas

- **Java 17**
- **Spring Boot 3**
- **Spring Data JPA**
- **Spring Web**
- **Lombok**
- **H2 Database** (ambiente de desenvolvimento)
- **Maven**
- **Postman** (testes da API)
- **Swagger/OpenAPI** (documentação da API)

---

## 📂 Estrutura do Projeto

O projeto segue uma arquitetura em camadas bem definida:

```
src/
├── controller        -> Camada de entrada da aplicação (REST controllers)
├── dto              -> Objetos de transferência de dados (entrada/saída)
├── entity           -> Representações das tabelas do banco de dados
├── mapper           -> Conversão entre DTOs e entidades
├── repository       -> Interfaces de acesso a dados (JPA)
├── service          -> Regras de negócio
└── config           -> Configurações do projeto (Swagger, etc)
```

---

## 🔧 Funcionalidades Implementadas

### ✅ CRUD de Despesas

A API permite as seguintes operações sobre as despesas:

- `GET /despesas` – Listar todas as despesas
- `GET /despesas/{id}` – Buscar uma despesa por ID
- `POST /despesas` – Cadastrar uma nova despesa
- `PUT /despesas/{id}` – Atualizar os dados de uma despesa existente
- `DELETE /despesas/{id}` – Remover uma despesa

### ✅ Validações

- Campos obrigatórios validados via anotação (`@NotNull`, `@NotBlank`)
- Verificação de tipos de despesa permitidos
- Validação de datas e número de protocolo único

---

## 📘 Documentação da API

A documentação interativa da API foi gerada com Swagger e está disponível na URL:

```
http://localhost:8080/swagger-ui/index.html
```

---

## 🧪 Testes com Postman

O projeto foi testado utilizando o [Postman](https://www.postman.com/). Foram realizadas requisições para todos os endpoints, utilizando variáveis globais para facilitar o teste dinâmico:

| Variável   | Valor Inicial             | Valor Atual                         |
|------------|---------------------------|--------------------------------------|
| `base_url` | http://localhost:8080/api | http://localhost:8080/api            |
| `id`       | 1                         | (modificável conforme o uso da API)  |

### 📌 Exemplo de Corpo de Requisição (POST)

```json
{
  "numeroProtocolo": "SOP-2025-001",
  "tipoDespesa": "Obra de Edificação",
  "dataProtocolo": "2025-07-28T10:00:00",
  "dataVencimento": "2025-08-10T17:00:00",
  "valor": 12500.50
}
```

---

## 🗃 Banco de Dados

Durante o desenvolvimento, foi utilizado o banco de dados em memória **H2**. Ele é automaticamente iniciado junto com a aplicação, sem necessidade de configuração adicional.

### Acesso à interface web:

```
http://localhost:8080/h2-console
```

- **JDBC URL**: `jdbc:h2:mem:testdb`
- **User**: `sa`
- **Password**: (em branco)

---

## ▶ Como Executar o Projeto

### Pré-requisitos

- Java 17 instalado
- Maven 3.8+
- IDE (Eclipse, IntelliJ, VSCode, etc)

### Passos

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/sop-backend.git

# Acesse o diretório do projeto
cd sop-backend

# Compile e execute
./mvnw spring-boot:run
```

A aplicação estará disponível em: `http://localhost:8080`

---

## ✍ Autor

**Wastenio Silva**  
[LinkedIn](https://www.linkedin.com/in/seu-linkedin) • [GitHub](https://github.com/seu-usuario)

---

## 📝 Considerações Finais

Este backend foi desenvolvido com foco em boas práticas de arquitetura, organização de código, padronização REST e clareza na comunicação com o banco de dados. O projeto está pronto para ser conectado a um banco relacional real (PostgreSQL, Oracle, etc), caso necessário.
