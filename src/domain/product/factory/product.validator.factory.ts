import ValidatorInterface from '../../@shared/validator/validator.interface';
import Product from '../entity/product';
import { ProductYupValidator } from '../validator/product.yup.validator';

/**
 * Desacoplamento da validação do produto, utilizando o padrão de projeto Factory Method.
 */
export class ProductValidatorFactory {
	static create(): ValidatorInterface<Product> {
		return new ProductYupValidator();
	}
}
