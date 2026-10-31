import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { ListProductOutputDto } from './list.product.dto';

export class ListProductUseCase {
	private productRepository: ProductRepositoryInterface;
	constructor(productRepository: ProductRepositoryInterface) {
		this.productRepository = productRepository;
	}

	/**
	 * Executa o caso de uso de listagem de produtos
	 * @returns - Objeto contendo a lista de produtos
	 */
	async execute(): Promise<ListProductOutputDto> {
		const products = await this.productRepository.findAll();
		return {
			products: products.map((product) => ({
				id: product.id,
				name: product.name,
				price: product.price,
			})),
		};
	}
}
