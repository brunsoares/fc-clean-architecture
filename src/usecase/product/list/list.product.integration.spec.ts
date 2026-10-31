import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Sequelize } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import { CreateProductUseCase } from '../create/create.product.usecase';
import Product from '../../../domain/product/entity/product';
import { ListProductUseCase } from './list.product.usecase';

/**
 * Estrutura de teste unitário para Use cases de product - List
 * Com dependencia do repositorio, testando a integração do use case com o repositorio
 */
describe('[Integration] Use case tests for Product - List', () => {
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

	it('should list all products', async () => {
		const productRepository = new ProductRepository();
		// Criando produtos
		const product1 = new Product('1', 'Product 1', 100);
		const product2 = new Product('2', 'Product 2', 200);
		const product3 = new Product('3', 'Product 3', 300);
		const product4 = new Product('4', 'Product 4', 400);
		await productRepository.create(product1);
		await productRepository.create(product2);
		await productRepository.create(product3);
		await productRepository.create(product4);

		const useCase = new ListProductUseCase(productRepository);

		// Criando interações de use case
		const output = {
			products: [
				{
					id: '1',
					name: 'Product 1',
					price: 100,
				},
				{
					id: '2',
					name: 'Product 2',
					price: 200,
				},
				{
					id: '3',
					name: 'Product 3',
					price: 300,
				},
				{
					id: '4',
					name: 'Product 4',
					price: 400,
				},
			],
		};

		// Validando retorno do useCase
		const result = await useCase.execute();
		expect(result).toEqual(output);
	});
});
