import { v4 } from 'uuid';
import Product from '../../../domain/product/entity/product';
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import {
	CreateProductInputDto,
	CreateProductOutputDto,
} from './create.product.dto';

export class CreateProductUseCase {
	private productRepository: ProductRepositoryInterface;
	constructor(productRepository: ProductRepositoryInterface) {
		this.productRepository = productRepository;
	}

	/**
	 * Executa o caso de uso de criação de um produto
	 * @param input - Objeto contendo os detalhes do produto a ser criado
	 * @returns - Objeto contendo os detalhes do produto criado
	 */
	async execute(input: CreateProductInputDto): Promise<CreateProductOutputDto> {
		const product = new Product(v4(), input.name, input.price);
		await this.productRepository.create(product);
		return {
			id: product.id,
			name: product.name,
			price: product.price,
		};
	}
}
