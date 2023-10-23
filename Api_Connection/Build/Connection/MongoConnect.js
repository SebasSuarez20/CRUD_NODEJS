"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class MongoConnect {
    constructor() {
        this.MongoURL = "";
        this.MongoURL = "mongodb://127.0.0.1:27017/DbTask";
    }
    ConnectionSuccesFull() {
        mongoose_1.default.connect(this.MongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }).then((res) => {
            console.log('Connection Succesfull');
        }).catch((err) => {
            console.error("No se puede conectar.");
        });
    }
}
exports.MongoConnect = MongoConnect;
