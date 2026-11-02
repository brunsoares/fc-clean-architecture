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

---

# Desafio 003 - Adaptação de Product para Notification

---

Nesta etapa, a entidade `Product` foi adaptada para utilizar o mecanismo de
notificações da aplicação. Em vez de interromper a validação com um `throw`
para cada erro encontrado, as regras de `id`, `name` e `price` registram os
erros em uma `Notification`. Quando a criação do produto termina com erros, o
construtor lança um `NotificationError` contendo todas as notificações
acumuladas.

Os testes da entidade `Product` também foram atualizados para validar as
mensagens no formato da notificação. Além dos casos individuais para `id`,
`name` e `price`, foi adicionado um cenário que cria um produto com os três
campos inválidos e verifica se todos os erros são reportados juntos.

## Como executar os testes

Para executar a verificação de tipos e toda a suíte de testes do projeto:

```bash
npm test
```

Esse comando executa `tsc --noEmit` e, em seguida, todos os testes encontrados
pelo Jest.

Para executar somente a suíte unitária da entidade `Product`:

```bash
npx jest src/domain/product/entity/product.spec.ts
```

O comando específico do Jest executa apenas essa suíte e não realiza a
verificação de tipos.

---

# Desafio 004 - Adaptação de Product para Validator com YUP

---

Nesta etapa, a entidade `Product` passou a utilizar a biblioteca Yup para
validar `id`, `name` e `price`. Os erros continuam sendo encaminhados para a
`Notification`, mantendo o comportamento dos testes e a integração existente
com o mecanismo de notificações, inclusive para múltiplas falhas de validação.

Para evitar um acoplamento direto da entidade com a biblioteca Yup, a criação
do validador foi isolada em `ProductValidatorFactory`, seguindo o padrão
Factory Method. Dessa forma, `Product` depende da abstração
`ValidatorInterface`, enquanto a implementação específica
`ProductYupValidator` concentra o uso do Yup.

## Como executar os testes

Para executar a verificação de tipos e todos os testes do projeto:

```bash
npm test
```

Esse comando executa `tsc --noEmit` e, em seguida, toda a suíte de testes do
Jest.

Para executar somente os testes relacionados a `Product`:

```bash
npx jest src/domain/product
```

Esse comando executa exclusivamente os testes da entidade, fábrica, validador
e serviços de `Product`, sem realizar a verificação de tipos.
