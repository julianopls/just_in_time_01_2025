# Just in Time

Sistema web de **Gestão da Produção** desenvolvido para controle de produtos, estoque e movimentações de fabricação/pedidos, seguindo a lógica *just in time*. O projeto foi construído a partir de um documento de requisitos para uma fábrica de móveis em MDF.

## Índice

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Capturas de tela](#capturas-de-tela)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como executar](#como-executar)
- [Rotas da API](#rotas-da-api)
- [Documentação](#documentação)

## Sobre o projeto

O **Just in Time** é uma aplicação full stack simples, com backend em **Node.js/Express** e frontend em **HTML, CSS e JavaScript puro**, que permite:

- Autenticar usuários no sistema;
- Cadastrar, editar, pesquisar e excluir produtos;
- Registrar movimentações de produção (**fabricado**) e de saída (**pedido**);
- Atualizar o estoque automaticamente a cada movimentação, com alerta quando o estoque fica abaixo do mínimo definido.

## Funcionalidades

- 🔐 **Login** de usuários (`/login`)
- 📦 **CRUD de produtos** (nome, descrição, custo, estoque atual e estoque mínimo)
- 🏭 **Registro de produção/pedido**, com:
  - Validação de tipo (`fabricado` ou `pedido`);
  - Validação de quantidade;
  - Bloqueio de pedidos quando o estoque é insuficiente;
  - Atualização automática do estoque do produto;
  - Aviso quando o estoque final fica abaixo do estoque mínimo.
- 📊 **Histórico de movimentações**, com produto e usuário responsável
- 👤 **CRUD de usuários**

## Tecnologias

**Backend**
- [Node.js](https://nodejs.org/)
- [Express 5](https://expressjs.com/)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://www.npmjs.com/package/cors)

**Frontend**
- HTML5
- CSS3
- JavaScript (Fetch API)

## Relatorio de TESTE

### Telas do sistema

| Login | Início |
|---|---|
| ![Tela de login](assets/Captura%20de%20tela%202026-09-02%20142039.png) | ![Tela inicial](assets/Captura%20de%20tela%202026-09-02%20142050.png) |

| Produtos cadastrados | Exclusão de produto |
|---|---|
| ![Lista de produtos](assets/Captura%20de%20tela%202026-09-02%20142101.png) | ![Produto excluído com sucesso](assets/Captura%20de%20tela%202026-09-02%20142134.png) |

| Edição de produto | Registrar movimentação / estoque |
|---|---|
| ![Edição de produto](assets/Captura%20de%20tela%202026-09-02%20142147.png) | ![Tela de produção](assets/Captura%20de%20tela%202026-09-02%20142210.png) |

### Testes das rotas da API (Insomnia)

**Autenticação**

| POST /login — validação de campos obrigatórios |
|---|
| ![Login sem email/senha](assets/Captura%20de%20tela%202026-09-02%20142422.png) |

**Usuários**

| GET /usuarios | GET /usuario/:id |
|---|---|
| ![Listar usuários](assets/Captura%20de%20tela%202026-09-02%20142556.png) | ![Buscar usuário](assets/Captura%20de%20tela%202026-09-02%20142543.png) |

| POST /usuario | PUT /usuario |
|---|---|
| ![Cadastrar usuário](assets/Captura%20de%20tela%202026-09-02%20142550.png) | ![Atualizar usuário](assets/Captura%20de%20tela%202026-09-02%20142603.png) |

| DELETE /usuario/:id |
|---|
| ![Excluir usuário](assets/Captura%20de%20tela%202026-09-02%20142614.png) |

**Produtos**

| GET /produtos | GET /produto/:id |
|---|---|
| ![Listar produtos](assets/Captura%20de%20tela%202026-09-02%20142532.png) | ![Buscar produto](assets/Captura%20de%20tela%202026-09-02%20142520.png) |

| POST /produto | PUT /produto |
|---|---|
| ![Cadastrar produto](assets/Captura%20de%20tela%202026-09-02%20142508.png) | ![Atualizar produto](assets/Captura%20de%20tela%202026-09-02%20142500.png) |

| DELETE /produto/:id |
|---|
| ![Excluir produto](assets/Captura%20de%20tela%202026-09-02%20142451.png) |

**Produção**

| GET /producoes | POST /producao — estoque insuficiente |
|---|---|
| ![Listar produções](assets/Captura%20de%20tela%202026-09-02%20142444.png) | ![Erro de estoque insuficiente](assets/Captura%20de%20tela%202026-09-02%20142434.png) |

## Estrutura do projeto

```
just_in_time_01_2025/
├── assets/                          # Capturas de tela do sistema e dos testes da API
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── producaoController.js
│   │   ├── produtoController.js
│   │   └── usuarioController.js
│   ├── database/
│   │   └── database.js              # Conexão com o MySQL (pool via mysql2)
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── producaoRoutes.js
│   │   ├── produtoRoutes.js
│   │   └── usuarioRoutes.js
│   ├── package.json
│   └── server.js                    # Ponto de entrada da API (porta 3000)
├── frontend/
│   ├── css/
│   ├── js/
│   ├── index.html                   # Tela inicial
│   ├── login.html                   # Tela de login
│   ├── produto.html                 # Cadastro/listagem de produtos
│   └── producao.html                # Registro de movimentação e estoque
└── Documento de requisitos MDF.pdf  # Requisitos originais do projeto
```

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- Um servidor **MySQL** disponível

### 1. Clonar o repositório

```bash
git clone https://github.com/julianopls/just_in_time_01_2025.git
cd just_in_time_01_2025
```

### 2. Configurar o banco de dados

Crie um banco de dados e as tabelas utilizadas pela aplicação (`usuario`, `produto` e `producao`). Um exemplo de estrutura compatível com o código:

```sql
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE produto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    custo DECIMAL(10,2) NOT NULL,
    quantidade_estoque INT NOT NULL DEFAULT 0,
    estoque_minimo INT NOT NULL DEFAULT 0
);

CREATE TABLE producao (
    id_producao INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('fabricado', 'pedido') NOT NULL,
    quantidade INT NOT NULL,
    data DATE NOT NULL,
    id_usuario INT NOT NULL,
    id_produto INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
);
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `backend/`:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco
```

### 4. Instalar dependências e rodar o backend

```bash
cd backend
npm install
node server.js
```

A API sobe em `http://localhost:3000`.

### 5. Rodar o frontend

Abra `frontend/login.html` diretamente no navegador ou sirva a pasta `frontend` com uma extensão como o **Live Server**. O frontend está configurado para consumir a API em `http://localhost:3000`.

## Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| POST | `/login` | Autentica um usuário (email/senha) |
| GET | `/usuarios` | Lista todos os usuários |
| GET | `/usuario/:id` | Busca um usuário pelo ID |
| POST | `/usuario` | Cadastra um usuário |
| PUT | `/usuario` | Atualiza um usuário |
| DELETE | `/usuario/:id` | Exclui um usuário |
| GET | `/produtos` | Lista todos os produtos |
| GET | `/produto/:id` | Busca um produto pelo ID |
| POST | `/produto` | Cadastra um produto |
| PUT | `/produto` | Atualiza um produto |
| DELETE | `/produto/:id` | Exclui um produto |
| GET | `/producoes` | Lista o histórico de produções/pedidos |
| POST | `/producao` | Registra uma movimentação (`fabricado` ou `pedido`) e atualiza o estoque |

## Documentação

O documento de requisitos original do projeto está disponível em [`Documento de requisitos MDF.pdf`](Documento%20de%20requisitos%20MDF.pdf).
