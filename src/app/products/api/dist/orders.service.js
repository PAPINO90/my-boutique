"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let OrdersService = class OrdersService {
    constructor() {
        this.orders = [];
    }
    findAll() {
        return this.orders;
    }
    create(order) {
        const newOrder = Object.assign(Object.assign({}, order), { id: (0, uuid_1.v4)(), status: 'pending' });
        this.orders.push(newOrder);
        return newOrder;
    }
    updateStatus(id, status) {
        const order = this.orders.find(o => o.id === id);
        if (order) {
            order.status = status;
            return order;
        }
        return { error: 'Order not found' };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)()
], OrdersService);
//# sourceMappingURL=orders.service.js.map