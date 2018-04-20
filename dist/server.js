"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const createError = require("http-errors");
const route_1 = require("./routes/route");
class Server {
    static getServer() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.configServer();
        this.mountRoutes();
    }
    mountRoutes() {
        this.app.use("/", route_1.default.apiRouter);
    }
    configServer() {
        this.app.use(logger("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        // catch 404 and forward to error handler
        this.app.use((err, req, res, next) => {
            err.status = 404;
            next(createError(err));
        });
        // error handler
        this.app.use((err, req, res, next) => {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") === "development" ? err : {};
            // render the error page
            res.status(err.status || 500);
            res.json("error");
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map