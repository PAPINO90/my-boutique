
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export interface Order {
  id: string;
  items: string[];
  status: string;
  customer?: string;
}

@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  findAll(): Order[] {
    return this.orders;
  }

  create(order: Omit<Order, 'id' | 'status'>): Order {
    const newOrder: Order = { ...order, id: uuidv4(), status: 'pending' };
    this.orders.push(newOrder);
    return newOrder;
  }

  updateStatus(id: string, status: string): Order | { error: string } {
    const order = this.orders.find(o => o.id === id);
    if (order) {
      order.status = status;
      return order;
    }
    return { error: 'Order not found' };
  }
}
