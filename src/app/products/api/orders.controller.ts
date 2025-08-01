
import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { OrdersService, Order } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(): Order[] {
    return this.ordersService.findAll();
  }

  @Post()
  create(@Body() order: Omit<Order, 'id' | 'status'>): Order {
    return this.ordersService.create(order);
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body('status') status: string): Order | { error: string } {
    return this.ordersService.updateStatus(id, status);
  }
}
