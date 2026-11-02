import ValidatorInterface from '../../@shared/validator/validator.interface';
import Product from '../entity/product';
import * as yup from 'yup';

/**
 * Regras de validação do produto, utilizando a biblioteca Yup.
 */
export class ProductYupValidator implements ValidatorInterface<Product> {
	validate(product: Product): void {
		try {
			const schema = yup.object().shape({
				id: yup.string().required('Id is required'),
				name: yup.string().required('Name is required'),
				price: yup.number().min(0, 'Price must be greater than zero'),
			});
			schema.validateSync(product, { abortEarly: false });
		} catch (err) {
			const errors = err as yup.ValidationError;
			errors.inner.forEach((error) => {
				product.notification.addError({
					message: error.message,
					context: 'product',
				});
			});
		}
	}
}
