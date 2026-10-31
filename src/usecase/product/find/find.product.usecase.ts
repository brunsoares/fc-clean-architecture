import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { FindProductInputDto, FindProductOutputDto } from './find.product.dto';

export class FindProductUseCase {
	private productRepository: ProductRepositoryInterface;
	constructor(productRepository: ProductRepositoryInterface) {
		this.productRepository = productRepository;
	}

	/**
	 * Executa o caso de uso de encontrar um produto pelo ID
	 * @param input - Objeto contendo o ID do produto a ser encontrado
	 * @returns - Objeto contendo os detalhes do produto encontrado
	 */
	async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
		const product = await this.productRepository.find(input.id);
		return {
			id: product.id,
			name: product.name,
			price: product.price,
		};
	}
}
