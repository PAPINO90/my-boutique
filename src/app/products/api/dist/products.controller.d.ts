import { ProductsService, Product } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Product[];
    create(product: Omit<Product, 'id'>): Product;
    remove(id: string): {
        deleted: boolean;
    };
}
