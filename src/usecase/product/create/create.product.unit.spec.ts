import { describe, expect, it, jest } from '@jest/globals';
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { CreateProductUseCase } from './create.product.usecase';

/**
 * Estrutura de teste unitário para Use cases de Product - Create
 * Sem dependencia do repositorio, apenas testando a lógica do use case
 */
describe('[Unit] Use case tests for Product - Create', () => {
	const mockRepository = (): ProductRepositoryInterface => {
		return {
			find: jest.fn() as ProductRepositoryInterface['find'],
			findAll: jest.fn() as ProductRepositoryInterface['findAll'],
			create: jest.fn() as ProductRepositoryInterface['create'],
			update: jest.fn() as ProductRepositoryInterface['update'],
		};
	};

	it('should create a product', async () => {
		const productRepository = mockRepository();
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
