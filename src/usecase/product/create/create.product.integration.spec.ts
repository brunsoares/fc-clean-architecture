import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Sequelize } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import { CreateProductUseCase } from './create.product.usecase';

/**
 * Estrutura de teste unitário para Use cases de product - Create
 * Com dependencia do repositorio, testando a integração do use case com o repositorio
 */
describe('[Integration] Use case tests for Product - Create', () => {
	let sequelize: Sequelize;

	/**
	 * Executa antes de cada teste, criando uma nova instância do Sequelize e sincronizando o banco de dados em memória
	 */
	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		});
		sequelize.addModels([ProductModel]);
		await sequelize.sync();
	});

	/**
	 * Executa após cada teste, fechando a conexão com o banco de dados em memória
	 */
	afterEach(async () => {
		await sequelize.close();
	});

	it('should create a product', async () => {
		const productRepository = new ProductRepository();
		const useCase = new CreateProductUseCase(productRepository);

		// Criando interações de use case
		const input = { name: 'Product 1', price: 100 };
		const output = {
			id: expect.any(String),
			name: 'Product 1',
			price: 100,
		};

		// Validando retorno do useCase
		const result = await useCase.execute(input);
		expect(result).toEqual(output);
	});
});
