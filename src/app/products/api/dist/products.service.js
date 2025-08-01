"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const fs = require("fs");
const path = require("path");
let ProductsService = class ProductsService {
    constructor() {
        this.products = [];
        this.filePath = path.join(__dirname, 'products.json');
        this.loadProducts();
    }
    loadProducts() {
        try {
            if (fs.existsSync(this.filePath)) {
                const data = fs.readFileSync(this.filePath, 'utf-8');
                this.products = JSON.parse(data);
            }
        }
        catch (e) {
            this.products = [];
        }
    }
    saveProducts() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf-8');
        }
        catch (e) { }
    }
    findAll() {
        this.loadProducts();
        return this.products;
    }
    create(product) {
        const newProduct = Object.assign(Object.assign({}, product), { id: (0, uuid_1.v4)() });
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }
    remove(id) {
        this.products = this.products.filter(p => p.id !== id);
        this.saveProducts();
        return { deleted: true };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ProductsService);
//# sourceMappingURL=products.service.js.map