import { describe, expect, it, jest } from '@jest/globals';
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import Product from '../../../domain/product/entity/product';
import { ListProductUseCase } from './list.product.usecase';

const product1 = new Product('1', 'Product 1', 100);
const product2 = new Product('2', 'Product 2', 200);
const product3 = new Product('3', 'Product 3', 300);
const product4 = new Product('4', 'Product 4', 400);

/**
 * Estrutura de teste unitário para Use cases de Product - List
 * Sem dependencia do repositorio, apenas testando a lógica do use case
 */
describe('[Unit] Use case tests for Product - List', () => {
	const mockRepository = (): ProductRepositoryInterface => {
		return {
			find: jest.fn() as ProductRepositoryInterface['find'],
			findAll: jest
				.fn()
				.mockReturnValue(
					Promise.resolve([product1, product2, product3, product4]),
				) as ProductRepositoryInterface['findAll'],
			create: jest.fn() as ProductRepositoryInterface['create'],
			update: jest.fn() as ProductRepositoryInterface['update'],
		};
	};

	it('should list all products', async () => {
		const productRepository = mockRepository();
		const useCase = new ListProductUseCase(productRepository);

		// Criando interações de use case
		const output = {
			products: [
				{
					id: expect.any(String),
					name: 'Product 1',
					price: 100,
				},
				{
					id: expect.any(String),
					name: 'Product 2',
					price: 200,
				},
				{
					id: expect.any(String),
					name: 'Product 3',
					price: 300,
				},
				{
					id: expect.any(String),
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
