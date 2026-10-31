export interface ListProductInputDto {}

export interface ListProductOutputDto {
	products: Array<ProductOutputDto>;
}

type ProductOutputDto = {
	id: string;
	name: string;
	price: number;
};
