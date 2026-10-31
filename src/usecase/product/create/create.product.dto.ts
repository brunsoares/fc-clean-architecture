export interface CreateProductInputDto {
	name: string;
	price: number;
}

export interface CreateProductOutputDto {
	id: string;
	name: string;
	price: number;
}
