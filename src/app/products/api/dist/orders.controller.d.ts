import { OrdersService, Order } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(): Order[];
    create(order: Omit<Order, 'id' | 'status'>): Order;
    updateStatus(id: string, status: string): Order | {
        error: string;
    };
}
