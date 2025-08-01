
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private readonly filePath = path.join(__dirname, 'products.json');

  constructor() {
    this.loadProducts();
  }

  private loadProducts() {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        this.products = JSON.parse(data);
      }
    } catch {
      this.products = [];
    }
  }

  private saveProducts() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf-8');
    } catch {
      // Ignore write errors silently
    }
  }

  findAll(): Product[] {
    this.loadProducts(); // Toujours charger la dernière version
    return this.products;
  }

  create(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = { ...product, id: uuidv4() };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  remove(id: string): { deleted: boolean } {
    this.products = this.products.filter(p => p.id !== id);
    this.saveProducts();
    return { deleted: true };
  }
}
