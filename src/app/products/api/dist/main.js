"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express_1 = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bodyParser: false
    });
    app.use(express_1.default.json({ limit: '20mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '20mb' }));
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3002'
        ],
        credentials: true,
    });
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map