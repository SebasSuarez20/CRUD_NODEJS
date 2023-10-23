"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.Schema({
    title: { type: String, require: true }
});
const movies = (0, mongoose_1.model)("Task", movieSchema);
exports.default = movies;
