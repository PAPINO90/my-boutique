import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { OrdersController } from './orders.controller';
import { UsersController } from './users.controller';
import { ProductsService } from './products.service';
import { OrdersService } from './orders.service';

@Module({
  imports: [],
  controllers: [ProductsController, OrdersController, UsersController],
  providers: [ProductsService, OrdersService],
})
export class AppModule {}
