import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Sequelize } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import Product from '../../../domain/product/entity/product';
import { UpdateProductUseCase } from './update.product.usecase';

/**
 * Estrutura de teste unitário para Use cases de product - Update
 * Com dependencia do repositorio, testando a integração do use case com o repositorio
 */
describe('[Integration] Use case tests for Product - Update', () => {
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

	it('should update a product', async () => {
		const productRepository = new ProductRepository();
		// Cria produto
		const product = new Product('1', 'Product 1', 100);
		await productRepository.create(product);

		const useCase = new UpdateProductUseCase(productRepository);

		// Criando interações de use case
		const input = { id: '1', name: 'Product 1234', price: 500 };
		const output = {
			id: '1',
			name: 'Product 1234',
			price: 500,
		};

		// Validando retorno do useCase
		const result = await useCase.execute(input);
		expect(result).toEqual(output);
	});
});
