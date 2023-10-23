"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TaskBook_1 = __importDefault(require("../Model/TaskBook"));
class RouterBook {
    constructor() {
        this.router = (0, express_1.Router)();
        this.InitRouter();
    }
    InitRouter() {
        this.router.get('/', this.GetBook);
        this.router.post('/index', this.PostBook);
        this.router.put('/index/:id', this.PutBook);
        this.router.put('/index/UpdateBook/:id', this.DisableBook);
        this.router.delete('/index/:id', this.DeleteBook);
    }
    async GetBook(req, res) {
        const min = req.query.min.toString();
        const max = req.query.max.toString();
        const body = await TaskBook_1.default.find({ enabled: true }).skip(parseInt(min)).limit(parseInt(max));
        res.status(200).send({ data: body });
    }
    async PostBook(req, res) {
        const data = req.body;
        await TaskBook_1.default.create(data);
        res.status(200).send({ Msg: "Se inserto excelente!!!" });
    }
    async PutBook(req, res) {
        const id = req.params.id;
        const data = req.body;
        await TaskBook_1.default.findOneAndUpdate({ _id: id }, data);
        res.status(200).send({ Msg: "Se actualizo correctamente" });
    }
    async DisableBook(req, res) {
        const BookId = req.params.id;
        await TaskBook_1.default.findOneAndUpdate({ _id: BookId }, { enabled: false });
        res.status(200).send({ Msg: 'Actualizado Libro correctamente' });
    }
    async DeleteBook(req, res) {
        const Bookid = req.params.id;
        const Result = await TaskBook_1.default.deleteOne({ _id: Bookid });
        res.json({ deleteCount: Result.deletedCount });
    }
}
const PathBook = new RouterBook();
exports.default = PathBook.router;
