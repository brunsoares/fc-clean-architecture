# FC Clean Architecture

Projeto de exemplo de Clean Architecture com TypeScript, casos de uso de
produto, repositório Sequelize e banco SQLite.

## Pré-requisitos

- Node.js instalado
- npm instalado

Instale as dependências antes de executar os comandos:

```bash
npm install
```

---

# Desafio 001 - Criação de UseCases para Product

---

## Como rodar os testes

Para executar a verificação de tipos e toda a suíte de testes:

```bash
npm test
```

O script `test` executa, nesta ordem:

1. `npm run tsc -- --noEmit`, para verificar os tipos sem gerar arquivos;
2. `jest`, para executar os testes automatizados.

Para executar somente a verificação de tipos:

```bash
npm run tsc -- --noEmit
```

Também é possível executar o Jest diretamente. Alguns exemplos:

```bash
# Todos os testes de use cases de Product
npx jest src/usecase/product

# Somente testes unitários de Product
npx jest --testPathPattern="src/usecase/product/.*unit\.spec\.ts"

# Somente testes de integração de Product
npx jest --testPathPattern="src/usecase/product/.*integration\.spec\.ts"
```

Os testes de integração usam SQLite em memória (`:memory:`), portanto não
dependem de um banco de dados externo. Cada teste cria e sincroniza uma nova
instância do Sequelize e fecha a conexão ao terminar.

## Alterações nos testes de Product (use cases)

Foram adicionados testes unitários e de integração para os quatro principais
casos de uso de Product:

- **Create**: cria um produto e valida o produto retornado;
- **Find**: busca um produto pelo identificador;
- **List**: lista todos os produtos;
- **Update**: atualiza nome e preço de um produto.

Cada caso de uso possui dois cenários de teste:

- `*.unit.spec.ts`: testa a lógica do caso de uso com um repositório
  simulado (`mockRepository`). O teste não acessa banco de dados e controla os
  retornos do repositório com mocks do Jest.
- `*.integration.spec.ts`: usa o `ProductRepository` real e o modelo Sequelize.
  Os produtos são persistidos e consultados em um SQLite em memória, validando
  a comunicação entre o caso de uso, o repositório e a camada de persistência.

## Teste unitário x teste de integração

### Teste unitário

Testa uma unidade isolada, neste caso o use case. Dependências externas são
substituídas por mocks, o que torna a execução rápida e ajuda a identificar
falhas na regra de negócio do próprio use case.

### Teste de integração

Testa a colaboração entre duas ou mais partes do sistema. Neste projeto, o
use case é executado junto com o repositório Sequelize e o SQLite em memória,
permitindo verificar também a persistência e o mapeamento dos dados.

Em resumo: o teste unitário confirma **a lógica isolada**; o teste de
integração confirma **a comunicação entre as camadas**.

---

# Desafio 002 - Criação dos endpoints de Product e Customer

---

## Testes E2E da API

Nesta etapa foram adicionados os testes de infraestrutura da API para as
rotas de produtos e clientes. Eles ficam em:

- `src/infrastructure/api/routes/product.route.ts`
- `src/infrastructure/api/routes/customer.route.ts`
- `src/infrastructure/api/__tests__/product.e2e.spec.ts`
- `src/infrastructure/api/__tests__/customer.e2e.spec.ts`

O teste E2E (end-to-end) valida o fluxo completo de uma requisição HTTP,
passando pela aplicação Express, rota, caso de uso, repositório e banco de
dados. Dessa forma, ele verifica o comportamento observado pelo consumidor
da API, e não apenas uma unidade isolada. Os testes usam o Supertest e um
SQLite em memória. O banco é recriado antes de cada teste e a conexão é
encerrada ao final da suíte.

### Testes de Product

O arquivo `product.e2e.spec.ts` testa a rota `/product`:

- `POST /product`: cria um produto e valida o status HTTP e os dados
  retornados;
- `GET /product`: cria três produtos, lista todos e valida a quantidade, a
  ordem e os dados de cada produto.

Para executar somente os testes E2E de produtos:

```bash
npx jest src/infrastructure/api/__tests__/product.e2e.spec.ts
```

### Testes de Customer

O arquivo `customer.e2e.spec.ts` testa a rota `/customer`:

- criação de um cliente válido;
- rejeição de um cliente com dados inválidos;
- listagem de clientes em JSON;
- listagem de clientes em XML quando o cabeçalho `Accept` é
  `application/xml`.

Para executar somente os testes E2E de clientes:

```bash
npx jest src/infrastructure/api/__tests__/customer.e2e.spec.ts
```

### Executar os testes da API

Para executar os testes E2E de clientes e produtos juntos:

```bash
npx jest src/infrastructure/api/__tests__
```

Para executar toda a suíte do projeto, incluindo a verificação de tipos:

```bash
npm test
```

O comando `npm test` executa primeiro `tsc --noEmit` e depois todos os testes
encontrados pelo Jest. Os comandos específicos com `npx jest` executam apenas
os testes indicados e não fazem a verificação de tipos.
