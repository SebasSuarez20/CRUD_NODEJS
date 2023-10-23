"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const MongoConnect_1 = require("./Connection/MongoConnect");
const server = new server_1.Server();
const TaskConnection = new MongoConnect_1.MongoConnect();
server.StartConnection();
TaskConnection.ConnectionSuccesFull();
