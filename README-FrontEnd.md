# 💼 Sistema de Gestão de Despesas Públicas (SOP) — Frontend

Este projeto é uma aplicação **frontend** desenvolvida com **React** e **Redux Toolkit**, com foco em **cadastro, listagem e gerenciamento de Despesas, Empenhos e Pagamentos**. A interface é estilizada com **Bootstrap** para garantir responsividade e uma boa experiência visual ao usuário.

---

## 🚀 Tecnologias Utilizadas

- **React.js** — Biblioteca para construção da interface de usuário
- **Redux Toolkit** — Gerenciamento de estado global de forma simplificada
- **React Router DOM** — Roteamento entre páginas
- **Bootstrap 5** — Estilização responsiva e elegante
- **Vite** — Ferramenta de build e desenvolvimento rápido
- **JavaScript (ES6+)**

---

## 🧱 Estrutura do Projeto

![](../SOP_Financeiro/sop-frontend/sop-frontend-completo/image/estrutura_front.png)


---

## 🖼️ Funcionalidades

- ✅ **Página Inicial (Home)**
  - Interface amigável com opções de navegação
  - Estilização responsiva com Bootstrap

- ✅ **Despesas**
  - Cadastro de despesas com campos controlados
  - Lista de despesas adicionadas
  - Integração com Redux Toolkit

- ✅ **Empenhos**
  - Formulário para cadastro de empenhos
  - Listagem dos registros inseridos
  - Estado centralizado com Redux

- ✅ **Pagamentos**
  - Formulário para adicionar pagamentos
  - Exibição dinâmica dos dados cadastrados
  - Padrão visual uniforme com os demais módulos

- ✅ **Navbar global**
  - Navegação entre Home, Despesas, Empenhos e Pagamentos
  - Estilizada com Bootstrap

---

## 📦 Instalação e Execução

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/sop-frontend.git
cd sop-frontend

## Instale as dependências:
npm install

## Execute o projeto:

npm run dev

```

## 🎨 Estilização
Utilização de Bootstrap 5

Layouts responsivos com container, row, col-md, card, shadow, mb-4, entre outros utilitários

Separação visual clara entre formulários e listagens

## ⚙️ Gerenciamento de Estado (Redux Toolkit)

Cada módulo (despesas, empenhos, pagamentos) possui:

Um slice Redux com createSlice

Estados locais (initialState)

Actions e reducers definidos para adicionar e listar

Uso de useDispatch e useSelector nos componentes

A store principal (store.js) agrega todos os reducers e é injetada via <Provider> no main.jsx.

## 📁 Requisitos para Rodar

Node.js 16 ou superior

NPM ou Yarn

Navegador moderno

JavaScript habilitado

## 💡 Considerações

Este projeto foi desenvolvido com fins de apresentação técnica em processo seletivo, com foco em:

Boas práticas de componentização

Separação de responsabilidades (form, listagem, estado)

Organização de estrutura escalável

Uso de Redux de forma moderna e simplificada

Interface limpa e responsiva

## 🧑‍💻 Autor
Wastenio Silva


