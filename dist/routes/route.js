"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bookController_1 = require("../controllers/bookController");
class Routes {
    constructor() {
        this.apiRouter = express.Router();
        this.configRoutes();
    }
    configRoutes() {
        this.apiRouter.get('/', (req, res) => {
            res.json({
                message: 'Welcome to our calculator API!'
            });
        });
        this.apiRouter.post('/add', bookController_1.default.getAdditionResult);
    }
}
exports.default = new Routes();
//# sourceMappingURL=route.js.map