"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StudentsSchema = new mongoose_1.Schema({
    Name: { type: String, required: true },
    LastName: { type: String, required: true },
    Age: { type: Number, required: true },
    Student: { type: Boolean, default: true }
});
exports.default = (0, mongoose_1.model)("Students", StudentsSchema);
