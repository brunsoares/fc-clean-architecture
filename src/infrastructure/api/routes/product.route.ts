import express from 'express';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import { ListProductUseCase } from '../../../usecase/product/list/list.product.usecase';
import { CreateProductUseCase } from '../../../usecase/product/create/create.product.usecase';

export const productRoute = express.Router();

productRoute.get('/', async (req, res) => {
	const useCase = new ListProductUseCase(new ProductRepository());

	try {
		const productsOutput = await useCase.execute();
		res.status(200).json(productsOutput);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

productRoute.post('/', async (req, res) => {
	const useCase = new CreateProductUseCase(new ProductRepository());
	const productInput = {
		name: req.body.name,
		price: req.body.price,
	};
	try {
		const productsOutput = await useCase.execute(productInput);
		res.status(200).json(productsOutput);
	} catch (error) {
		console.log('error', error);
		res.status(500).json({ error: error });
	}
});
