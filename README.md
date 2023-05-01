
# Node Challenger

Este é um projeto em Node.js, que consiste em uma API para gerenciamento DESPESAS.

## Tecnologias utilizadas

-   Node.js
-   Express

## Funcionalidades

A API possui as seguintes funcionalidades:

### Despesas

-   Cadastro de despesa (POST /expenses)
-   Busca de todas as despesas (GET /expenses)
-   Busca de uma despesa específica (GET /expenses/:id)
-   Edição de uma despesa(PUT /expenses/:id)
-   Exclusão de uma despesa (DELETE /expenses/:id)

### Categorias

-   Cadastro de categoria (POST /categories)
-   Busca de todas as categorias (GET /categories)
-   Busca de uma uma categoria específica (GET /categories/:id)
-   Edição de uma categoria(PUT /categories/:id)
-   Exclusão de uma categoria (DELETE /categories/:id)

### Tipos de pagamento

-   Cadastro de tipo de pagamento(POST /payment-types)
-   Busca de todos os tipos de pagamento (GET /payment-types)
-   Busca de um tipo de pagamento específico (GET /payment-types/:id)
-   Edição de um tipo de pagamento(PUT /payment-types/:id)
-   Exclusão de um tipo de pagamento(DELETE /payment-types/:id)

## Configuração de Ambiente
Antes verifique se possui o seguinte ambiente local:
-   MySQL v8
    -   For Mac: https://formulae.brew.sh/formula/mysql
-   Node v16
    -   For Linux/Mac: https://github.com/nvm-sh/nvm
## Instalação

1.  Clone o repositório:
`git clone https://github.com/roxdavirox/node-challenger.git`

2.  Entre na pasta do projeto:
`cd node-challenger`

3.  Instale as dependências:
`npm install`

4.  adicione dados fakes no banco:
`npm run seed`

5.  Inicie o servidor:
`npm start`

6.  copie as variaveis de ambiente
`cp .env.example .env`

## Como utilizar

Após iniciar o servidor, a API estará disponível em `http://localhost:3000`.

## Exemplo de uso

1.  Cadastro de Despesa:


>  POST /expenses
>
>     {
>     	    "value": 50.0,
>		    		"purchase_date": "2023-04-29 14:30:00",
>     	    "description": "Compras do mês",
>     	    "payment_type_id": 1,
>     	    "category_id": 2
>     }


