import { afterAll, beforeEach, describe, expect, it } from '@jest/globals';
import request from 'supertest';
import { app, sequelize } from '../express';

describe('E2E test for product', () => {
	// Sincroniza o banco de dados antes de cada teste
	beforeEach(async () => {
		await sequelize.sync({ force: true });
	});

	// Fecha a conexão com o banco de dados após todos os testes
	afterAll(async () => {
		await sequelize.close();
	});

	it('should create a product', async () => {
		const response = await request(app).post('/product').send({
			name: 'Product 1',
			price: 100,
		});
		expect(response.status).toBe(200);
		expect(response.body.name).toBe('Product 1');
		expect(response.body.price).toBe(100);
	});

	it('should list all product', async () => {
		// Criação de produtos para teste
		const responseCreate1 = await request(app).post('/product').send({
			name: 'Product 1',
			price: 100,
		});
		expect(responseCreate1.status).toBe(200);
		const responseCreate2 = await request(app).post('/product').send({
			name: 'Product 2',
			price: 200,
		});
		expect(responseCreate2.status).toBe(200);
		const responseCreate3 = await request(app).post('/product').send({
			name: 'Product 3',
			price: 300,
		});
		expect(responseCreate3.status).toBe(200);

		// Validação da listagem de produtos
		const listResponse = await request(app).get('/product').send();

		expect(listResponse.status).toBe(200);
		expect(listResponse.body.products).toHaveLength(3);
		const customer = listResponse.body.products[0];
		expect(customer).toEqual({
			id: expect.any(String),
			name: 'Product 1',
			price: 100,
		});
		const customer2 = listResponse.body.products[1];
		expect(customer2).toEqual({
			id: expect.any(String),
			name: 'Product 2',
			price: 200,
		});
		const customer3 = listResponse.body.products[2];
		expect(customer3).toEqual({
			id: expect.any(String),
			name: 'Product 3',
			price: 300,
		});
	});
});
