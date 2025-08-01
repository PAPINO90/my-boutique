export interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
}
export declare class ProductsService {
    private products;
    private readonly filePath;
    constructor();
    private loadProducts;
    private saveProducts;
    findAll(): Product[];
    create(product: Omit<Product, 'id'>): Product;
    remove(id: string): {
        deleted: boolean;
    };
}
