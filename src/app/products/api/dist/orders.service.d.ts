export interface Order {
    id: string;
    items: string[];
    status: string;
    customer?: string;
}
export declare class OrdersService {
    private orders;
    findAll(): Order[];
    create(order: Omit<Order, 'id' | 'status'>): Order;
    updateStatus(id: string, status: string): Order | {
        error: string;
    };
}
