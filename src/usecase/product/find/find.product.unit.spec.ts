import { describe, expect, it, jest } from '@jest/globals';
import Product from '../../../domain/product/entity/product';
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { FindProductUseCase } from './find.product.usecase';

// Cria dados do produto
const product = new Product('1', 'Product 1', 100);

/**
 * Estrutura de teste unitário para Use cases de Product - Find
 * Sem dependencia do repositorio, apenas testando a lógica do use case
 */
describe('[Unit] Use case tests for Product - Find', () => {
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

	it('should find a product by id', async () => {
		const productRepository = mockRepository();
		const useCase = new FindProductUseCase(productRepository);

		// Criando interações de use case
		const input = { id: '1' };
		const output = {
			id: '1',
			name: 'Product 1',
			price: 100,
		};

		// Validando retorno do useCase
		const result = await useCase.execute(input);
		expect(result).toEqual(output);
	});
});
