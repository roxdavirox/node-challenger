

# Node Challenger

Este é um projeto em Node.js, que consiste em uma API para gerenciamento DESPESAS.

## Tecnologias utilizadas

-   Node.js
-   Express

## Conceitos
- Clean code
- SOLID(mas, nao completo - sem o principio de liskov)
- design pattern: repository pattern para encapsular o acesso ao banco
- POO
- Funcional(alguns trechos de detalhes de implementação com paradigma funcional)

## Funcionalidades

A API possui as seguintes funcionalidades:

### Despesas

-   Cadastro de despesa (POST /expenses)
-   Busca de todas as despesas (GET /expenses)
-	Buscar despesas com filtro e gerar PDF (GET /expenses/pdf?start_date=2023-01-01&end_date=2023-04-30)
-   Buscar despesas do mês atual e gerar um excel(GET /expenses/excel/:id)
-   Busca de uma despesa específica (GET /expenses/:id)
-   Edição de uma despesa(PUT /expenses/:id)
-   Edição parcial de uma despesa(PATCH /expenses/:id)
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
>		          "purchase_date": "2023-04-29 14:30:00",
>     	    "description": "Compras do mês",
>     	    "payment_type_id": 1,
>     	    "category_id": 2
>     }


2. Obter despesas em PDF:
> GET /expenses/pdf?start_date=2023-01-01&end_date=2023-04-30

3. Obter despesas no excel:
> GET /expenses/excel

## Modelo
<img width="646" alt="image" src="https://user-images.githubusercontent.com/15786094/235546653-fcbe16fd-1e97-4cf0-921e-977111dc7807.png">

