"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const RouterBook_1 = __importDefault(require("./routes/RouterBook"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.RoutesAll();
    }
    config() {
        this.app.set("PORT", process.env.PORT || 3000);
        this.app.use((0, cors_1.default)()); //darle permisos de solicitud http
        this.app.use((0, morgan_1.default)('dev')); //Permisos DEV
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    RoutesAll() {
        this.app.use(RouterBook_1.default);
    }
    StartConnection() {
        return this.app.listen(this.app.get("PORT"), () => {
            console.log(`The server run in the: ${this.app.get("PORT")}`);
        });
    }
}
exports.Server = Server;
