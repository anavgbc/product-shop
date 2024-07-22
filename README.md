# CRUD de Produtos e Categorias 💵

Este projeto é uma aplicação de gerenciamento de produtos e categorias construída com Vue.js e TypeScript.

## Requisitos

-   Node.js (versão 14 ou superior)
-   NPM (versão 6 ou superior)

## Dados para acesso

Para acessar a aplicação, efetue o login usando as seguintes credenciais:

```yaml
email: email@email.com
senha: 1234
```

## Configuração do Ambiente

### 1. Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/product-shop.git
cd product-shop
```

### 2. Instalando as dependências

```bash
npm install
```

### 3. Configurando variáveis de ambiente

Crie um arquivo .env na raiz do projeto e adicione a seguinte variável de ambiente:

```bash
VITE_API_URL=http://localhost:3001
```

### 4. Rodando a API

```bash
npm run serve
```

O servidor deve rodar na porta '3001'.

### 5. Rodando a aplicação

```bash
npm run dev
```

## Sobre a Aplicação

### Produtos

-   **Cadastrar um Produto**: É possível cadastrar novos produtos.
-   **Editar um Produto**: Atualizar as informações de um produto existente.
-   **Deletar um Produto**: Remover um produto.
-   **Listar Todos os Produtos**: Exibir uma lista com todos os produtos cadastrados.

### Categorias

-   **Cadastrar uma Categoria**: Adicionar novas categorias.
-   **Editar uma Categoria**: Atualizar as informações de uma categoria existente.
-   **Deletar uma Categoria**: Remover uma categoria do sistema.
-   **Listar Todas as Categorias**: Exibir uma lista com todas as categorias cadastradas.

### Associação de Produtos e Categorias

-   **Associar um Produto a uma Categoria**: Vincular um produto a uma categoria específica.
-   **Listar Todos os Produtos por Categoria**: Exibir uma lista de produtos filtrados por categoria.
