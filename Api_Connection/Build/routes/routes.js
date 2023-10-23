"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Task_1 = __importDefault(require("../Model/Task"));
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.InitRouter();
    }
    InitRouter() {
        this.router.get('/', this.GetStudents);
        this.router.post('/index', this.PostStudents);
        this.router.put('/index/:id', this.PutStudents);
    }
    async GetStudents(req, res) {
        const body = await Task_1.default.find();
        res.status(200).send({ data: body });
    }
    async PostStudents(req, res) {
        const data = req.body;
        await Task_1.default.insertMany(data);
        res.status(200).send({ Msg: "Se inserto excelente!!!" });
    }
    async PutStudents(req, res) {
        const id = req.params.id;
        const data = req.body;
        await Task_1.default.findOneAndUpdate({ _id: id }, data);
        res.status(200).send({ Msg: "Se actualizo correctamente" });
    }
}
const Path = new Routes();
exports.default = Path.router;
