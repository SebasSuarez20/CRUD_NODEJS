import { Server } from "./server";
import { MongoConnect } from "./Connection/MongoConnect";

const server = new Server();
const TaskConnection = new MongoConnect();
server.StartConnection();
TaskConnection.ConnectionSuccesFull();
