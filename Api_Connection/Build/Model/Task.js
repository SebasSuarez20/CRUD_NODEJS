"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskBook = new mongoose_1.Schema({
    title: { type: String, required: true },
    editorial: { type: String, required: true },
    edition: { type: String, required: true },
    author: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    enabled: { type: Boolean, require: true }
});
exports.default = (0, mongoose_1.model)("Book", TaskBook);
