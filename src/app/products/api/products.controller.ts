
import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ProductsService, Product } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  @Post()
  create(@Body() product: Omit<Product, 'id'>): Product {
    return this.productsService.create(product);
  }

  @Delete(':id')
  remove(@Param('id') id: string): { deleted: boolean } {
    return this.productsService.remove(id);
  }
}
