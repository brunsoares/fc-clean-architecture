import { describe, expect, it, jest } from '@jest/globals';
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { UpdateProductUseCase } from './update.product.usecase';
import Product from '../../../domain/product/entity/product';

const product = new Product('1', 'Product 1', 100);

/**
 * Estrutura de teste unitário para Use cases de Product - Update
 * Sem dependencia do repositorio, apenas testando a lógica do use case
 */
describe('[Unit] Use case tests for Product - Update', () => {
	const mockRepository = (): ProductRepositoryInterface => {
		return {
			find: jest
				.fn()
				.mockReturnValue(Promise.resolve(product)) as ProductRepositoryInterface['find'],
			findAll: jest.fn() as ProductRepositoryInterface['findAll'],
			create: jest.fn() as ProductRepositoryInterface['create'],
			update: jest.fn() as ProductRepositoryInterface['update'],
		};
	};

	it('should update a product', async () => {
		const productRepository = mockRepository();
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
